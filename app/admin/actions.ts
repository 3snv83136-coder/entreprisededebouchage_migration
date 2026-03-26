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
  const codePostal = codePostalFromSelect;
  const photoAvant = formData.get('photoAvant') as File | null;
  const photoApres = formData.get('photoApres') as File | null;

  const typeSlug = toSlug(type);
  const moisSlug = MOIS_SLUGS[mois] || toSlug(mois);
  const slug = `realisation-${typeSlug}-${ville_slug}-${moisSlug}-${annee}`;

  const faq = generateFaq(type, ville);
  const titre = generateTitre(type, ville, mois, annee);
  const meta_description = generateDescription({ type, ville, mois, annee, duree, resultat: recit.slice(0, 200) });
  const meta_title = titre;

  const realisation: Realisation = {
    slug,
    type,
    service_slug,
    ville,
    ville_slug,
    mois,
    annee,
    duree: duree || undefined,
    contexte: recit,
    intervention: recit,
    resultat: recit,
    meta_title,
    meta_description,
    faq,
    titre,
    code_postal: codePostal || undefined,
    publiee: true,
    email_envoye: false,
  };

  // 1. Insert initial record
  const { data: inserted, error } = await supabaseAdmin
    .from('realisations')
    .insert(realisation)
    .select('id')
    .single();

  if (error || !inserted) {
    redirect('/admin?error=1');
  }

  const realisationId = inserted.id as string;
  const updates: Partial<Realisation> = {};

  // 2. Upload photos
  if (photoAvant && photoAvant.size > 0) {
    try {
      updates.photo_avant_url = await uploadPhoto(photoAvant, realisationId, 'avant');
    } catch {
      // Non-blocking
    }
  }
  if (photoApres && photoApres.size > 0) {
    try {
      updates.photo_apres_url = await uploadPhoto(photoApres, realisationId, 'apres');
    } catch {
      // Non-blocking
    }
  }

  // 3. Claude enrichment from free-text recit
  try {
    const improved = await enrichirRecit({
      type,
      ville,
      code_postal: codePostal || undefined,
      recit,
      duree: duree || undefined,
    });
    updates.contexte_enrichi = improved.contexte_enrichi;
    updates.diagnostic_enrichi = improved.diagnostic_enrichi;
    updates.intervention_enrichie = improved.intervention_enrichie;
    updates.description_generee = improved.resultat_enrichi;
    updates.titre = improved.titre_seo;
    updates.meta_description = improved.meta_description;
    updates.materiels = improved.materiels_detectes;
  } catch {
    // Non-blocking: fallback to original
  }

  // 4. Generate JSON-LD
  updates.json_ld = generateJsonLd({
    type,
    ville,
    slug,
    mois,
    annee,
    resultat: recit,
    faq,
    description_generee: updates.description_generee,
    meta_description: updates.meta_description || meta_description,
  });

  // 5. Update record
  if (Object.keys(updates).length > 0) {
    await supabaseAdmin
      .from('realisations')
      .update(updates)
      .eq('id', realisationId);
  }

  // 6. Send internal email
  try {
    await envoyerEmailInterne({
      titre: updates.titre || titre,
      ville,
      type,
      slug,
      mois,
      annee,
      duree: duree || undefined,
      resultat: recit.slice(0, 200),
    });
    await supabaseAdmin
      .from('realisations')
      .update({ email_envoye: true })
      .eq('id', realisationId);
  } catch {
    // Non-blocking
  }

  revalidatePath('/realisations');
  revalidatePath('/');
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

  const updates: Partial<Realisation> = {};
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
    description_generee: updates.description_generee,
    meta_description: updates.meta_description || r.meta_description,
  });

  await supabaseAdmin.from('realisations').update(updates).eq('id', id);

  revalidatePath(`/realisations/${r.slug}/`);
  revalidatePath('/realisations');
  redirect('/admin/realisations?enriched=1');
}
