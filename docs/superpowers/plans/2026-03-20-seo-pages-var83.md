# SEO Pages Var 83 + Design CTA/Responsive — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Generate 285 SEO pages for all 153 communes of the Var (83) department with unique ultra-local content, E-E-A-T/GEO signals, and improve CTA visibility + responsive design.

**Architecture:** Two parallel tracks — Track A (design/infra) prepares the Next.js app to render 285 pages from JSON data files, Track B (content generation) uses multi-agent batches of 5 to generate unique content. Track A must complete before Track B content is renderable. Content is stored as JSON in `data/generated/`, loaded by `lib/data/content.ts`, and rendered by dynamic routes.

**Tech Stack:** Next.js 16, TypeScript, CSS Modules, static generation via `generateStaticParams()`

**Spec:** `docs/superpowers/specs/2026-03-20-seo-pages-var83-design.md`

---

## Track A — Infrastructure & Design (Tasks 1-8)

### Task 1: Update villes.csv with all 153 communes

**Files:**
- Modify: `data/villes.csv`

- [ ] **Step 1: Replace villes.csv with complete 153 communes dataset**

Replace the current 10-city CSV with all 153 communes of the Var department, sorted by population descending. Add a `tier` column (1 for pop >= 15000, 2 for the rest).

Format:
```csv
ville,departement,code_postal,population,tier
Toulon,Var,83000,169736,1
La Seyne-sur-Mer,Var,83500,64651,1
Hyères,Var,83400,55792,1
Fréjus,Var,83370,53187,1
Draguignan,Var,83300,40063,1
Saint-Raphaël,Var,83530,35247,1
Six-Fours-les-Plages,Var,83140,33272,1
La Garde,Var,83130,25262,1
La Valette-du-Var,Var,83160,23792,1
La Crau,Var,83260,17945,1
Brignoles,Var,83170,17509,1
Sanary-sur-Mer,Var,83110,16745,1
Saint-Maximin-la-Sainte-Baume,Var,83470,16389,2
Sainte-Maxime,Var,83120,14268,2
...all 153 communes...
Vérignon,Var,83630,15,2
```

Data source: the WebFetch result from Wikipedia/annuaires-thematiques already retrieved during brainstorming. Use that exact dataset.

- [ ] **Step 2: Verify CSV has exactly 153 lines (excluding header)**

Run: `wc -l data/villes.csv` → Expected: 154 (header + 153 data lines)

- [ ] **Step 3: Commit**

```bash
git add data/villes.csv
git commit -m "data: add all 153 communes of Var (83) with tier classification"
```

---

### Task 2: Update Ville type and villes.ts to support tier

**Files:**
- Modify: `lib/types.ts`
- Modify: `lib/data/villes.ts`

- [ ] **Step 1: Add tier field to Ville interface**

In `lib/types.ts`, add `tier: 1 | 2;` to the `Ville` interface:

```typescript
export interface Ville {
  ville: string;
  departement: string;
  code_postal: string;
  population: number;
  slug: string;
  tier: 1 | 2;
}
```

- [ ] **Step 2: Update CSV parser in villes.ts to read tier column**

In `lib/data/villes.ts`, update the `getAllVilles()` parser:

```typescript
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
```

- [ ] **Step 3: Add helper functions for tier filtering and nearby calculation**

Add to `lib/data/villes.ts`:

```typescript
export function getTier1Villes(): Ville[] {
  return getAllVilles().filter((v) => v.tier === 1);
}

export function getNearbyVilles(slug: string, max = 5): Ville[] {
  const all = getAllVilles();
  const current = all.find((v) => v.slug === slug);
  if (!current) return all.slice(0, max);

  // Sort by same tier first, then by population proximity
  return all
    .filter((v) => v.slug !== slug)
    .sort((a, b) => {
      // Prioritize same department area (same first 3 digits of postal code)
      const aClose = a.code_postal.slice(0, 3) === current.code_postal.slice(0, 3) ? 0 : 1;
      const bClose = b.code_postal.slice(0, 3) === current.code_postal.slice(0, 3) ? 0 : 1;
      if (aClose !== bClose) return aClose - bClose;
      // Then by population (larger cities first for better link juice)
      return b.population - a.population;
    })
    .slice(0, max);
}
```

This replaces the existing naive `getNearbyVilles` that just took the first N from the list.

- [ ] **Step 4: Verify build**

Run: `npm run build` → Expected: success, all existing pages still render

- [ ] **Step 5: Commit**

```bash
git add lib/types.ts lib/data/villes.ts
git commit -m "feat: add tier support to Ville type and improve nearby city sorting"
```

---

### Task 3: Create quartiers data module

**Files:**
- Create: `lib/data/quartiers.ts`

- [ ] **Step 1: Create quartiers.ts with data for Tier 1 cities and regional problematics**

Create `lib/data/quartiers.ts`:

```typescript
export interface CityLocalData {
  quartiers: string[];
  axes: string[];
  habitat: string;
  problematique: string;
  contexte: string;
}

// Tier 1 cities get detailed local data
const cityData: Record<string, CityLocalData> = {
  'toulon': {
    quartiers: ['Le Mourillon', 'Saint-Jean du Var', 'La Rode', 'Pont du Las', 'Le Port'],
    axes: ['Avenue de la République', 'Boulevard de Strasbourg'],
    habitat: 'Immeubles anciens centre-ville, résidences en périphérie',
    problematique: 'Canalisations en fonte vieillissantes dans le centre historique, forte calcaire',
    contexte: 'Préfecture du Var, centre urbain dense avec réseau ancien',
  },
  'la-seyne-sur-mer': {
    quartiers: ['Mar Vivo', 'Les Sablettes', 'Tamaris', 'Le Pas du Loup', 'Berthe'],
    axes: ['Avenue Esprit Armando', 'Corniche Michel Pacha'],
    habitat: 'Mix immeubles collectifs et villas littorales',
    problematique: 'Réseau ancien en centre-ville, engorgements estivaux littoral',
    contexte: 'Deuxième ville du Var, littoral méditerranéen',
  },
  'hyeres': {
    quartiers: ['L\'Ayguade', 'Les Salins', 'Giens', 'Le Port', 'Costebelle'],
    axes: ['Avenue Gambetta', 'Route de Giens'],
    habitat: 'Villas résidentielles, résidences touristiques, centre ancien',
    problematique: 'Afflux touristique surchargeant les réseaux, vieux centre médiéval',
    contexte: 'Station balnéaire, presqu\'île de Giens, forte saisonnalité',
  },
  'frejus': {
    quartiers: ['Fréjus Plage', 'Saint-Aygulf', 'Tour de Mare', 'La Gabelle', 'Villeneuve'],
    axes: ['Boulevard de la Libération', 'Route de Bagnols'],
    habitat: 'Résidences touristiques, villas, immeubles récents',
    problematique: 'Sable et sédiments dans les canalisations proches du littoral',
    contexte: 'Ville romaine, mix centre historique et stations balnéaires',
  },
  'draguignan': {
    quartiers: ['Les Collettes', 'Le Muy', 'Les Négadis', 'Saint-Hermentaire', 'La Foux'],
    axes: ['Boulevard Georges Clemenceau', 'Avenue de Montferrat'],
    habitat: 'Centre ancien dense, lotissements périphériques',
    problematique: 'Réseau vétuste centre historique, épisodes cévenols violents',
    contexte: 'Sous-préfecture, arrière-pays varois, zone inondable',
  },
  'saint-raphael': {
    quartiers: ['Valescure', 'Boulouris', 'Le Dramont', 'Santa Lucia', 'Agay'],
    axes: ['Boulevard Félix Martin', 'Corniche d\'Or'],
    habitat: 'Villas résidentielles haut de gamme, résidences balnéaires',
    problematique: 'Calcaire important, canalisations résidences secondaires peu entretenues',
    contexte: 'Station balnéaire chic, Estérel, forte population saisonnière',
  },
  'six-fours-les-plages': {
    quartiers: ['Le Brusc', 'Reynier', 'La Coudoulière', 'Les Lônes', 'Le Cap Nègre'],
    axes: ['Route de la Seyne', 'Chemin de la Plage'],
    habitat: 'Villas pavillonnaires, quelques résidences',
    problematique: 'Fosses septiques anciennes dans certains quartiers, calcaire',
    contexte: 'Commune littorale résidentielle, île des Embiez',
  },
  'la-garde': {
    quartiers: ['Sainte-Marguerite', 'Le Thouar', 'Les Savels', 'La Planquette', 'La Pauline'],
    axes: ['Avenue de Draguignan', 'Route de La Valette'],
    habitat: 'Lotissements pavillonnaires, résidences universitaires',
    problematique: 'Calcaire modéré, lotissements des années 70-80 avec réseau vieillissant',
    contexte: 'Commune périurbaine de Toulon, université',
  },
  'la-valette-du-var': {
    quartiers: ['Le Coudon', 'Sainte-Claire', 'Le Partegal', 'Les Fourriers', 'Le Gai Versant'],
    axes: ['Avenue Colonel Picot', 'Rocade Est'],
    habitat: 'Pavillonnaire dense, quelques immeubles récents',
    problematique: 'Réseau mixte ancien/récent, calcaire important',
    contexte: 'Commune résidentielle, flanc du Coudon',
  },
  'la-crau': {
    quartiers: ['Le Centre', 'Les Vallons', 'La Moutonne', 'La Decapris', 'Les Parcs'],
    axes: ['Route Nationale 97', 'Avenue de la Gare'],
    habitat: 'Villas avec jardins, zone rurale en expansion',
    problematique: 'Fosses septiques dans les zones rurales, réseau récent mais calcaire',
    contexte: 'Commune semi-rurale en pleine expansion, plaine de La Crau',
  },
  'brignoles': {
    quartiers: ['Le Centre Ancien', 'Les Music', 'Plan d\'Aups', 'La Celle', 'Zone Nicopolis'],
    axes: ['Rue des Lanciers', 'Avenue Dreo'],
    habitat: 'Vieux centre provençal dense, lotissements modernes autour',
    problematique: 'Centre ancien avec canalisations très vétustes, épisodes pluvieux violents',
    contexte: 'Sous-préfecture du Var Vert, centre Provence Verte',
  },
  'sanary-sur-mer': {
    quartiers: ['Le Port', 'Portissol', 'Beaucours', 'La Gorguette', 'Lançon'],
    axes: ['Boulevard Courbet', 'Route de Bandol'],
    habitat: 'Village provençal, villas en bord de mer',
    problematique: 'Réseau ancien dans le vieux port, afflux touristique estival',
    contexte: 'Village pittoresque, port de pêche, forte saisonnalité',
  },
};

// Generic data generators for Tier 2 cities based on context
const defaultProblematiques = [
  'Calcaire important dans l\'eau du Var, entartrage fréquent des canalisations',
  'Épisodes méditerranéens avec pluies violentes surchargeant les réseaux',
  'Réseau d\'assainissement ancien nécessitant un entretien régulier',
  'Fosses septiques individuelles dans les zones non raccordées au tout-à-l\'égout',
];

export function getCityLocalData(slug: string): CityLocalData {
  if (cityData[slug]) return cityData[slug];

  // Return a generic but contextually appropriate fallback
  return {
    quartiers: ['Le Centre', 'Le Village'],
    axes: ['Route Départementale'],
    habitat: 'Habitat varié, villas et petits immeubles',
    problematique: defaultProblematiques[Math.abs(hashCode(slug)) % defaultProblematiques.length],
    contexte: 'Commune du Var',
  };
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/data/quartiers.ts
git commit -m "feat: add quartiers/local data module for Tier 1 cities"
```

---

### Task 4: Update content.ts to support new JSON format

**Files:**
- Modify: `lib/data/content.ts`
- Modify: `lib/types.ts`

- [ ] **Step 1: Add ServiceCityPageData type to types.ts**

Add to `lib/types.ts`:

```typescript
export interface GeneratedPageData {
  title: string;
  slug: string;
  type: 'ville' | 'service-ville';
  ville: string;
  code_postal: string;
  service?: string;
  status: string;
  meta: {
    title: string;
    description: string;
    focus_keyword: string;
  };
  content: string;
  faq: FaqItem[];
  schema: Record<string, unknown>;
  internal_links: { slug: string; label: string }[];
  word_count: number;
  quartiers: string[];
}
```

- [ ] **Step 2: Update content.ts to support new format alongside old Yoast format**

Replace `lib/data/content.ts`:

```typescript
import fs from 'fs';
import path from 'path';
import { PageData, FaqItem, GeneratedPageData } from '@/lib/types';

const contentCache: Map<string, PageData> = new Map();

export function getPageContent(slug: string): PageData | null {
  if (contentCache.has(slug)) return contentCache.get(slug)!;

  const filePath = path.join(process.cwd(), 'data', 'generated', `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Support both old (Yoast) and new format
  const faqs = raw.faq?.length
    ? raw.faq
    : extractFaqs(raw.content || '');

  const meta = raw.meta || {};

  const pageData: PageData = {
    title: raw.title,
    slug: raw.slug,
    content: raw.content,
    meta: {
      title: meta.title || meta._yoast_wpseo_title || raw.title,
      description: meta.description || meta._yoast_wpseo_metadesc || '',
      focusKeyword: meta.focus_keyword || meta._yoast_wpseo_focuskw || '',
      canonical: `/${raw.slug}/`,
    },
    faqs,
  };

  contentCache.set(slug, pageData);
  return pageData;
}

export function getAllPageSlugs(): string[] {
  const dir = path.join(process.cwd(), 'data', 'generated');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));
}

function extractFaqs(html: string): FaqItem[] {
  const faqs: FaqItem[] = [];
  const regex = /<p><strong>(.*?)<\/strong><br\s*\/?>\s*([\s\S]*?)<\/p>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').trim();
    if (question.includes('?')) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build` → Expected: success

- [ ] **Step 4: Commit**

```bash
git add lib/types.ts lib/data/content.ts
git commit -m "feat: support new generated page JSON format in content loader"
```

---

### Task 5: Create dynamic route for service×city pages

**Files:**
- Create: `app/[serviceSlug]-[villeSlug]/page.tsx`
- Modify: `lib/seo/metadata.ts`
- Modify: `lib/seo/schema.ts`
- Modify: `lib/linking/internal.ts`

- [ ] **Step 1: Add metadata generator for service×city pages**

Add to `lib/seo/metadata.ts`:

```typescript
export function generateMetadataForServiceCity(service: Service, ville: Ville): Metadata {
  const title = `${service.label} ${ville.ville} ${ville.code_postal} — Intervention rapide`;
  const description = `${service.label} à ${ville.ville} (${ville.code_postal}). Technicien qualifié, intervention rapide 24h/7j dans le ${ville.departement}. Devis gratuit.`;
  const slug = `${service.slug}-${ville.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/${slug}/` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${slug}/`,
      siteName: COMPANY_NAME,
      locale: 'fr_FR',
      type: 'website',
    },
  };
}
```

- [ ] **Step 2: Add schema generator for service×city pages**

Add to `lib/seo/schema.ts`:

```typescript
export function generateSchemaServiceCity(service: Service, ville: Ville) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.label} à ${ville.ville}`,
    description: `${service.label} à ${ville.ville} (${ville.code_postal}). Intervention rapide 24h/7j.`,
    provider: {
      '@type': 'Plumber',
      name: COMPANY_NAME,
      telephone: PHONE,
      areaServed: {
        '@type': 'City',
        name: ville.ville,
        postalCode: ville.code_postal,
      },
    },
    areaServed: {
      '@type': 'City',
      name: ville.ville,
      postalCode: ville.code_postal,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'EUR',
      },
    },
  };
}
```

- [ ] **Step 3: Add breadcrumb helper for service×city**

Add to `lib/linking/internal.ts`, update `getBreadcrumbItems`:

```typescript
export function getBreadcrumbItems(
  type: 'city' | 'service' | 'technique' | 'service-city',
  label: string,
  slug: string,
  extra?: { villeLabel?: string; villeSlug?: string; serviceLabel?: string; serviceSlug?: string }
) {
  const base = [{ name: 'Accueil', href: '/' }];

  if (type === 'city') {
    return [
      ...base,
      { name: 'Zones d\'intervention', href: '/zones-dintervention/' },
      { name: label, href: `/debouchage-${slug}/` },
    ];
  }

  if (type === 'service') {
    return [
      ...base,
      { name: 'Nos prestations', href: '/nos-prestations/' },
      { name: label, href: `/${slug}/` },
    ];
  }

  if (type === 'service-city' && extra) {
    return [
      ...base,
      { name: extra.serviceLabel || label, href: `/${extra.serviceSlug}/` },
      { name: `${extra.serviceLabel} ${extra.villeLabel}`, href: `/${slug}/` },
    ];
  }

  return [
    ...base,
    { name: 'Var', href: '/var/' },
    { name: label, href: `/${slug}/` },
  ];
}
```

- [ ] **Step 4: Create the dynamic route page**

Create `app/[serviceSlug]-[villeSlug]/page.tsx`:

**IMPORTANT:** Next.js doesn't support multiple dynamic segments in a single folder name like `[serviceSlug]-[villeSlug]`. Instead, use a catch-all approach: create a single dynamic route `app/[combo]/page.tsx` that parses the slug to extract service and city.

Actually, the better approach matching existing patterns: generate static routes. The service×city pages will be loaded from `data/generated/` JSON files. Use a broader catch pattern.

**Revised approach:** Since all service×city slugs follow the pattern `debouchage-[service]-[ville]` and city pages follow `debouchage-[ville]`, and we already have `app/debouchage-[slug]/page.tsx` for cities, we need a separate mechanism.

**Best approach:** Create `app/[slug]/page.tsx` as a catch-all that handles both service×city combos by detecting the pattern. But this conflicts with existing service pages at `app/debouchage-canalisation/page.tsx` etc.

**Simplest approach that works with existing structure:** Add the service×city pages as additional static params in the existing `app/debouchage-[slug]/page.tsx` route, since all URLs start with `debouchage-`. The page component detects whether it's a city page or a service×city page based on the slug pattern.

Update `app/debouchage-[slug]/page.tsx`:

```typescript
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllVilles, getVilleBySlug, getTier1Villes } from '@/lib/data/villes';
import { getAllServices, getServiceBySlug } from '@/lib/data/services';
import { getPageContent } from '@/lib/data/content';
import { generateMetadataForCity, generateMetadataForServiceCity } from '@/lib/seo/metadata';
import { generateSchemaCity, generateSchemaFAQ, generateSchemaServiceCity } from '@/lib/seo/schema';
import { getBreadcrumbItems } from '@/lib/linking/internal';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Hero from '@/components/page-ville/Hero';
import Services from '@/components/page-ville/Services';
import UrgenceBanner from '@/components/page-ville/UrgenceBanner';
import ZoneCoverte from '@/components/page-ville/ZoneCoverte';
import Arguments from '@/components/page-ville/Arguments';
import Faq from '@/components/page-ville/Faq';
import CtaFinal from '@/components/page-ville/CtaFinal';
import ServiceCityContent from '@/components/page-service-city/ServiceCityContent';
import { FaqItem } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Parse slug to determine if it's a city page or service×city page
function parseSlug(slug: string): { type: 'city'; villeSlug: string } | { type: 'service-city'; serviceSlug: string; villeSlug: string } | null {
  // Try service×city first (longer match)
  const services = getAllServices();
  for (const service of services) {
    const servicePrefix = service.slug.replace('debouchage-', '');
    if (slug.startsWith(servicePrefix + '-')) {
      const villeSlug = slug.slice(servicePrefix.length + 1);
      const ville = getVilleBySlug(villeSlug);
      if (ville) {
        return { type: 'service-city', serviceSlug: service.slug, villeSlug };
      }
    }
  }

  // Try city
  const ville = getVilleBySlug(slug);
  if (ville) {
    return { type: 'city', villeSlug: slug };
  }

  return null;
}

export async function generateStaticParams() {
  const villes = getAllVilles();
  const services = getAllServices();
  const tier1 = getTier1Villes();

  // City pages for all 153 communes
  const cityParams = villes.map((v) => ({ slug: v.slug }));

  // Service×city pages for Tier 1 only
  const serviceCityParams = tier1.flatMap((v) =>
    services.map((s) => ({
      slug: `${s.slug.replace('debouchage-', '')}-${v.slug}`,
    }))
  );

  return [...cityParams, ...serviceCityParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return {};

  if (parsed.type === 'city') {
    const ville = getVilleBySlug(parsed.villeSlug)!;
    return generateMetadataForCity(ville);
  }

  const service = getServiceBySlug(parsed.serviceSlug)!;
  const ville = getVilleBySlug(parsed.villeSlug)!;
  return generateMetadataForServiceCity(service, ville);
}

function getDefaultFaqs(villeName: string): FaqItem[] {
  return [
    {
      question: `Quel est le délai d'intervention à ${villeName} ?`,
      answer: `Nos techniciens interviennent généralement en moins d'une heure sur ${villeName} et les quartiers proches. En cas d'urgence absolue, nous priorisons votre appel.`,
    },
    {
      question: `Le debouchage est-il garanti à ${villeName} ?`,
      answer: `Oui, chaque intervention est garantie. Si le bouchon n'est pas résolu, nous revenons sans frais supplémentaires.`,
    },
    {
      question: `Combien coûte un debouchage à ${villeName} ?`,
      answer: `Le tarif dépend du type d'intervention. Nous donnons un devis gratuit par téléphone et confirmons le prix avant de commencer. Aucun frais caché.`,
    },
  ];
}

export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  if (parsed.type === 'service-city') {
    const service = getServiceBySlug(parsed.serviceSlug)!;
    const ville = getVilleBySlug(parsed.villeSlug)!;
    const content = getPageContent(`${parsed.serviceSlug}-${parsed.villeSlug}`);
    const faqs = content?.faqs?.length ? content.faqs : getDefaultFaqs(ville.ville);

    const serviceSchema = generateSchemaServiceCity(service, ville);
    const faqSchema = generateSchemaFAQ(faqs);
    const breadcrumbs = getBreadcrumbItems('service-city', service.label, `debouchage-${slug}`, {
      villeLabel: ville.ville,
      villeSlug: ville.slug,
      serviceLabel: service.label,
      serviceSlug: service.slug,
    });

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <Breadcrumbs items={breadcrumbs} />
        <ServiceCityContent service={service} ville={ville} content={content} faqs={faqs} />
      </>
    );
  }

  // City page (existing logic)
  const ville = getVilleBySlug(parsed.villeSlug)!;
  const content = getPageContent(`debouchage-${slug}`);
  const faqs = content?.faqs?.length ? content.faqs : getDefaultFaqs(ville.ville);
  const breadcrumbs = getBreadcrumbItems('city', ville.ville, ville.slug);
  const citySchema = generateSchemaCity(ville);
  const faqSchema = generateSchemaFAQ(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={breadcrumbs} />
      <Hero ville={ville} />
      <Services ville={ville.ville} />
      <UrgenceBanner />
      <ZoneCoverte ville={ville} />
      <Arguments />
      <Faq faqs={faqs} ville={ville.ville} />
      <CtaFinal ville={ville.ville} />
    </>
  );
}
```

- [ ] **Step 5: Create ServiceCityContent component**

Create `components/page-service-city/ServiceCityContent.tsx`:

```typescript
import { Service, Ville, PageData, FaqItem } from '@/lib/types';
import { getNearbyVilles } from '@/lib/data/villes';
import { PHONE, PHONE_RAW } from '@/lib/config';
import Link from 'next/link';
import Faq from '@/components/page-ville/Faq';
import CtaFinal from '@/components/page-ville/CtaFinal';
import UrgenceBanner from '@/components/page-ville/UrgenceBanner';
import styles from './ServiceCityContent.module.css';

interface Props {
  service: Service;
  ville: Ville;
  content: PageData | null;
  faqs: FaqItem[];
}

export default function ServiceCityContent({ service, ville, content, faqs }: Props) {
  const nearby = getNearbyVilles(ville.slug, 5);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <div className={styles.badge}>{service.icon} {service.label}</div>
          <h1 className={styles.title}>
            {service.label}<br />
            <em>à {ville.ville}</em>
          </h1>
          <p className={styles.sub}>
            Technicien disponible 24h/7j à {ville.ville} ({ville.code_postal}).
            Intervention rapide, devis gratuit.
          </p>
          <a href={`tel:${PHONE_RAW}`} className="btn-primary">
            📞 {PHONE}
          </a>
        </div>
      </section>

      {/* Generated content or fallback */}
      {content?.content ? (
        <section className={styles.section}>
          <div className="container">
            <div
              className={styles.generatedContent}
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </div>
        </section>
      ) : (
        <>
          <section className={styles.section}>
            <div className="container">
              <div className="section-label">Le problème</div>
              <h2 className="section-title">{service.label} bouché à {ville.ville} ?</h2>
              <div className={styles.textBlock}>
                <p>{service.description}</p>
              </div>
            </div>
          </section>

          <section className={styles.section} style={{ background: 'var(--navy-mid)' }}>
            <div className="container">
              <div className="section-label">Notre méthode</div>
              <h2 className="section-title">Comment on intervient</h2>
              <div className={styles.textBlock}>
                <p><strong>Méthode :</strong> {service.intervention}</p>
                <ul className={styles.problemList}>
                  {service.problems.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className="container">
              <div className="section-label">Tarif</div>
              <h2 className="section-title">Combien ça coûte ?</h2>
              <div className={styles.textBlock}>
                <p>Fourchette de prix : <strong>{service.priceRange}</strong>. Devis gratuit par téléphone avant toute intervention.</p>
              </div>
            </div>
          </section>
        </>
      )}

      <UrgenceBanner />

      {/* Nearby cities with same service */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-label">Communes voisines</div>
          <h2 className="section-title">{service.label} près de {ville.ville}</h2>
          <div className={styles.villeTags}>
            <Link href={`/debouchage-${ville.slug}/`} className={styles.villeTag}>
              ← Tous les services à {ville.ville}
            </Link>
            {nearby.map((v) => (
              <Link
                key={v.slug}
                href={v.tier === 1
                  ? `/debouchage-${service.slug.replace('debouchage-', '')}-${v.slug}/`
                  : `/debouchage-${v.slug}/`
                }
                className={styles.villeTag}
              >
                {service.label} {v.ville}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq faqs={faqs} ville={ville.ville} />
      <CtaFinal ville={ville.ville} />
    </>
  );
}
```

- [ ] **Step 6: Create CSS module for ServiceCityContent**

Create `components/page-service-city/ServiceCityContent.module.css` — reuse similar styles to existing ServicePageContent.module.css. Read that file first, then adapt.

- [ ] **Step 7: Verify build**

Run: `npm run build` → Expected: success with 285+ static pages generated

- [ ] **Step 8: Commit**

```bash
git add app/debouchage-\[slug\]/page.tsx lib/seo/metadata.ts lib/seo/schema.ts lib/linking/internal.ts components/page-service-city/
git commit -m "feat: add dynamic service×city pages for Tier 1 communes"
```

---

### Task 6: Update sitemap to include service×city pages

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Add service×city URLs to sitemap**

```typescript
import { MetadataRoute } from 'next';
import { getAllVilles, getTier1Villes } from '@/lib/data/villes';
import { getAllServices } from '@/lib/data/services';
import { BASE_URL } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const villes = getAllVilles();
  const services = getAllServices();
  const tier1 = getTier1Villes();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/nos-prestations/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/nos-tarifs/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/zones-dintervention/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ];

  const villePages: MetadataRoute.Sitemap = villes.map((v) => ({
    url: `${BASE_URL}/debouchage-${v.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: v.tier === 1 ? 0.9 : 0.7,
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((s) => ({
    url: `${BASE_URL}/${s.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Service×city combos for Tier 1
  const serviceCityPages: MetadataRoute.Sitemap = tier1.flatMap((v) =>
    services.map((s) => ({
      url: `${BASE_URL}/debouchage-${s.slug.replace('debouchage-', '')}-${v.slug}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  );

  return [...staticPages, ...villePages, ...servicePages, ...serviceCityPages];
}
```

- [ ] **Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: include 285 pages in sitemap with tier-based priority"
```

---

### Task 7: Improve CTA design and visibility

**Files:**
- Modify: `components/layout/StickyCta.tsx`
- Modify: `components/layout/StickyCta.module.css`
- Modify: `components/page-ville/Hero.tsx`
- Modify: `components/page-ville/Hero.module.css`
- Modify: `components/page-ville/CtaFinal.tsx`
- Modify: `components/page-ville/CtaFinal.module.css`
- Modify: `components/page-ville/UrgenceBanner.tsx`
- Modify: `components/page-ville/UrgenceBanner.module.css`
- Modify: `app/globals.css`

- [ ] **Step 1: Improve StickyCta — make it visible on all devices, not just mobile**

Update `components/layout/StickyCta.module.css`:

```css
.sticky {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 200;
  padding: 12px 16px;
  background: rgba(13, 17, 23, 0.97);
  backdrop-filter: blur(16px);
  border-top: 1px solid rgba(251, 117, 0, 0.3);
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.sticky.visible {
  transform: translateY(0);
}

.inner {
  max-width: 1160px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.text {
  display: none;
  color: var(--slate);
  font-size: 14px;
  font-weight: 500;
}

.link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--orange);
  color: var(--navy);
  font-weight: 700;
  font-size: 17px;
  padding: 16px 32px;
  border-radius: 50px;
  text-decoration: none;
  min-height: 56px;
  width: 100%;
  box-shadow: 0 0 30px rgba(251, 117, 0, 0.3);
  animation: ctaPulse 3s ease-in-out infinite;
}

@keyframes ctaPulse {
  0%, 100% { box-shadow: 0 0 30px rgba(251, 117, 0, 0.3); }
  50% { box-shadow: 0 0 50px rgba(251, 117, 0, 0.5); }
}

@media (min-width: 769px) {
  .text {
    display: block;
  }
  .link {
    width: auto;
  }
}
```

Update `components/layout/StickyCta.tsx`:

```typescript
'use client';
import { PHONE, PHONE_RAW } from '@/lib/config';
import { useStickyCta } from '@/hooks/useStickyCta';
import styles from './StickyCta.module.css';

export default function StickyCta() {
  const visible = useStickyCta();

  return (
    <div className={`${styles.sticky} ${visible ? styles.visible : ''}`}>
      <div className={styles.inner}>
        <span className={styles.text}>Urgence debouchage ? Appelez maintenant</span>
        <a href={`tel:${PHONE_RAW}`} className={styles.link}>
          📞 Appeler — {PHONE}
        </a>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add pulse animation to Hero CTA button**

Add to `app/globals.css`:

```css
@keyframes btnPulse {
  0%, 100% { box-shadow: 0 0 40px rgba(251, 117, 0, 0.35); }
  50% { box-shadow: 0 0 60px rgba(251, 117, 0, 0.55); }
}

.btn-primary {
  animation: btnPulse 3s ease-in-out infinite;
}
```

Update the existing `.btn-primary` rule in globals.css to include animation.

- [ ] **Step 3: Improve CtaFinal with gradient background and bigger phone number**

Update `components/page-ville/CtaFinal.module.css`:

```css
.cta {
  background: linear-gradient(135deg, var(--orange-dark) 0%, var(--orange) 50%, var(--orange-light) 100%);
  text-align: center;
  padding: 80px 24px;
  position: relative;
  overflow: hidden;
}

.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.1) 0%, transparent 60%);
}

.content {
  position: relative;
  z-index: 1;
}

.title {
  font-size: clamp(36px, 7vw, 64px);
  color: var(--navy);
  letter-spacing: 0.04em;
  line-height: 1.05;
  margin-bottom: 12px;
}

.desc {
  font-size: 18px;
  color: rgba(13, 17, 23, 0.7);
  margin-bottom: 32px;
  font-weight: 500;
}

.phone {
  display: block;
  font-size: clamp(32px, 7vw, 56px);
  color: var(--navy);
  letter-spacing: 0.08em;
  text-decoration: none;
  margin-top: 24px;
  font-weight: 700;
  transition: opacity 0.2s;
}

.phone:hover {
  opacity: 0.8;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.btnDark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--navy);
  color: var(--white);
  font-weight: 700;
  font-size: 18px;
  padding: 18px 40px;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.25s;
  min-height: 56px;
}

.btnDark:hover {
  background: var(--navy-mid);
  transform: translateY(-2px);
}
```

Update `components/page-ville/CtaFinal.tsx`:

```typescript
import { PHONE, PHONE_RAW } from '@/lib/config';
import styles from './CtaFinal.module.css';

interface Props {
  ville?: string;
}

export default function CtaFinal({ ville }: Props) {
  return (
    <section className={styles.cta}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          On s&apos;en occupe<br />maintenant.
        </h2>
        <p className={styles.desc}>
          Devis gratuit · Intervention en moins d&apos;1h · Disponible 24h/7j
          {ville ? ` à ${ville}` : ''}
        </p>
        <div className={styles.actions}>
          <a href={`tel:${PHONE_RAW}`} className={styles.btnDark}>
            📞 Appeler maintenant
          </a>
        </div>
        <a href={`tel:${PHONE_RAW}`} className={styles.phone}>
          {PHONE}
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Verify visual result**

Run: `npm run dev` → Check Hero, CtaFinal, UrgenceBanner, StickyCta visually on mobile (375px) and desktop (1280px)

- [ ] **Step 5: Commit**

```bash
git add components/layout/StickyCta.tsx components/layout/StickyCta.module.css components/page-ville/CtaFinal.tsx components/page-ville/CtaFinal.module.css app/globals.css
git commit -m "design: improve CTA visibility with pulse animation, gradient backgrounds, and all-device sticky bar"
```

---

### Task 8: Responsive audit and fixes

**Files:**
- Modify: `app/globals.css`
- Modify: `components/layout/Navbar.tsx`
- Modify: `components/layout/Navbar.module.css`
- Modify: various component CSS modules as needed

- [ ] **Step 1: Add responsive breakpoint variables and base utilities**

Add to `app/globals.css`:

```css
/* Responsive utilities */
@media (max-width: 480px) {
  .section-title {
    font-size: clamp(28px, 8vw, 36px);
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
    font-size: 16px;
    padding: 16px 24px;
    min-height: 56px;
  }
}

@media (max-width: 768px) {
  body {
    padding-bottom: 88px;
  }

  .container {
    padding-left: 16px;
    padding-right: 16px;
  }
}
```

- [ ] **Step 2: Make Navbar responsive with hamburger on mobile**

The current Navbar is minimal (logo + CTA). Keep it simple but ensure touch targets are adequate:

Update `components/layout/Navbar.module.css` — ensure `.cta` has `min-height: 48px` and proper padding on mobile.

- [ ] **Step 3: Ensure all grids collapse properly on mobile**

Audit each component's CSS module for grid/flex layouts. Ensure:
- `.stats` in Hero → `flex-wrap: wrap` on very small screens
- Service grids → 1 column on mobile
- Ville tags → `flex-wrap: wrap` with proper gap

- [ ] **Step 4: Verify on mobile viewport**

Run dev server, test at 375px, 480px, 768px, 1024px widths.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "design: responsive audit fixes — touch targets, grid collapse, mobile padding"
```

---

## Track B — Content Generation (Tasks 9-14)

### Task 9: Generate Tier 1 city pages (12 pages, 3 batches of ~4)

**Files:**
- Create: `data/generated/debouchage-[ville].json` × 12 (replace existing 3)

**Multi-agent execution:** Dispatch 3 parallel agents, each generating ~4 city pages.

Each agent receives this prompt template:

```
ROLE: Tu es un rédacteur SEO spécialisé en plomberie/debouchage dans le Var (83).
TON: Pro avec touche humaine — "on" plutôt que "nous", phrases courtes, références terrain.
PAS DE: copwriting générique, superlatifs creux, pression commerciale.

MISSION: Génère [N] pages ville au format JSON pour les communes suivantes :
[LISTE DES VILLES AVEC DONNÉES]

DONNÉES LOCALES PAR VILLE:
[QUARTIERS, AXES, HABITAT, PROBLEMATIQUE, CONTEXTE]

STRUCTURE DE CHAQUE PAGE (HTML dans le champ content):
<h1>Debouchage [Ville] [Code_Postal] — Intervention rapide 24h/7j</h1>
<p>[Intro 2-3 phrases ultra-locales, mentionner quartiers]</p>
<h2>Nos services de debouchage à [Ville]</h2>
[Liste des 11 services avec descriptions courtes adaptées au contexte local]
<h2>On intervient dans tout [Ville] : [Quartier1], [Quartier2]...</h2>
[Paragraphe ultra-local : type d'habitat, problématiques spécifiques, axes]
<h2>Zone d'intervention autour de [Ville]</h2>
[5 communes voisines avec liens <a href="/debouchage-[slug]/">]
<h2>Pourquoi faire appel à nous à [Ville] ?</h2>
[3 arguments : réactivité, transparence, expertise locale]
<h2>Questions fréquentes sur le debouchage à [Ville]</h2>
[3 FAQ en <p><strong>Question ?</strong><br>Réponse</p>]
<h2>Contactez-nous pour un debouchage à [Ville]</h2>
[CTA final avec mention 24h/7j, devis gratuit]

RÈGLES:
- Minimum 800 mots par page
- Contenu 100% unique entre les pages (jamais copier/coller de formulations)
- 5+ liens internes minimum
- Quartiers et références locales OBLIGATOIRES
- FAQ uniques et spécifiques au contexte local

FORMAT JSON PAR PAGE:
{
  "title": "Debouchage [Ville] [Code_Postal] — Urgence 24h/7j",
  "slug": "debouchage-[ville-slug]",
  "type": "ville",
  "ville": "[Ville]",
  "code_postal": "[Code_Postal]",
  "status": "draft",
  "meta": {
    "title": "Debouchage [Ville] [Code_Postal] — Urgence 24h/7j",
    "description": "[150-160 chars avec ville + service principal + département]",
    "focus_keyword": "debouchage [Ville]"
  },
  "content": "[HTML complet]",
  "faq": [{"question": "...", "answer": "..."}],
  "internal_links": [{"slug": "debouchage-[voisine]", "label": "..."}],
  "word_count": [nombre],
  "quartiers": ["...", "..."]
}

Écris chaque fichier JSON dans data/generated/debouchage-[ville-slug].json
```

- [ ] **Step 1: Dispatch agent batch 1 — Toulon, La Seyne-sur-Mer, Hyères, Fréjus**
- [ ] **Step 2: Dispatch agent batch 2 — Draguignan, Saint-Raphaël, Six-Fours-les-Plages, La Garde**
- [ ] **Step 3: Dispatch agent batch 3 — La Valette-du-Var, La Crau, Brignoles, Sanary-sur-Mer**
- [ ] **Step 4: Verify all 12 JSON files exist and have > 800 words**

Run: `for f in data/generated/debouchage-*.json; do echo "$f: $(cat "$f" | python3 -c "import sys,json; print(json.load(sys.stdin).get('word_count', 'N/A'))")"; done`

- [ ] **Step 5: Commit**

```bash
git add data/generated/
git commit -m "content: generate 12 Tier 1 city pages with ultra-local content"
```

---

### Task 10: Generate Tier 1 service×city pages (132 pages, ~26 batches of 5)

**Files:**
- Create: `data/generated/[service-slug]-[ville-slug].json` × 132

**Multi-agent execution:** Dispatch agents in waves of 5 parallel agents, each generating 5 pages (1 service × 5 cities or 5 services × 1 city).

**Recommended batching strategy:** Group by city — each agent handles all 11 services for 1 city. This gives better content coherence.

Agent prompt template for service×city:

```
ROLE: Tu es un rédacteur SEO spécialisé en plomberie/debouchage dans le Var (83).
TON: Pro avec touche humaine.

MISSION: Génère les 11 pages service×ville pour [VILLE] ([CODE_POSTAL]).

DONNÉES LOCALES:
- Quartiers: [LISTE]
- Axes: [LISTE]
- Habitat: [DESCRIPTION]
- Problématique: [DESCRIPTION]
- Contexte: [DESCRIPTION]

SERVICES À COUVRIR:
1. debouchage-canalisation → "Debouchage canalisation"
2. debouchage-wc-toilettes → "Debouchage WC"
3. debouchage-evier-lavabo → "Debouchage évier & lavabo"
4. debouchage-douche-baignoire → "Debouchage douche & baignoire"
5. debouchage-salle-de-bain → "Debouchage salle de bain"
6. debouchage-cuisine → "Debouchage cuisine"
7. debouchage-lave-vaisselle → "Debouchage lave-vaisselle"
8. debouchage-lave-linge → "Debouchage lave-linge"
9. debouchage-fosse-septique → "Debouchage fosse septique"
10. debouchage-egouts-regards → "Debouchage égout & regard"
11. debouchage-ballon-deau-chaude-chauffe-eau → "Debouchage ballon d'eau chaude"

STRUCTURE HTML PAR PAGE:
<h1>[Service Label] à [Ville] — Technicien disponible 24h</h1>
<p>[Intro spécifique service + contexte local de la ville]</p>
<h2>Les causes fréquentes de [problème] à [Ville]</h2>
[3-4 causes avec contexte local : calcaire Var, vétusté, habitat spécifique]
<h2>Comment on intervient pour [service] à [Ville]</h2>
[Déroulé technique : diagnostic, méthode, durée, mention quartiers]
<h2>Tarifs [service] à [Ville]</h2>
[Fourchette réaliste, mention devis gratuit, contexte prix local]
<h2>On intervient aussi près de [Ville]</h2>
[3-5 communes voisines avec liens internes]
<h2>Questions fréquentes</h2>
[3 FAQ service+ville, uniques]
<h2>Besoin d'un [service] à [Ville] ?</h2>
[CTA final]

LIENS INTERNES OBLIGATOIRES:
- Lien vers /debouchage-[ville-slug]/ (page ville parente)
- 2-3 liens vers communes voisines
- 1-2 liens vers autres services dans la même ville

Minimum 600 mots. Contenu unique entre les 11 pages (varier les formulations, les angles, les détails techniques).

SLUG: [service-slug]-[ville-slug] (ex: debouchage-canalisation-toulon)

Écris chaque fichier dans data/generated/[service-slug]-[ville-slug].json
```

- [ ] **Step 1-12: Dispatch 12 agents (1 per Tier 1 city), each generating 11 service×city pages**

Dispatch in waves of 4-5 parallel agents to avoid overload.

Wave 1: Toulon, La Seyne, Hyères, Fréjus, Draguignan
Wave 2: Saint-Raphaël, Six-Fours, La Garde, La Valette, La Crau
Wave 3: Brignoles, Sanary

- [ ] **Step 13: Verify all 132 JSON files exist**

Run: `ls data/generated/debouchage-*-*.json | wc -l` → Expected: 132

- [ ] **Step 14: Commit**

```bash
git add data/generated/
git commit -m "content: generate 132 service×city pages for 12 Tier 1 communes"
```

---

### Task 11: Generate Tier 2 city pages — batch 1 (communes 13-50)

**Files:**
- Create: `data/generated/debouchage-[ville].json` × 38

**Multi-agent execution:** Dispatch agents in batches of 5 pages each → 8 batches.

For Tier 2 cities, the agent prompt includes:
- Less detailed local data (generic quartiers: "Le Centre", "Le Village", + 1-2 credible neighborhood names)
- Regional problematics (calcaire, épisodes méditerranéens, fosses septiques arrière-pays)
- Nearby Tier 1 city references for maillage interne

- [ ] **Step 1-8: Dispatch 8 parallel agent batches of 5 cities each**

Batch 1: Saint-Maximin-la-Sainte-Baume, Sainte-Maxime, Roquebrune-sur-Argens, Ollioules, Cogolin
Batch 2: Saint-Cyr-sur-Mer, Vidauban, Cuers, Solliès-Pont, Le Luc
Batch 3: La Londe-les-Maures, Le Pradet, Carqueiranne, Le Beausset, Le Muy
Batch 4: Lorgues, La Farlède, Bandol, Bormes-les-Mimosas, Puget-sur-Argens
Batch 5: Cavalaire-sur-Mer, Les Arcs, Montauroux, Pierrefeu-du-Var, Trans-en-Provence
Batch 6: Saint-Mandrier-sur-Mer, Le Lavandou, Solliès-Toucas, Fayence, Saint-Zacharie
Batch 7: La Cadière-d'Azur, Garéoult, Pourrières, Tourves, Rocbaron
Batch 8: Nans-les-Pins, Grimaud, Le Cannet-des-Maures

- [ ] **Step 9: Verify 38 JSON files exist with > 600 words**
- [ ] **Step 10: Commit**

```bash
git add data/generated/
git commit -m "content: generate 38 Tier 2 city pages (communes 13-50)"
```

---

### Task 12: Generate Tier 2 city pages — batch 2 (communes 51-100)

**Files:**
- Create: `data/generated/debouchage-[ville].json` × 50

**Multi-agent execution:** 10 batches of 5 pages.

- [ ] **Step 1-10: Dispatch 10 agent batches of 5 cities each**

Communes 51-100 from the CSV sorted by population.

- [ ] **Step 11: Verify 50 JSON files**
- [ ] **Step 12: Commit**

```bash
git add data/generated/
git commit -m "content: generate 50 Tier 2 city pages (communes 51-100)"
```

---

### Task 13: Generate Tier 2 city pages — batch 3 (communes 101-153)

**Files:**
- Create: `data/generated/debouchage-[ville].json` × 53

**Multi-agent execution:** 11 batches of ~5 pages.

For the smallest communes (< 1000 habitants), adjust content to:
- Emphasize rural/isolated context
- Mention fosses septiques, assainissement individuel
- Reference the nearest big city for context
- Shorter content acceptable (600 words minimum)

- [ ] **Step 1-11: Dispatch 11 agent batches**
- [ ] **Step 12: Verify 53 JSON files**
- [ ] **Step 13: Commit**

```bash
git add data/generated/
git commit -m "content: generate 53 Tier 2 city pages (communes 101-153)"
```

---

### Task 14: Final verification and build

**Files:** None new

- [ ] **Step 1: Count all generated JSON files**

Run: `ls data/generated/*.json | wc -l` → Expected: 285

- [ ] **Step 2: Verify no duplicate slugs**

Run: `ls data/generated/*.json | sort | uniq -d` → Expected: empty

- [ ] **Step 3: Check word counts**

Run: `for f in data/generated/*.json; do wc=$(python3 -c "import json; d=json.load(open('$f')); print(d.get('word_count', len(d.get('content','').split())))"); echo "$f: $wc"; done | sort -t: -k2 -n | head -5`

Expected: all pages ≥ 600 words.

- [ ] **Step 4: Full Next.js build**

Run: `npm run build` → Expected: success with 285+ static pages

- [ ] **Step 5: Verify sitemap page count**

Run dev server, fetch `/sitemap.xml`, count URLs → Expected: ~300+ (static + villes + services + service×ville)

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "feat: complete 285 SEO pages for all 153 communes of Var (83)"
```

---

## Execution Notes

### Parallel agent strategy for content generation:

- **Track A (Tasks 1-8):** Sequential, must complete before Track B content renders
- **Track B (Tasks 9-13):** Highly parallelizable
  - Task 9 (12 city pages) and Task 10 (132 service×city pages) can start in parallel
  - Tasks 11-13 (141 Tier 2 cities) can run in parallel with Task 10
  - Within each task, batches of 5 agents run in parallel

### Content quality checks per batch:
- Word count ≥ 600 (Tier 2) or ≥ 800 (Tier 1)
- Internal links present (≥ 5 per page)
- FAQ present (≥ 3 per page)
- No duplicate content between pages in same batch
- Quartiers/local references present
- Correct JSON format

### Agent prompt essentials:
Every content generation agent MUST receive:
1. The exact list of cities with all CSV data
2. Local data (quartiers, axes, habitat, problematique)
3. Nearby cities for internal links
4. The tone guidelines (pro + humain, pas de copwriting)
5. The exact JSON output format
6. The exact file paths to write to
