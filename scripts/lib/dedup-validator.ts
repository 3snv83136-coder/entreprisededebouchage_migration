/**
 * Valide le taux de duplication entre les pages générées
 * Cible : < 20% de contenu commun entre deux pages quelconques
 */

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

interface ValidationResult {
  totalPages: number;
  avgDuplication: number;
  worstPairs: Array<{ page1: string; page2: string; score: number }>;
  overusedPhrases: Array<{ phrase: string; count: number; percentage: number }>;
  passed: boolean;
}

// Extraire le texte brut du HTML
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Normaliser : remplacer les noms de ville par un placeholder
function normalize(text: string, villeName: string): string {
  const escaped = villeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(escaped, 'gi'), '__VILLE__');
}

// Extraire les n-grams
function getNgrams(text: string, n: number): Set<string> {
  const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const ngrams = new Set<string>();
  for (let i = 0; i <= words.length - n; i++) {
    ngrams.add(words.slice(i, i + n).join(' '));
  }
  return ngrams;
}

// Similarité Jaccard entre deux sets
function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 && b.size === 0) return 0;
  let intersection = 0;
  for (const item of a) {
    if (b.has(item)) intersection++;
  }
  const union = a.size + b.size - intersection;
  return union > 0 ? intersection / union : 0;
}

// Extraire les phrases fréquentes (8+ mots) de toutes les pages
function extractFrequentPhrases(
  pages: Array<{ slug: string; text: string; ville: string }>,
  minWords: number = 8,
  minOccurrences: number = 3
): Array<{ phrase: string; count: number; percentage: number }> {
  const phraseCounts = new Map<string, number>();

  for (const page of pages) {
    const normalized = normalize(page.text, page.ville);
    const ngrams = getNgrams(normalized, minWords);
    // Count unique per page
    for (const ng of ngrams) {
      phraseCounts.set(ng, (phraseCounts.get(ng) || 0) + 1);
    }
  }

  const total = pages.length;
  return Array.from(phraseCounts.entries())
    .filter(([, count]) => count >= minOccurrences)
    .map(([phrase, count]) => ({ phrase, count, percentage: Math.round(count / total * 100) }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 50);
}

export function validateDeduplication(generatedDir: string): ValidationResult {
  const files = readdirSync(generatedDir).filter(f => f.endsWith('.json'));
  const pages: Array<{ slug: string; text: string; ville: string; ngrams5: Set<string> }> = [];

  for (const file of files) {
    try {
      const data = JSON.parse(readFileSync(join(generatedDir, file), 'utf-8'));
      if (!data.content) continue;
      const text = stripHtml(data.content);
      const normalized = normalize(text, data.ville || '');
      pages.push({
        slug: data.slug || file,
        text,
        ville: data.ville || '',
        ngrams5: getNgrams(normalized, 5),
      });
    } catch {
      continue;
    }
  }

  // Calculer la similarité par paires (échantillonnage pour perf)
  const pairScores: Array<{ page1: string; page2: string; score: number }> = [];
  const maxPairs = Math.min(pages.length * 20, 5000); // Limiter les comparaisons
  let pairCount = 0;
  let totalScore = 0;

  for (let i = 0; i < pages.length && pairCount < maxPairs; i++) {
    // Comparer avec ~20 pages aléatoires
    const indices = new Set<number>();
    while (indices.size < Math.min(20, pages.length - 1)) {
      const j = Math.floor(Math.random() * pages.length);
      if (j !== i) indices.add(j);
    }

    for (const j of indices) {
      const score = jaccard(pages[i].ngrams5, pages[j].ngrams5);
      totalScore += score;
      pairCount++;
      if (score > 0.25) {
        pairScores.push({ page1: pages[i].slug, page2: pages[j].slug, score: Math.round(score * 100) / 100 });
      }
    }
  }

  const avgDuplication = pairCount > 0 ? Math.round(totalScore / pairCount * 100) / 100 : 0;
  const worstPairs = pairScores.sort((a, b) => b.score - a.score).slice(0, 10);
  const overusedPhrases = extractFrequentPhrases(pages, 8, Math.ceil(pages.length * 0.15));

  return {
    totalPages: pages.length,
    avgDuplication,
    worstPairs,
    overusedPhrases,
    passed: avgDuplication < 0.20 && worstPairs.every(p => p.score < 0.35),
  };
}

// Extraire les phrases les plus répétées pour la banned list
export function extractBannedPhrases(generatedDir: string, threshold: number = 0.10): string[] {
  const files = readdirSync(generatedDir).filter(f => f.endsWith('.json'));
  const pages: Array<{ text: string; ville: string }> = [];

  for (const file of files) {
    try {
      const data = JSON.parse(readFileSync(join(generatedDir, file), 'utf-8'));
      if (!data.content) continue;
      pages.push({ text: stripHtml(data.content), ville: data.ville || '' });
    } catch {
      continue;
    }
  }

  if (pages.length === 0) return [];

  const phrases = extractFrequentPhrases(
    pages.map((p, i) => ({ slug: `page-${i}`, ...p })),
    8,
    Math.ceil(pages.length * threshold)
  );

  return phrases.map(p => p.phrase);
}
