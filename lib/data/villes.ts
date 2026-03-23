import fs from 'fs';
import path from 'path';
import { Ville } from '@/lib/types';
import { slugify } from '@/lib/utils/slugify';

let villesCache: Ville[] | null = null;

export function getAllVilles(): Ville[] {
  if (villesCache) return villesCache;

  const csvPath = path.join(process.cwd(), 'data', 'villes.csv');
  const csv = fs.readFileSync(csvPath, 'utf-8');
  const lines = csv.trim().split('\n').slice(1);

  villesCache = lines.map((line) => {
    const [ville, departement, code_postal, population, tier] = line.split(',');
    return {
      ville: ville.trim(),
      departement: departement.trim(),
      code_postal: code_postal.trim(),
      population: parseInt(population.trim(), 10),
      slug: slugify(ville.trim()),
      tier: (parseInt(tier?.trim() || '2', 10) as 1 | 2),
    };
  });

  return villesCache;
}

export function getVilleBySlug(slug: string): Ville | null {
  return getAllVilles().find((v) => v.slug === slug) || null;
}

export function getTier1Villes(): Ville[] {
  return getAllVilles().filter((v) => v.tier === 1);
}

export function getNearbyVilles(slug: string, max = 5): Ville[] {
  const all = getAllVilles();
  const current = all.find((v) => v.slug === slug);
  if (!current) return all.slice(0, max);

  return all
    .filter((v) => v.slug !== slug)
    .sort((a, b) => {
      // Prioritize same postal code prefix (geographic proximity)
      const aClose = a.code_postal.slice(0, 3) === current.code_postal.slice(0, 3) ? 0 : 1;
      const bClose = b.code_postal.slice(0, 3) === current.code_postal.slice(0, 3) ? 0 : 1;
      if (aClose !== bClose) return aClose - bClose;
      // Then by population (larger cities first for better link juice)
      return b.population - a.population;
    })
    .slice(0, max);
}
