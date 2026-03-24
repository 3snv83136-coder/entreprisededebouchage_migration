/**
 * Maillage interne automatique : remplace les mots-clés métier par des liens.
 * Retourne un tableau de segments { text, href? } pour rendu React.
 */

interface Segment {
  text: string;
  href?: string;
}

// Mots-clés → URL (ordre important : les plus longs en premier)
const KEYWORD_MAP: Array<{ keywords: string[]; href: string }> = [
  {
    keywords: ['fosse septique', 'fosse toutes eaux', 'vidange fosse'],
    href: '/debouchage-fosse-septique/',
  },
  {
    keywords: ['ballon d\'eau chaude', 'chauffe-eau', 'chauffe eau'],
    href: '/debouchage-ballon-deau-chaude-chauffe-eau/',
  },
  {
    keywords: ['salle de bain'],
    href: '/debouchage-salle-de-bain/',
  },
  {
    keywords: ['lave-vaisselle', 'lave vaisselle'],
    href: '/debouchage-lave-vaisselle/',
  },
  {
    keywords: ['lave-linge', 'lave linge', 'machine à laver'],
    href: '/debouchage-lave-linge/',
  },
  {
    keywords: ['hydrocurage', 'haute pression', 'hydrocureur'],
    href: '/debouchage-canalisation/',
  },
  {
    keywords: ['inspection caméra', 'caméra d\'inspection', 'camera inspection', 'diagnostic caméra'],
    href: '/debouchage-canalisation/',
  },
  {
    keywords: ['canalisation', 'canalisations', 'conduite', 'conduites'],
    href: '/debouchage-canalisation/',
  },
  {
    keywords: ['égout', 'égouts', 'regard', 'regards', 'réseau extérieur'],
    href: '/debouchage-egouts-regards/',
  },
  {
    keywords: ['wc', 'toilettes', 'sanitaires'],
    href: '/debouchage-wc-toilettes/',
  },
  {
    keywords: ['douche', 'baignoire'],
    href: '/debouchage-douche-baignoire/',
  },
  {
    keywords: ['évier', 'lavabo', 'vasque'],
    href: '/debouchage-evier-lavabo/',
  },
  {
    keywords: ['cuisine'],
    href: '/debouchage-cuisine/',
  },
  {
    keywords: ['furet', 'furet mécanique', 'furet motorisé'],
    href: '/debouchage-canalisation/',
  },
];

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function linkifyText(text: string, excludeHref?: string): Segment[] {
  if (!text) return [{ text }];

  // Build a flat list of (keyword, href) sorted by length desc (longest first)
  const entries: Array<{ keyword: string; href: string }> = [];
  for (const { keywords, href } of KEYWORD_MAP) {
    if (href === excludeHref) continue;
    for (const kw of keywords) {
      entries.push({ keyword: kw, href });
    }
  }
  entries.sort((a, b) => b.keyword.length - a.keyword.length);

  // Track which href has already been used (only first occurrence per href)
  const usedHrefs = new Set<string>();

  // Process text sequentially
  let remaining = text;
  const segments: Segment[] = [];

  while (remaining.length > 0) {
    let earliestMatch: { index: number; length: number; href: string } | null = null;

    for (const { keyword, href } of entries) {
      if (usedHrefs.has(href)) continue;
      const regex = new RegExp(escapeRegex(keyword), 'i');
      const match = regex.exec(remaining);
      if (match && (earliestMatch === null || match.index < earliestMatch.index)) {
        earliestMatch = { index: match.index, length: match[0].length, href };
      }
    }

    if (!earliestMatch) {
      segments.push({ text: remaining });
      break;
    }

    const { index, length, href } = earliestMatch;

    if (index > 0) {
      segments.push({ text: remaining.slice(0, index) });
    }
    segments.push({ text: remaining.slice(index, index + length), href });
    usedHrefs.add(href);
    remaining = remaining.slice(index + length);
  }

  return segments;
}
