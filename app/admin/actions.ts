'use server';

import { supabaseAdmin } from '@/lib/db/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Realisation } from '@/lib/types';
import { generateFaq, generateJsonLd, generateTitre, generateDescription } from '@/lib/services/realisation.service';
import { uploadPhoto } from '@/lib/services/upload.service';
import { enrichirRecit } from '@/lib/services/claude.service';
import { envoyerEmailInterne } from '@/lib/services/email.service';

const MOIS_SLUGS: Record<string, string> = {
  Janvier: 'janvier', Février: 'fevrier', Mars: 'mars', Avril: 'avril',
  Mai: 'mai', Juin: 'juin', Juillet: 'juillet', Août: 'aout',
  Septembre: 'septembre', Octobre: 'octobre', Novembre: 'novembre', Décembre: 'decembre',
};

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function saveRealisation(formData: FormData) {
  let realisationId: string | null = null;
  let errorMsg = '';

  try {
    const type = formData.get('type') as string;
    const service_slug = formData.get('service_slug') as string;
    const villeData = (formData.get('ville_data') as string) || '';
    const [ville, codePostalFromSelect] = villeData.includes('|')
      ? villeData.split('|')
      : [villeData, ''];
    const ville_slug = toSlug(ville);
    const mois = formData.get('mois') as string;
    const annee = formData.get('annee') as string;
    const duree = formData.get('duree') as string;
    const recit = formData.get('recit') as string;
    const intervenant = formData.get('intervenant') as string;
    const codePostal = codePostalFromSelect;
    const photoAvant = formData.get('photoAvant') as File | null;
    const photoApres = formData.get('photoApres') as File | null;

    if (!ville || !recit) {
      errorMsg = 'Ville et recit sont obligatoires';
      redirect(`/admin?error=1&msg=${encodeURIComponent(errorMsg)}`);
    }

    const typeSlug = toSlug(type);
    const moisSlug = MOIS_SLUGS[mois] || toSlug(mois);
    const slug = `realisation-${typeSlug}-${ville_slug}-${moisSlug}-${annee}`;

    const faq = generateFaq(type, ville);
    const titre = generateTitre(type, ville, mois, annee);
    const meta_description = generateDescription({ type, ville, mois, annee, duree, resultat: recit.slice(0, 200) });

    // 1. Insert initial record (minimal fields only)
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('realisations')
      .insert({
        slug,
        type,
        service_slug,
        ville,
        ville_slug,
        mois,
        annee,
        duree: duree || null,
        contexte: recit,
        intervention: recit,
        resultat: recit,
        meta_title: titre,
        meta_description,
        faq,
        titre,
        code_postal: codePostal || null,
        publiee: true,
        email_envoye: false,
      })
      .select('id')
      .single();

    if (insertError || !inserted) {
      console.error('Insert failed:', insertError);
      errorMsg = insertError?.message || 'Insert failed';
      redirect(`/admin?error=1&msg=${encodeURIComponent(errorMsg)}`);
    }

    realisationId = inserted.id as string;

    // Everything below is non-blocking — record already saved
    const updates: Record<string, unknown> = {};

    // Intervenant
    if (intervenant) {
      try { await supabaseAdmin.from('realisations').update({ intervenant }).eq('id', realisationId); } catch { /* skip */ }
    }

    // Photos → WebP
    if (photoAvant && photoAvant.size > 0) {
      try { updates.photo_avant_url = await uploadPhoto(photoAvant, realisationId, 'avant'); } catch { /* skip */ }
    }
    if (photoApres && photoApres.size > 0) {
      try { updates.photo_apres_url = await uploadPhoto(photoApres, realisationId, 'apres'); } catch { /* skip */ }
    }

    // Claude enrichment
    try {
      const improved = await enrichirRecit({
        type, ville,
        code_postal: codePostal || undefined,
        recit,
        duree: duree || undefined,
      });
      updates.contexte_enrichi = improved.contexte_enrichi;
      updates.diagnostic_enrichi = improved.diagnostic_enrichi;
      updates.intervention_enrichie = improved.intervention_enrichie;
      updates.description_generee = improved.expertise_complete || improved.resultat_enrichi;
      updates.titre = improved.titre_seo;
      updates.meta_description = improved.meta_description;
      updates.materiels = improved.materiels_detectes;
    } catch { /* skip */ }

    // JSON-LD
    try {
      updates.json_ld = generateJsonLd({
        type, ville, slug, mois, annee,
        resultat: recit, faq,
        description_generee: updates.description_generee as string | undefined,
        meta_description: (updates.meta_description as string) || meta_description,
      });
    } catch { /* skip */ }

    // Update record with enrichments
    if (Object.keys(updates).length > 0) {
      try { await supabaseAdmin.from('realisations').update(updates).eq('id', realisationId); } catch { /* skip */ }
    }

    // Email
    try {
      await envoyerEmailInterne({
        titre: (updates.titre as string) || titre,
        ville, type, slug, mois, annee,
        duree: duree || undefined,
        resultat: recit.slice(0, 200),
      });
      await supabaseAdmin.from('realisations').update({ email_envoye: true }).eq('id', realisationId);
    } catch { /* skip */ }

    revalidatePath('/realisations');
    revalidatePath('/');

  } catch (err) {
    // Re-throw NEXT_REDIRECT (it's how redirect() works in Next.js)
    if (err && typeof err === 'object' && 'digest' in err) throw err;
    console.error('saveRealisation error:', err);
    errorMsg = err instanceof Error ? err.message : String(err);
    redirect(`/admin?error=1&msg=${encodeURIComponent(errorMsg)}`);
  }

  // redirect must be outside try/catch
  redirect(`/admin?success=1&id=${realisationId}`);
}

export async function deleteRealisation(id: string) {
  await supabaseAdmin.from('realisations').delete().eq('id', id);
  revalidatePath('/realisations');
  revalidatePath('/');
  redirect('/admin/realisations?deleted=1');
}

export async function reEnrichirRealisation(id: string) {
  const { data: r, error } = await supabaseAdmin
    .from('realisations')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !r) {
    redirect('/admin/realisations?error=1');
  }

  const updates: Record<string, unknown> = {};
  const recit = r.contexte || r.intervention || '';

  const improved = await enrichirRecit({
    type: r.type,
    ville: r.ville,
    code_postal: r.code_postal || undefined,
    recit,
    duree: r.duree || undefined,
  }).catch(() => null);

  if (!improved) {
    redirect('/admin/realisations?error=1');
  }

  updates.contexte_enrichi = improved.contexte_enrichi;
  updates.diagnostic_enrichi = improved.diagnostic_enrichi;
  updates.intervention_enrichie = improved.intervention_enrichie;
  updates.description_generee = improved.resultat_enrichi;
  updates.titre = improved.titre_seo;
  updates.meta_description = improved.meta_description;
  updates.materiels = improved.materiels_detectes;

  const faq = generateFaq(r.type, r.ville);
  updates.faq = faq;
  updates.json_ld = generateJsonLd({
    type: r.type,
    ville: r.ville,
    slug: r.slug,
    mois: r.mois,
    annee: r.annee,
    resultat: recit,
    temoignage: r.temoignage || undefined,
    faq,
    description_generee: updates.description_generee as string | undefined,
    meta_description: (updates.meta_description as string) || r.meta_description,
  });

  await supabaseAdmin.from('realisations').update(updates).eq('id', id);

  revalidatePath(`/realisations/${r.slug}/`);
  revalidatePath('/realisations');
  redirect('/admin/realisations?enriched=1');
}
