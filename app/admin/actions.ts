'use server';

import { supabaseAdmin } from '@/lib/db/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { generateFaq, generateTitre, generateDescription } from '@/lib/services/realisation.service';
import { uploadPhoto } from '@/lib/services/upload.service';

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
  const photoErrors: string[] = [];

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
    const adresse = (formData.get('adresse') as string || '').trim();
    const photoAvant = formData.get('photoAvant') as File | null;
    const photoApres = formData.get('photoApres') as File | null;
    const rotationAvant = parseInt(formData.get('rotationAvant') as string || '0', 10) || 0;
    const rotationApres = parseInt(formData.get('rotationApres') as string || '0', 10) || 0;

    if (!ville || !recit) {
      redirect(`/admin?error=1&msg=${encodeURIComponent('Ville et recit sont obligatoires')}`);
    }

    const typeSlug = toSlug(type);
    const moisSlug = MOIS_SLUGS[mois] || toSlug(mois);
    const uid = Date.now().toString(36).slice(-4);
    const slug = `realisation-${typeSlug}-${ville_slug}-${moisSlug}-${annee}-${uid}`;

    const faq = generateFaq(type, ville);
    const titre = generateTitre(type, ville, mois, annee);
    const meta_description = generateDescription({ type, ville, mois, annee, duree, resultat: recit.slice(0, 200) });

    // Geocode address if provided
    let latitude: number | null = null;
    let longitude: number | null = null;
    if (adresse) {
      try {
        const geoQuery = encodeURIComponent(`${adresse}, ${ville}, ${codePostal}, France`);
        const geoRes = await fetch(`https://nominatim.openstreetmap.org/search?q=${geoQuery}&format=json&limit=1`, {
          headers: { 'User-Agent': 'EntrepriseDeDebouchage/1.0' },
        });
        const geoData = await geoRes.json();
        if (geoData.length > 0) {
          latitude = parseFloat(geoData[0].lat);
          longitude = parseFloat(geoData[0].lon);
        }
      } catch { /* geocoding failure is non-blocking */ }
    }

    // Insert record (fast — no Claude call)
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('realisations')
      .insert({
        slug, type, service_slug, ville, ville_slug, mois, annee,
        duree: duree || null,
        contexte: recit, intervention: recit, resultat: recit,
        meta_title: titre, meta_description, faq, titre,
        code_postal: codePostal || null,
        publiee: true, email_envoye: false,
        adresse: adresse || null,
        latitude, longitude,
      })
      .select('id')
      .single();

    if (insertError || !inserted) {
      redirect(`/admin?error=1&msg=${encodeURIComponent(insertError?.message || 'Insert failed')}`);
    }

    realisationId = inserted.id as string;

    // Intervenant (optional column)
    if (intervenant) {
      try { await supabaseAdmin.from('realisations').update({ intervenant }).eq('id', realisationId); } catch { /* skip */ }
    }

    // Photos
    if (photoAvant && photoAvant.size > 0) {
      try {
        const url = await uploadPhoto(photoAvant, realisationId, 'avant', rotationAvant);
        await supabaseAdmin.from('realisations').update({ photo_avant_url: url }).eq('id', realisationId);
      } catch (photoErr) {
        console.error('[saveRealisation] Photo avant upload failed:', photoErr);
        photoErrors.push('avant');
      }
    }
    if (photoApres && photoApres.size > 0) {
      try {
        const url = await uploadPhoto(photoApres, realisationId, 'apres', rotationApres);
        await supabaseAdmin.from('realisations').update({ photo_apres_url: url }).eq('id', realisationId);
      } catch (photoErr) {
        console.error('[saveRealisation] Photo apres upload failed:', photoErr);
        photoErrors.push('apres');
      }
    }

    revalidatePath('/realisations');
    revalidatePath('/');

  } catch (err) {
    if (err && typeof err === 'object' && 'digest' in err) throw err;
    redirect(`/admin?error=1&msg=${encodeURIComponent(err instanceof Error ? err.message : String(err))}`);
  }

  // Redirect with id — enrichment happens client-side via /api/enrichir/[id]
  const photoParam = photoErrors.length > 0 ? `&photo_error=${photoErrors.join(',')}` : '';
  redirect(`/admin?success=1&id=${realisationId}${photoParam}`);
}

export async function deleteRealisation(id: string) {
  await supabaseAdmin.from('realisations').delete().eq('id', id);
  revalidatePath('/realisations');
  revalidatePath('/');
  redirect('/admin/realisations?deleted=1');
}

export async function reEnrichirRealisation(id: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

  try {
    const res = await fetch(`${baseUrl}/api/enrichir/${id}`, { method: 'POST' });
    const data = await res.json();
    if (data.status === 'enriched' || data.status === 'already_enriched') {
      revalidatePath('/realisations');
      revalidatePath('/');
      redirect('/admin/realisations?enriched=1');
    }
    revalidatePath('/realisations');
    redirect(`/admin/realisations?error=1`);
  } catch (err) {
    if (err && typeof err === 'object' && 'digest' in err) throw err;
    redirect(`/admin/realisations?error=1`);
  }
}
