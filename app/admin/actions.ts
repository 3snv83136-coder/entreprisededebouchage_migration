'use server';

import { supabaseAdmin } from '@/lib/db/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Realisation } from '@/lib/types';

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
  const ville = formData.get('ville') as string;
  const ville_slug = toSlug(ville);
  const mois = formData.get('mois') as string;
  const annee = formData.get('annee') as string;
  const duree = formData.get('duree') as string;
  const contexte = formData.get('contexte') as string;
  const diagnostic = formData.get('diagnostic') as string;
  const intervention = formData.get('intervention') as string;
  const resultat = formData.get('resultat') as string;
  const temoignage = formData.get('temoignage') as string;

  const typeSlug = toSlug(type);
  const moisSlug = MOIS_SLUGS[mois] || toSlug(mois);
  const slug = `realisation-${typeSlug}-${ville_slug}-${moisSlug}-${annee}`;

  const meta_title = `${type} à ${ville} — Réalisation ${mois} ${annee}`;
  const meta_description = `Intervention de ${type.toLowerCase()} réalisée à ${ville} en ${mois} ${annee}. Durée : ${duree}. Résultat : ${resultat.slice(0, 80)}…`;

  const realisation: Realisation = {
    slug,
    type,
    service_slug,
    ville,
    ville_slug,
    mois,
    annee,
    duree: duree || undefined,
    contexte: contexte || undefined,
    diagnostic: diagnostic || undefined,
    intervention,
    resultat,
    temoignage: temoignage || undefined,
    meta_title,
    meta_description,
  };

  const { error } = await supabaseAdmin
    .from('realisations')
    .insert(realisation);

  if (error) {
    redirect('/admin?error=1');
  }

  revalidatePath('/realisations');
  redirect('/admin?success=1');
}
