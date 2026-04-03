#!/usr/bin/env npx tsx
/**
 * Génération des pages SEO pour les communes des Bouches-du-Rhône
 *
 * Usage :
 *   npx tsx scripts/generate-city-pages.ts                    # Tout générer
 *   npx tsx scripts/generate-city-pages.ts --fetch-only       # Seulement récupérer les données
 *   npx tsx scripts/generate-city-pages.ts --validate-only    # Seulement valider la déduplication
 *   npx tsx scripts/generate-city-pages.ts --resume           # Reprendre une génération interrompue
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { buildAllCityProfiles, CityProfile } from './lib/city-data-fetcher';
import { buildCityPagePrompt, buildServiceCityPagePrompt } from './lib/prompt-builder';
import { validateDeduplication, extractBannedPhrases } from './lib/dedup-validator';

// ─── Config ───────────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DATA_DIR = join(ROOT, 'data');
const GENERATED_DIR = join(DATA_DIR, 'generated');
const PROFILES_PATH = join(DATA_DIR, 'city-profiles.json');
const STATE_PATH = join(DATA_DIR, 'generation-state.json');
const VILLES_CSV = join(DATA_DIR, 'villes.csv');

const MODEL = 'claude-haiku-4-5-20251001';
const MAX_CONCURRENT = 2;
const BATCH_SIZE = 3;
const BATCH_DELAY_MS = 15_000; // 15s entre chaque batch pour respecter le rate limit

// ─── Types ────────────────────────────────────────────────────────────
interface Ville {
  ville: string;
  departement: string;
  code_postal: string;
  population: number;
  slug: string;
  tier: 1 | 2;
}

interface Service {
  slug: string;
  label: string;
  description: string;
  intervention: string;
  problems: string[];
}

interface GenerationState {
  [slug: string]: { status: 'completed' | 'failed'; timestamp: string; error?: string };
}

// ─── Helpers ──────────────────────────────────────────────────────────
function slugify(name: string): string {
  return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '-').replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function loadVilles(): Ville[] {
  const csv = readFileSync(VILLES_CSV, 'utf-8');
  return csv.trim().split('\n').slice(1).filter(l => l.trim()).map(line => {
    const [ville, departement, code_postal, population, tier] = line.split(',');
    return {
      ville: ville.trim(), departement: departement.trim(),
      code_postal: code_postal.trim(), population: parseInt(population.trim(), 10),
      slug: slugify(ville.trim()), tier: (parseInt(tier?.trim() || '2', 10) as 1 | 2),
    };
  });
}

function loadServices(): Service[] {
  // Hardcoded to avoid import issues with path aliases
  return [
    { slug: 'debouchage-canalisation', label: 'Debouchage canalisation', description: 'Hydrocurage haute pression et furet motorisé pour éliminer toute obstruction dans vos conduites.', intervention: 'Diagnostic caméra puis hydrocurage ou furet motorisé selon la nature du bouchon.', problems: ['Canalisation bouchée', 'Écoulement lent', 'Mauvaises odeurs'] },
    { slug: 'debouchage-wc-toilettes', label: 'Debouchage WC', description: 'Intervention rapide sur vos toilettes bouchées ou débordantes.', intervention: 'Debouchage mécanique ou haute pression, sans démontage inutile.', problems: ['WC bouché', 'Eau qui monte', 'WC qui déborde'] },
    { slug: 'debouchage-evier-lavabo', label: 'Debouchage évier & lavabo', description: 'Nettoyage des siphons et conduites encrassés par les graisses et calcaire.', intervention: 'Démontage siphon, furet ou hydrocurage selon la gravité.', problems: ['Évier bouché', 'Eau stagnante', 'Mauvaises odeurs'] },
    { slug: 'debouchage-douche-baignoire', label: 'Debouchage douche & baignoire', description: 'Traitement des bouchons formés par les cheveux et le calcaire.', intervention: 'Extraction mécanique puis nettoyage haute pression du réseau.', problems: ['Douche bouchée', 'Eau stagnante', 'Calcaire accumulé'] },
    { slug: 'debouchage-egouts-regards', label: 'Debouchage égout & regard', description: 'Intervention sur les réseaux extérieurs, fosses et regards colmatés.', intervention: 'Hydrocurage haute pression du réseau extérieur avec rapport.', problems: ['Regard bouché', 'Remontées d\'égout', 'Fosse colmatée'] },
    { slug: 'debouchage-cuisine', label: 'Debouchage cuisine', description: 'Debouchage complet de l\'évacuation cuisine.', intervention: 'Nettoyage siphon et curage des canalisations de cuisine.', problems: ['Évier cuisine bouché', 'Graisses accumulées', 'Écoulement lent'] },
    { slug: 'debouchage-fosse-septique', label: 'Debouchage fosse septique', description: 'Vidange et debouchage de fosse septique.', intervention: 'Vidange par camion pompe, curage et vérification.', problems: ['Fosse pleine', 'Remontées d\'odeurs', 'Débordement'] },
    { slug: 'debouchage-salle-de-bain', label: 'Debouchage salle de bain', description: 'Prise en charge complète de la salle de bain.', intervention: 'Traitement de l\'ensemble du réseau salle de bain.', problems: ['Eau stagnante', 'Cheveux accumulés', 'Calcaire'] },
    { slug: 'debouchage-lave-vaisselle', label: 'Debouchage lave-vaisselle', description: 'Debouchage de l\'évacuation du lave-vaisselle.', intervention: 'Vérification du siphon, nettoyage pompe et curage.', problems: ['Lave-vaisselle ne vidange pas', 'Eau stagnante', 'Mauvaises odeurs'] },
    { slug: 'debouchage-lave-linge', label: 'Debouchage lave-linge', description: 'Debouchage de l\'évacuation du lave-linge.', intervention: 'Nettoyage filtre, vérification pompe et debouchage.', problems: ['Lave-linge ne vidange pas', 'Eau qui remonte', 'Code erreur vidange'] },
    { slug: 'debouchage-ballon-deau-chaude-chauffe-eau', label: 'Debouchage ballon d\'eau chaude', description: 'Détartrage et debouchage de l\'évacuation du ballon d\'eau chaude.', intervention: 'Détartrage, nettoyage et vérification du groupe de sécurité.', problems: ['Pression faible', 'Eau tiède', 'Calcaire accumulé'] },
  ];
}

function loadState(): GenerationState {
  if (existsSync(STATE_PATH)) {
    return JSON.parse(readFileSync(STATE_PATH, 'utf-8'));
  }
  return {};
}

function saveState(state: GenerationState): void {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

function loadExistingQuartiers(): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  try {
    const files = readdirSync(GENERATED_DIR);
    for (const file of files) {
      if (!file.endsWith('.json')) continue;
      try {
        const data = JSON.parse(readFileSync(join(GENERATED_DIR, file), 'utf-8'));
        if (data.quartiers?.length > 0 && data.slug) {
          const villeSlug = data.slug.replace(/^debouchage-/, '');
          if (!result[villeSlug] || data.type === 'ville') {
            result[villeSlug] = data.quartiers;
          }
        }
      } catch { /* skip */ }
    }
  } catch { /* no dir */ }
  return result;
}

function getNearbyVilleNames(profile: CityProfile, allProfiles: CityProfile[], max = 6): string[] {
  return allProfiles
    .filter(p => p.slug !== profile.slug)
    .map(p => {
      const dlat = (p.coordinates.lat - profile.coordinates.lat) * 111;
      const dlon = (p.coordinates.lon - profile.coordinates.lon) * 111 * Math.cos(profile.coordinates.lat * Math.PI / 180);
      return { name: p.name, dist: Math.sqrt(dlat * dlat + dlon * dlon) };
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, max)
    .map(v => v.name);
}

// ─── Claude API call ──────────────────────────────────────────────────
async function generatePage(client: Anthropic, prompt: string): Promise<Record<string, unknown> | null> {
  try {
    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== 'text') return null;

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]);
    // Calculer word_count
    if (parsed.content) {
      const text = parsed.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      parsed.word_count = text.split(' ').length;
    }
    // Ajouter schema vide
    if (!parsed.schema) parsed.schema = {};

    return parsed;
  } catch (err) {
    console.error(`  ❌ Erreur API :`, (err as Error).message);
    return null;
  }
}

// Process a batch with concurrency
async function processBatch<T>(
  items: T[],
  concurrency: number,
  handler: (item: T) => Promise<void>
): Promise<void> {
  const queue = [...items];
  const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
    while (queue.length > 0) {
      const item = queue.shift()!;
      await handler(item);
    }
  });
  await Promise.all(workers);
}

// ─── Main ─────────────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2);
  const fetchOnly = args.includes('--fetch-only');
  const validateOnly = args.includes('--validate-only');
  const resume = args.includes('--resume');

  if (!existsSync(GENERATED_DIR)) mkdirSync(GENERATED_DIR, { recursive: true });

  // ── Validation only ──
  if (validateOnly) {
    console.log('🔍 Validation de la déduplication...\n');
    const result = validateDeduplication(GENERATED_DIR);
    console.log(`Pages analysées : ${result.totalPages}`);
    console.log(`Duplication moyenne : ${(result.avgDuplication * 100).toFixed(1)}%`);
    console.log(`Résultat : ${result.passed ? '✅ PASSÉ' : '❌ ÉCHEC'}`);
    if (result.worstPairs.length > 0) {
      console.log('\nPires paires :');
      for (const p of result.worstPairs.slice(0, 5)) {
        console.log(`  ${p.page1} ↔ ${p.page2} : ${(p.score * 100).toFixed(1)}%`);
      }
    }
    if (result.overusedPhrases.length > 0) {
      console.log('\nPhrases sur-utilisées :');
      for (const p of result.overusedPhrases.slice(0, 10)) {
        console.log(`  "${p.phrase}" → ${p.count} pages (${p.percentage}%)`);
      }
    }
    return;
  }

  // ── Fetch city data ──
  console.log('═══════════════════════════════════════');
  console.log('  GÉNÉRATION DES PAGES SEO — Bouches-du-Rhône 13');
  console.log('═══════════════════════════════════════\n');

  const villes = loadVilles();
  console.log(`📊 ${villes.length} communes chargées\n`);

  let profiles: CityProfile[];

  if (existsSync(PROFILES_PATH) && resume) {
    console.log('📂 Chargement des profils existants...');
    profiles = JSON.parse(readFileSync(PROFILES_PATH, 'utf-8'));
  } else {
    const existingQuartiers = loadExistingQuartiers();
    console.log(`📂 ${Object.keys(existingQuartiers).length} quartiers existants récupérés\n`);

    profiles = await buildAllCityProfiles(villes, existingQuartiers);
    writeFileSync(PROFILES_PATH, JSON.stringify(profiles, null, 2));
    console.log(`\n✅ ${profiles.length} profils sauvegardés dans city-profiles.json`);

    // Stats archétypes
    const archetypes = profiles.reduce((acc, p) => {
      acc[p.archetype] = (acc[p.archetype] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    console.log('📊 Répartition archétypes :');
    for (const [k, v] of Object.entries(archetypes).sort((a, b) => b[1] - a[1])) {
      console.log(`   ${k}: ${v}`);
    }
  }

  if (fetchOnly) {
    console.log('\n✅ Données récupérées. Utilisez sans --fetch-only pour générer le contenu.');
    return;
  }

  // ── Generate pages ──
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('❌ ANTHROPIC_API_KEY manquante. Ajoutez-la dans .env ou en variable d\'environnement.');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const services = loadServices();
  const state = resume ? loadState() : {};
  let bannedPhrases: string[] = [];

  // Si on reprend, extraire les phrases bannies des pages déjà générées
  if (resume) {
    bannedPhrases = extractBannedPhrases(GENERATED_DIR, 0.15);
    console.log(`📝 ${bannedPhrases.length} phrases bannies extraites des pages existantes\n`);
  }

  // Construire la liste des pages à générer
  interface PageJob {
    slug: string;
    type: 'ville' | 'service-ville';
    profile: CityProfile;
    service?: Service;
  }

  const jobs: PageJob[] = [];

  // 1. Pages villes (tier-1 d'abord, puis par population décroissante)
  const sortedProfiles = [...profiles].sort((a, b) => {
    const aVille = villes.find(v => v.slug === a.slug);
    const bVille = villes.find(v => v.slug === b.slug);
    const aTier = aVille?.tier || 2;
    const bTier = bVille?.tier || 2;
    if (aTier !== bTier) return aTier - bTier;
    return b.population - a.population;
  });

  for (const profile of sortedProfiles) {
    jobs.push({ slug: `debouchage-${profile.slug}`, type: 'ville', profile });
  }

  // 2. Pages service+ville (tier-1 uniquement)
  const tier1Profiles = profiles.filter(p => villes.find(v => v.slug === p.slug)?.tier === 1);
  for (const profile of tier1Profiles) {
    for (const service of services) {
      const slug = `debouchage-${service.slug.replace('debouchage-', '')}-${profile.slug}`;
      jobs.push({ slug, type: 'service-ville', profile, service });
    }
  }

  // Filtrer les jobs déjà complétés
  const pendingJobs = jobs.filter(j => state[j.slug]?.status !== 'completed');
  console.log(`\n📝 ${jobs.length} pages totales, ${pendingJobs.length} à générer\n`);

  let completed = 0;
  let failed = 0;

  // Traitement par batch avec mise à jour des phrases bannies
  for (let batchStart = 0; batchStart < pendingJobs.length; batchStart += BATCH_SIZE) {
    const batch = pendingJobs.slice(batchStart, batchStart + BATCH_SIZE);
    console.log(`\n── Batch ${Math.floor(batchStart / BATCH_SIZE) + 1} (${batch.length} pages) ──`);

    await processBatch(batch, MAX_CONCURRENT, async (job) => {
      const nearbyVilles = getNearbyVilleNames(job.profile, profiles, 6);

      let prompt: string;
      if (job.type === 'ville') {
        prompt = buildCityPagePrompt({ profile: job.profile, bannedPhrases, nearbyVilles });
      } else {
        prompt = buildServiceCityPagePrompt({ profile: job.profile, service: job.service, bannedPhrases, nearbyVilles });
      }

      const result = await generatePage(client, prompt);

      if (result) {
        const filename = `${job.slug}.json`;
        writeFileSync(join(GENERATED_DIR, filename), JSON.stringify(result, null, 2));
        state[job.slug] = { status: 'completed', timestamp: new Date().toISOString() };
        completed++;
        console.log(`  ✅ ${job.slug} (${result.word_count || '?'} mots)`);
      } else {
        state[job.slug] = { status: 'failed', timestamp: new Date().toISOString(), error: 'API error' };
        failed++;
        console.log(`  ❌ ${job.slug}`);
      }
    });

    saveState(state);

    // Pause entre batches pour respecter le rate limit
    if (batchStart + BATCH_SIZE < pendingJobs.length) {
      console.log(`  ⏳ Pause ${BATCH_DELAY_MS / 1000}s (rate limit)...`);
      await new Promise(resolve => setTimeout(resolve, BATCH_DELAY_MS));
    }

    // Toutes les 5 batches, mettre à jour les phrases bannies
    if ((batchStart / BATCH_SIZE) % 5 === 4) {
      bannedPhrases = extractBannedPhrases(GENERATED_DIR, 0.15);
      console.log(`  📝 Phrases bannies mises à jour : ${bannedPhrases.length}`);
    }
  }

  // ── Rapport final ──
  console.log('\n═══════════════════════════════════════');
  console.log(`  TERMINÉ : ${completed} générées, ${failed} échouées`);
  console.log('═══════════════════════════════════════\n');

  // Validation
  console.log('🔍 Validation de la déduplication...');
  const validation = validateDeduplication(GENERATED_DIR);
  console.log(`Duplication moyenne : ${(validation.avgDuplication * 100).toFixed(1)}%`);
  console.log(`Résultat : ${validation.passed ? '✅ PASSÉ (< 20%)' : '❌ ÉCHEC (> 20%)'}`);

  if (validation.worstPairs.length > 0) {
    console.log('\nPires paires :');
    for (const p of validation.worstPairs.slice(0, 5)) {
      console.log(`  ${p.page1} ↔ ${p.page2} : ${(p.score * 100).toFixed(1)}%`);
    }
  }

  if (failed > 0) {
    console.log(`\n⚠️  ${failed} pages en échec. Relancez avec --resume pour réessayer.`);
  }
}

main().catch(console.error);
