# Réparation Canalisation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer le site `réparation-canalisation.fr` — nouveau projet Next.js avec pages services, problèmes, prix, géo×153 communes Var, et blog AI.

**Architecture:** Nouveau projet Next.js App Router dans `../reparation-canalisation-next/`. Stack identique à `mondor-debouchage-next` (Supabase direct, CSV villes, Server Components). Pas de Prisma. Contenu statique pour services/problèmes/prix, dynamique pour blog.

**Tech Stack:** Next.js App Router, TypeScript, CSS Modules, Supabase, Vercel Cron, Claude Haiku API

---

## File Map

| Fichier | Rôle |
|---|---|
| `app/layout.tsx` | Layout global, Header, Footer, StickyCTA |
| `app/page.tsx` | Homepage |
| `app/services/[slug]/page.tsx` | 9 pages services (generateStaticParams) |
| `app/problemes/[slug]/page.tsx` | 9 pages problèmes |
| `app/prix/[slug]/page.tsx` | 6 pages prix |
| `app/urgence/page.tsx` | Page urgence |
| `app/[ville]/reparation-canalisation/page.tsx` | 153 pages géo-SEO |
| `app/blog/[slug]/page.tsx` | Articles blog AI |
| `app/api/cron/generate-article/route.ts` | Vercel Cron — 1 article/lundi |
| `app/sitemap.ts` | Sitemap Next.js metadata API |
| `lib/config.ts` | Tel, zone, site URL |
| `lib/data/services.ts` | 9 services réparation |
| `lib/data/problemes.ts` | 9 types de problèmes |
| `lib/data/prix.ts` | 6 pages prix |
| `lib/data/villes.ts` | Lecture villes.csv (copié de mondor-project) |
| `lib/db/supabase.ts` | Client Supabase |
| `lib/seo/schema.ts` | JSON-LD LocalBusiness, Service, FAQ, Article |
| `components/layout/Header.tsx` | Nav + tel |
| `components/layout/Footer.tsx` | Liens + legal |
| `components/layout/StickyCTA.tsx` | Bouton tel sticky mobile |
| `components/service/ServiceHero.tsx` | Hero service |
| `components/service/ServiceProcess.tsx` | 4 étapes process |
| `components/service/ServicePrix.tsx` | Tableau fourchettes prix |
| `components/service/ServiceFAQ.tsx` | FAQ accordéon + JSON-LD |
| `components/geo/GeoHero.tsx` | Hero page ville |
| `components/geo/GeoVillesProches.tsx` | 5 communes Var proches |
| `components/geo/GeoFAQ.tsx` | FAQ locale |
| `data/villes.csv` | 153 communes Var (copié) |

---

## Sprint 1 — Scaffold + Infrastructure

### Task 1 : Créer le projet Next.js

**Files:**
- Create: `../reparation-canalisation-next/` (nouveau projet)

- [ ] Créer le projet :
```bash
cd "/Users/macmondor/Documents/SITE WEB/entreprise de debouchage.com"
npx create-next-app@latest reparation-canalisation-next \
  --typescript --no-tailwind --app --no-src-dir \
  --import-alias "@/*" --no-eslint
```

- [ ] Installer les dépendances :
```bash
cd reparation-canalisation-next
npm install @supabase/supabase-js @anthropic-ai/sdk
```

- [ ] Copier le CSV villes :
```bash
cp mondor-debouchage-next/data/villes.csv reparation-canalisation-next/data/villes.csv
```

- [ ] Copier slugify util :
```bash
mkdir -p reparation-canalisation-next/lib/utils
cp mondor-debouchage-next/lib/utils/slugify.ts reparation-canalisation-next/lib/utils/slugify.ts
```

- [ ] Init git :
```bash
cd reparation-canalisation-next && git init && git add . && git commit -m "feat: init projet reparation-canalisation"
```

---

### Task 2 : Config + types + données statiques

**Files:**
- Create: `lib/config.ts`
- Create: `lib/types.ts`
- Create: `lib/data/services.ts`
- Create: `lib/data/problemes.ts`
- Create: `lib/data/prix.ts`
- Create: `lib/data/villes.ts`

- [ ] Créer `lib/config.ts` :
```typescript
export const CONFIG = {
  tel: process.env.NEXT_PUBLIC_TEL || '0627699134',
  telDisplay: process.env.NEXT_PUBLIC_TEL_DISPLAY || '06 27 69 91 34',
  siteName: 'Réparation Canalisation Var',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://réparation-canalisation.fr',
  zone: 'Var (83)',
  departement: '83',
};
```

- [ ] Créer `lib/types.ts` :
```typescript
export interface Service {
  slug: string;
  titre: string;
  h1: string;
  motCle: string;
  description: string;
  process: { etape: string; detail: string }[];
  prix: { label: string; min: number; max: number; unite: string }[];
  faq: { question: string; reponse: string }[];
}

export interface Probleme {
  slug: string;
  titre: string;
  description: string;
  causes: string[];
  solutions: string[];
  faq: { question: string; reponse: string }[];
}

export interface PrixPage {
  slug: string;
  titre: string;
  description: string;
  tableau: { type: string; min: number; max: number; detail: string }[];
}

export interface Ville {
  ville: string;
  slug: string;
  code_postal: string;
  population: number;
  departement: string;
}

export interface Article {
  id: string;
  slug: string;
  titre: string;
  meta_title?: string;
  meta_description?: string;
  contenu: string;
  excerpt?: string;
  published: boolean;
  created_at: string;
  published_at?: string;
}
```

- [ ] Créer `lib/data/services.ts` avec les 9 services du PRD :
```typescript
import { Service } from '@/lib/types';

const services: Service[] = [
  {
    slug: 'reparation-canalisation',
    titre: 'Réparation Canalisation — Expert Certifié',
    h1: 'Réparation Canalisation',
    motCle: 'réparation canalisation',
    description: 'Réparation complète de canalisations cassées, fissurées ou obstruées dans le Var (83). Intervention certifiée, devis gratuit.',
    process: [
      { etape: 'Diagnostic', detail: 'Inspection caméra pour localiser la casse ou fissure' },
      { etape: 'Devis', detail: 'Devis gratuit et transparent avant toute intervention' },
      { etape: 'Réparation', detail: 'Chemisage, gainage ou remplacement selon diagnostic' },
      { etape: 'Contrôle', detail: 'Test d\'étanchéité et rapport d\'intervention fourni' },
    ],
    prix: [
      { label: 'Réparation ponctuelle', min: 150, max: 500, unite: '€' },
      { label: 'Chemisage (par mètre)', min: 80, max: 200, unite: '€/m' },
      { label: 'Remplacement tronçon', min: 500, max: 3000, unite: '€' },
    ],
    faq: [
      { question: 'Combien coûte une réparation canalisation dans le Var ?', reponse: 'Le coût varie de 150€ à plus de 3 000€ selon la nature des travaux, la profondeur et la technique utilisée. Devis gratuit par téléphone.' },
      { question: 'Peut-on réparer une canalisation sans creuser ?', reponse: 'Oui, le chemisage et le gainage permettent de réparer sans tranchée dans la majorité des cas.' },
      { question: 'Intervenez-vous en urgence dans le Var ?', reponse: 'Oui, nous intervenons 24h/7j dans les 153 communes du Var (83).' },
    ],
  },
  {
    slug: 'chemisage-canalisation',
    titre: 'Chemisage Canalisation Sans Tranchée',
    h1: 'Chemisage Canalisation',
    motCle: 'chemisage canalisation',
    description: 'Rénovation de canalisation par chemisage sans tranchée dans le Var. Technique CIPP durable, 50 ans de garantie.',
    process: [
      { etape: 'Inspection caméra', detail: 'Diagnostic vidéo pour évaluer l\'état de la canalisation' },
      { etape: 'Nettoyage HP', detail: 'Hydrocurage haute pression avant chemisage' },
      { etape: 'Chemisage CIPP', detail: 'Mise en place de la chaussette résine par inversion' },
      { etape: 'Durcissement UV', detail: 'Polymérisation UV — canalisation rénovée en quelques heures' },
    ],
    prix: [
      { label: 'Chemisage (par mètre)', min: 80, max: 200, unite: '€/m' },
      { label: 'Forfait inspection incluse', min: 500, max: 2000, unite: '€' },
    ],
    faq: [
      { question: 'Quelle durée de vie pour un chemisage ?', reponse: 'Un chemisage CIPP a une durée de vie de 50 ans minimum selon les normes européennes.' },
      { question: 'Le chemisage convient-il à toutes les canalisations ?', reponse: 'Il convient aux canalisations de diamètre 50mm à 800mm, en fonte, grès, PVC ou béton.' },
      { question: 'Combien de temps dure l\'intervention ?', reponse: 'De quelques heures à une journée selon la longueur du tronçon à traiter.' },
    ],
  },
  {
    slug: 'gainage-canalisation',
    titre: 'Gainage Canalisation Ponctuel & Complet',
    h1: 'Gainage Canalisation',
    motCle: 'gainage canalisation',
    description: 'Gainage ponctuel ou complet de canalisation dans le Var. Solution sans tranchée pour canalisations fissurées.',
    process: [
      { etape: 'Localisation', detail: 'Caméra robotisée pour trouver la zone endommagée' },
      { etape: 'Préparation', detail: 'Nettoyage et séchage du tronçon à traiter' },
      { etape: 'Pose du manchon', detail: 'Insertion du sleeve ou chemise courte par l\'intérieur' },
      { etape: 'Contrôle', detail: 'Vérification étanchéité et passage caméra final' },
    ],
    prix: [
      { label: 'Gainage ponctuel (manchon)', min: 200, max: 800, unite: '€' },
      { label: 'Gainage complet (par mètre)', min: 70, max: 150, unite: '€/m' },
    ],
    faq: [
      { question: 'Quelle différence entre gainage et chemisage ?', reponse: 'Le gainage est ponctuel (manchon court sur fissure localisée), le chemisage est continu sur tout un tronçon.' },
      { question: 'Le gainage est-il possible en intérieur ?', reponse: 'Oui, c\'est même la technique de prédilection pour les appartements et maisons sans accès extérieur.' },
    ],
  },
  {
    slug: 'reparation-canalisation-enterree',
    titre: 'Réparation Canalisation Enterrée',
    h1: 'Réparation Canalisation Enterrée',
    motCle: 'réparation canalisation enterrée',
    description: 'Réparation de canalisations enterrées dans le Var. Tranchée ou sans tranchée selon accessibilité.',
    process: [
      { etape: 'Détection', detail: 'Localisation précise par inspection caméra ou détection acoustique' },
      { etape: 'Analyse', detail: 'Choix technique : chemisage ou tranchée selon profondeur et état' },
      { etape: 'Réparation', detail: 'Intervention certifiée avec protection de la propriété' },
      { etape: 'Remblayage', detail: 'Remise en état du terrain après intervention' },
    ],
    prix: [
      { label: 'Chemisage sans tranchée', min: 500, max: 3000, unite: '€' },
      { label: 'Réparation avec tranchée', min: 1000, max: 5000, unite: '€' },
    ],
    faq: [
      { question: 'Comment localiser une fuite enterrée ?', reponse: 'Nous utilisons une caméra robotisée et la détection acoustique pour localiser sans creuser dans un premier temps.' },
      { question: 'Qui est responsable d\'une canalisation enterrée en limite de propriété ?', reponse: 'La partie sur votre propriété est à votre charge. La partie sur le domaine public est à la charge de la commune.' },
    ],
  },
  {
    slug: 'reparation-fuite-canalisation',
    titre: 'Réparation Fuite Canalisation — Urgence 24h',
    h1: 'Réparation Fuite Canalisation',
    motCle: 'réparation fuite canalisation',
    description: 'Intervention d\'urgence pour fuite de canalisation dans le Var. Disponible 24h/7j, rapport pour assurance.',
    process: [
      { etape: 'Urgence', detail: 'Coupure d\'eau et sécurisation dans l\'heure' },
      { etape: 'Diagnostic', detail: 'Localisation précise de la fuite' },
      { etape: 'Réparation', detail: 'Colmatage provisoire puis réparation définitive' },
      { etape: 'Rapport', detail: 'Rapport circonstancié pour dossier assurance' },
    ],
    prix: [
      { label: 'Intervention urgence (déplacement)', min: 80, max: 150, unite: '€' },
      { label: 'Réparation fuite apparente', min: 150, max: 500, unite: '€' },
      { label: 'Réparation fuite enterrée', min: 500, max: 3000, unite: '€' },
    ],
    faq: [
      { question: 'Ma fuite est-elle prise en charge par l\'assurance ?', reponse: 'Les dégâts des eaux sont généralement couverts. Nous fournissons un rapport d\'intervention pour votre dossier.' },
      { question: 'Intervenez-vous la nuit pour une fuite ?', reponse: 'Oui, nous sommes disponibles 24h/7j dans tout le Var (83).' },
    ],
  },
  {
    slug: 'inspection-camera-canalisation',
    titre: 'Inspection Caméra Canalisation — Diagnostic Vidéo',
    h1: 'Inspection Caméra Canalisation',
    motCle: 'inspection caméra canalisation',
    description: 'Diagnostic vidéo complet de vos canalisations dans le Var. Caméra HD, rapport avec photos et recommandations.',
    process: [
      { etape: 'Préparation', detail: 'Nettoyage léger avant passage caméra si nécessaire' },
      { etape: 'Inspection HD', detail: 'Caméra robotisée HD dans toute la canalisation' },
      { etape: 'Analyse', detail: 'Identification des défauts, obstructions et déformations' },
      { etape: 'Rapport', detail: 'Rapport vidéo + photos avec recommandations chiffrées' },
    ],
    prix: [
      { label: 'Inspection caméra', min: 100, max: 300, unite: '€' },
      { label: 'Rapport détaillé inclus', min: 0, max: 0, unite: 'offert' },
    ],
    faq: [
      { question: 'L\'inspection caméra est-elle déductible des réparations ?', reponse: 'Chez nous, le coût de l\'inspection est déduit si vous réalisez les travaux recommandés.' },
      { question: 'Combien de temps dure une inspection ?', reponse: 'De 30 minutes à 2 heures selon la longueur et l\'accessibilité du réseau.' },
    ],
  },
  {
    slug: 'hydrocurage-canalisation',
    titre: 'Hydrocurage Canalisation — Haute Pression',
    h1: 'Hydrocurage Canalisation',
    motCle: 'hydrocurage canalisation',
    description: 'Hydrocurage haute pression de canalisations dans le Var. Élimination de toute obstruction, y compris calcaire et racines.',
    process: [
      { etape: 'Inspection', detail: 'Évaluation du colmatage et choix de la buse adaptée' },
      { etape: 'Hydrocurage HP', detail: 'Projection d\'eau à haute pression (150 à 500 bars)' },
      { etape: 'Aspiration', detail: 'Pompage des résidus avec camion hydrocureur' },
      { etape: 'Contrôle', detail: 'Vérification du bon écoulement après intervention' },
    ],
    prix: [
      { label: 'Hydrocurage résidentiel', min: 150, max: 400, unite: '€' },
      { label: 'Curage réseau extérieur', min: 300, max: 1500, unite: '€' },
    ],
    faq: [
      { question: 'L\'hydrocurage endommage-t-il les canalisations ?', reponse: 'Non, la pression est adaptée à chaque type de canalisation. Nous n\'utilisons jamais une pression susceptible d\'endommager le réseau.' },
      { question: 'Quelle différence avec un débouchage classique ?', reponse: 'L\'hydrocurage nettoie en profondeur toute la paroi, là où le furet ne fait que percer l\'obstruction.' },
    ],
  },
  {
    slug: 'reparation-canalisation-sans-casse',
    titre: 'Réparation Canalisation Sans Casse',
    h1: 'Réparation Sans Casse',
    motCle: 'réparation canalisation sans casse',
    description: 'Réparation de canalisation sans démolition ni tranchée dans le Var. Chemisage, gainage, éclatement de conduite.',
    process: [
      { etape: 'Diagnostic', detail: 'Inspection caméra pour évaluer la faisabilité sans casse' },
      { etape: 'Technique choisie', detail: 'Chemisage CIPP, gainage ou éclatement selon le cas' },
      { etape: 'Intervention', detail: 'Réparation par les regards ou accès existants uniquement' },
      { etape: 'Validation', detail: 'Test pression et passage caméra de contrôle' },
    ],
    prix: [
      { label: 'Gainage ponctuel', min: 200, max: 800, unite: '€' },
      { label: 'Chemisage complet', min: 500, max: 3000, unite: '€' },
    ],
    faq: [
      { question: 'Toutes les réparations peuvent-elles se faire sans casse ?', reponse: 'Dans 70 à 80% des cas, oui. Certaines situations (effondrement total, branchement à créer) nécessitent quand même une tranchée localisée.' },
    ],
  },
  {
    slug: 'reparation-canalisation-plomb',
    titre: 'Réparation Canalisation Plomb / Amiante',
    h1: 'Canalisation Plomb & Amiante',
    motCle: 'canalisation plomb réparation',
    description: 'Remplacement et rénovation de canalisations en plomb ou amiante-ciment dans le Var. Obligations légales et santé.',
    process: [
      { etape: 'Diagnostic plomb', detail: 'Identification des tronçons en plomb ou amiante-ciment' },
      { etape: 'Plan de remplacement', detail: 'Priorisation par risque sanitaire et obligation légale' },
      { etape: 'Remplacement', detail: 'Dépose et remplacement par PVC, PE ou cuivre' },
      { etape: 'Évacuation conforme', detail: 'Enlèvement des matériaux selon normes déchets dangereux' },
    ],
    prix: [
      { label: 'Remplacement plomb (par mètre)', min: 60, max: 150, unite: '€/m' },
      { label: 'Forfait appartement', min: 500, max: 2500, unite: '€' },
    ],
    faq: [
      { question: 'Est-on obligé de remplacer les canalisations en plomb ?', reponse: 'Oui, depuis 2013 en France, les canalisations en plomb doivent être remplacées dans les réseaux d\'eau potable.' },
      { question: 'Y a-t-il des aides pour le remplacement du plomb ?', reponse: 'Certaines aides locales ou de l\'ANAH peuvent s\'appliquer. Renseignez-vous auprès de votre mairie.' },
    ],
  },
];

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | null {
  return services.find((s) => s.slug === slug) || null;
}
```

- [ ] Créer `lib/data/problemes.ts` :
```typescript
import { Probleme } from '@/lib/types';

const problemes: Probleme[] = [
  {
    slug: 'canalisation-bouchee',
    titre: 'Canalisation Bouchée — Symptômes et Solutions',
    description: 'Votre canalisation est bouchée dans le Var ? Causes, solutions et tarifs.',
    causes: ['Accumulation de graisses', 'Calcaire', 'Corps étrangers', 'Racines'],
    solutions: ['Débouchage manuel', 'Hydrocurage haute pression', 'Furet motorisé'],
    faq: [
      { question: 'Comment savoir si ma canalisation est bouchée ?', reponse: 'Écoulement lent, bruits de gargouillis, mauvaises odeurs, remontées d\'eau.' },
      { question: 'Peut-on déboucher soi-même ?', reponse: 'Pour un bouchon superficiel oui. Au-delà du siphon, un professionnel est nécessaire.' },
    ],
  },
  {
    slug: 'canalisation-cassee',
    titre: 'Canalisation Cassée — Urgence et Réparation',
    description: 'Canalisation cassée dans le Var ? Intervention d\'urgence 24h/7j.',
    causes: ['Gel', 'Mouvements de terrain', 'Racines', 'Vieillissement'],
    solutions: ['Inspection caméra', 'Chemisage sans tranchée', 'Remplacement tronçon'],
    faq: [
      { question: 'Que faire en cas de canalisation cassée ?', reponse: 'Couper l\'eau et appeler immédiatement. Nous intervenons dans l\'heure dans le Var.' },
    ],
  },
  {
    slug: 'canalisation-fissuree',
    titre: 'Canalisation Fissurée — Détection et Réparation',
    description: 'Fissure sur canalisation dans le Var ? Gainage ou chemisage sans démolition.',
    causes: ['Vieillissement', 'Tassement de terrain', 'Gel/dégel', 'Corrosion'],
    solutions: ['Gainage ponctuel', 'Chemisage CIPP', 'Remplacement si nécessaire'],
    faq: [
      { question: 'Comment détecter une fissure sur une canalisation ?', reponse: 'Seule une inspection caméra permet de localiser et évaluer précisément une fissure.' },
    ],
  },
  {
    slug: 'remontee-eaux-usees',
    titre: 'Remontée Eaux Usées — Urgence Sanitaire',
    description: 'Remontée d\'eaux usées dans le Var ? Intervention d\'urgence, risque sanitaire.',
    causes: ['Bouchon réseau collectif', 'Contre-pente', 'Clapet anti-retour défaillant'],
    solutions: ['Débouchage réseau', 'Pose clapet anti-retour', 'Réparation contre-pente'],
    faq: [
      { question: 'Les remontées d\'eaux usées sont-elles dangereuses ?', reponse: 'Oui, risque bactériologique et sanitaire. Appelez immédiatement.' },
    ],
  },
  {
    slug: 'odeur-canalisation',
    titre: 'Odeur Canalisation — Causes et Traitement',
    description: 'Mauvaises odeurs de canalisations dans le Var ? Diagnostic et traitement.',
    causes: ['Siphon à sec', 'Biofilm accumulé', 'Canalisation fissurée', 'Ventilation défaillante'],
    solutions: ['Nettoyage enzymatique', 'Hydrocurage', 'Vérification ventilation'],
    faq: [
      { question: 'D\'où viennent les mauvaises odeurs de canalisations ?', reponse: 'Un siphon à sec, du biofilm accumulé ou une fissure laissant passer les gaz d\'égout.' },
    ],
  },
  {
    slug: 'canalisation-qui-fuit',
    titre: 'Canalisation qui Fuit — Fuite Apparente vs Enterrée',
    description: 'Fuite de canalisation dans le Var ? Localisation et réparation rapide.',
    causes: ['Joint usé', 'Corrosion', 'Choc', 'Raccord défaillant'],
    solutions: ['Réparation joint', 'Remplacement tronçon', 'Chemisage interne'],
    faq: [
      { question: 'Comment différencier fuite apparente et fuite enterrée ?', reponse: 'Une fuite apparente est visible. Une fuite enterrée se détecte par une hausse de consommation d\'eau ou une zone humide au sol.' },
    ],
  },
  {
    slug: 'racines-dans-canalisation',
    titre: 'Racines dans Canalisation — Curage et Chemisage',
    description: 'Racines d\'arbres dans vos canalisations dans le Var ? Élimination et protection.',
    causes: ['Racines d\'arbres', 'Fissures existantes attirantes', 'Joints défaillants'],
    solutions: ['Fraisage mécanique', 'Hydrocurage', 'Chemisage pour éviter récidive'],
    faq: [
      { question: 'Comment éliminer les racines dans une canalisation ?', reponse: 'Fraisage rotatif puis hydrocurage, suivi d\'un chemisage pour empêcher la repousse.' },
    ],
  },
  {
    slug: 'canalisation-bouchee-cuisine',
    titre: 'Canalisation Bouchée Cuisine — Évier et Graisses',
    description: 'Évier de cuisine bouché dans le Var ? Graisses et résidus alimentaires.',
    causes: ['Graisses alimentaires', 'Résidus alimentaires', 'Calcaire + savon'],
    solutions: ['Nettoyage siphon', 'Débouchage mécanique', 'Hydrocurage réseau cuisine'],
    faq: [
      { question: 'Comment éviter le bouchon cuisine ?', reponse: 'Ne jamais verser graisses et huiles dans l\'évier. Utiliser un filtre de siphon.' },
    ],
  },
  {
    slug: 'canalisation-bouchee-wc',
    titre: 'WC Bouché — Urgence Toilettes',
    description: 'WC bouché dans le Var ? Intervention rapide, résultat garanti sans démontage.',
    causes: ['Corps étranger', 'Papier accumulé', 'Calcaire', 'Problème réseau'],
    solutions: ['Débouchage mécanique', 'Hydrocurage', 'Inspection caméra si récidive'],
    faq: [
      { question: 'Que faire quand les WC débordent ?', reponse: 'Couper l\'alimentation et appeler. N\'actionnez plus la chasse.' },
    ],
  },
];

export function getAllProblemes(): Probleme[] {
  return problemes;
}

export function getProblemeBySlug(slug: string): Probleme | null {
  return problemes.find((p) => p.slug === slug) || null;
}
```

- [ ] Créer `lib/data/prix.ts` :
```typescript
import { PrixPage } from '@/lib/types';

const prixPages: PrixPage[] = [
  {
    slug: 'prix-reparation-canalisation',
    titre: 'Prix Réparation Canalisation Var 2026',
    description: 'Tous les tarifs de réparation canalisation dans le Var (83). Fourchettes de prix par type de travaux.',
    tableau: [
      { type: 'Réparation ponctuelle (manchon)', min: 150, max: 500, detail: 'Fissure localisée, accessible' },
      { type: 'Chemisage CIPP (par mètre)', min: 80, max: 200, detail: 'Sans tranchée, diam. 100–300mm' },
      { type: 'Remplacement tronçon < 5m', min: 500, max: 2000, detail: 'Avec tranchée' },
      { type: 'Remplacement réseau complet', min: 2000, max: 8000, detail: 'Maison individuelle' },
      { type: 'Déplacement urgence nuit', min: 120, max: 200, detail: 'Supplément 20h–8h' },
    ],
  },
  {
    slug: 'prix-chemisage-canalisation',
    titre: 'Prix Chemisage Canalisation — Var 2026',
    description: 'Coût du chemisage de canalisation dans le Var selon diamètre et longueur.',
    tableau: [
      { type: 'Chemisage DN 100 (par ml)', min: 80, max: 120, detail: 'Canalisation standard' },
      { type: 'Chemisage DN 150 (par ml)', min: 100, max: 160, detail: 'Canalisation intermédiaire' },
      { type: 'Chemisage DN 200+ (par ml)', min: 150, max: 250, detail: 'Grand diamètre' },
      { type: 'Forfait inspection incluse', min: 0, max: 100, detail: 'Déduit des travaux' },
    ],
  },
  {
    slug: 'prix-inspection-camera',
    titre: 'Prix Inspection Caméra Canalisation',
    description: 'Tarifs inspection caméra dans le Var. Diagnostic vidéo à partir de 100€.',
    tableau: [
      { type: 'Inspection réseau intérieur', min: 100, max: 200, detail: 'Rapport + photos fournis' },
      { type: 'Inspection réseau extérieur', min: 150, max: 300, detail: 'Jusqu\'à 50 mètres linéaires' },
      { type: 'Inspection réseau collectif', min: 300, max: 800, detail: 'Sur devis selon linéaire' },
    ],
  },
  {
    slug: 'prix-hydrocurage',
    titre: 'Prix Hydrocurage Canalisation — Var 2026',
    description: 'Tarif hydrocurage haute pression dans le Var. À partir de 150€.',
    tableau: [
      { type: 'Hydrocurage résidentiel', min: 150, max: 400, detail: 'Réseau intérieur maison' },
      { type: 'Curage réseau extérieur', min: 300, max: 1500, detail: 'Camion hydrocureur' },
      { type: 'Curage réseau collectif', min: 800, max: 3000, detail: 'Sur devis selon volume' },
    ],
  },
  {
    slug: 'devis-reparation-canalisation',
    titre: 'Devis Réparation Canalisation Gratuit — Var',
    description: 'Demandez votre devis gratuit pour toute réparation de canalisation dans le Var (83).',
    tableau: [],
  },
  {
    slug: 'cout-reparation-fuite-eau',
    titre: 'Coût Réparation Fuite Eau — Var 2026',
    description: 'Quel prix pour réparer une fuite d\'eau dans le Var ? Fourchette 150€ à 5 000€.',
    tableau: [
      { type: 'Fuite robinetterie visible', min: 80, max: 200, detail: 'Joint ou robinet' },
      { type: 'Fuite canalisation apparente', min: 150, max: 600, detail: 'Sous évier, derrière mur' },
      { type: 'Fuite canalisation enterrée', min: 500, max: 3000, detail: 'Avec localisation préalable' },
      { type: 'Fuite grave (urgence)', min: 200, max: 5000, detail: 'Intervention nuit/WE incluse' },
    ],
  },
];

export function getAllPrix(): PrixPage[] {
  return prixPages;
}

export function getPrixBySlug(slug: string): PrixPage | null {
  return prixPages.find((p) => p.slug === slug) || null;
}
```

- [ ] Créer `lib/data/villes.ts` (identique à mondor-project) :
```typescript
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
    const [ville, departement, code_postal, population] = line.split(',');
    return {
      ville: ville.trim(),
      departement: departement.trim(),
      code_postal: code_postal.trim(),
      population: parseInt(population.trim(), 10),
      slug: slugify(ville.trim()),
    };
  });
  return villesCache;
}

export function getVilleBySlug(slug: string): Ville | null {
  return getAllVilles().find((v) => v.slug === slug) || null;
}

export function getVillesProches(slug: string, max = 5): Ville[] {
  const all = getAllVilles();
  const current = all.find((v) => v.slug === slug);
  if (!current) return all.slice(0, max);
  return all
    .filter((v) => v.slug !== slug)
    .sort((a, b) => {
      const aClose = a.code_postal.slice(0, 3) === current.code_postal.slice(0, 3) ? 0 : 1;
      const bClose = b.code_postal.slice(0, 3) === current.code_postal.slice(0, 3) ? 0 : 1;
      if (aClose !== bClose) return aClose - bClose;
      return b.population - a.population;
    })
    .slice(0, max);
}
```

- [ ] Commit :
```bash
git add -A && git commit -m "feat: config, types, données statiques services/problèmes/prix/villes"
```

---

### Task 3 : Supabase client + table articles

**Files:**
- Create: `lib/db/supabase.ts`

- [ ] Créer `lib/db/supabase.ts` :
```typescript
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
```

- [ ] SQL à exécuter dans Supabase Dashboard :
```sql
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  contenu TEXT NOT NULL,
  excerpt TEXT,
  categorie TEXT,
  mots_cles TEXT[],
  ville_ciblee TEXT,
  published BOOLEAN DEFAULT false,
  generated_by_ai BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);
```

- [ ] Créer `.env.local` :
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
CRON_SECRET=
NEXT_PUBLIC_TEL=0627699134
NEXT_PUBLIC_TEL_DISPLAY=06 27 69 91 34
NEXT_PUBLIC_SITE_URL=https://reparation-canalisation.fr
```

- [ ] Commit :
```bash
git add lib/db/supabase.ts && git commit -m "feat: supabase client"
```

---

## Sprint 2 — Layout + Pages Services

### Task 4 : Layout global + composants partagés

**Files:**
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`
- Create: `components/layout/StickyCTA.tsx`

- [ ] Créer `app/globals.css` avec variables CSS :
```css
:root {
  --primary: #0057ff;
  --primary-dark: #003ecc;
  --text: #1a1a2e;
  --text-light: #6b7280;
  --bg: #ffffff;
  --bg-alt: #f8fafc;
  --border: #e5e7eb;
  --success: #16a34a;
  --orange: #f97316;
  --font: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: var(--font); color: var(--text); background: var(--bg); }
a { color: inherit; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 16px; }
.btn-primary {
  display: inline-block;
  background: var(--primary);
  color: #fff;
  padding: 14px 28px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  text-decoration: none;
  transition: background 0.2s;
}
.btn-primary:hover { background: var(--primary-dark); }
```

- [ ] Créer `components/layout/Header.tsx` :
```tsx
import Link from 'next/link';
import { CONFIG } from '@/lib/config';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.logo}>
          <strong>Réparation</strong> Canalisation Var
        </Link>
        <nav className={styles.nav}>
          <Link href="/services/reparation-canalisation">Services</Link>
          <Link href="/prix/prix-reparation-canalisation">Tarifs</Link>
          <Link href="/zones-dintervention">153 communes</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        <a href={`tel:${CONFIG.tel}`} className={styles.tel}>
          📞 {CONFIG.telDisplay}
        </a>
      </div>
    </header>
  );
}
```

- [ ] Créer `components/layout/StickyCTA.tsx` :
```tsx
'use client';
import { CONFIG } from '@/lib/config';
import styles from './StickyCTA.module.css';

export default function StickyCTA() {
  return (
    <div className={styles.sticky}>
      <a href={`tel:${CONFIG.tel}`} className={styles.btn}>
        📞 Appeler maintenant — {CONFIG.telDisplay}
      </a>
    </div>
  );
}
```

- [ ] Créer `app/layout.tsx` :
```tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyCTA from '@/components/layout/StickyCTA';
import { CONFIG } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(CONFIG.siteUrl),
  title: { default: 'Réparation Canalisation Var (83)', template: '%s | Réparation Canalisation Var' },
  description: 'Expert réparation canalisation dans le Var (83). Chemisage, gainage, inspection caméra. Devis gratuit, intervention 24h/7j.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyCTA />
      </body>
    </html>
  );
}
```

- [ ] Commit :
```bash
git add -A && git commit -m "feat: layout global + Header + Footer + StickyCTA"
```

---

### Task 5 : Composants service + page services

**Files:**
- Create: `components/service/ServiceHero.tsx`
- Create: `components/service/ServiceProcess.tsx`
- Create: `components/service/ServicePrix.tsx`
- Create: `components/service/ServiceFAQ.tsx`
- Create: `app/services/[slug]/page.tsx`

- [ ] Créer `components/service/ServiceHero.tsx` :
```tsx
import { CONFIG } from '@/lib/config';
import styles from './ServiceHero.module.css';

interface Props { titre: string; description: string; motCle: string; }

export default function ServiceHero({ titre, description, motCle }: Props) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.badge}>Expert {CONFIG.zone}</div>
        <h1 className={styles.h1}>{titre}</h1>
        <p className={styles.desc}>{description}</p>
        <div className={styles.ctas}>
          <a href={`tel:${CONFIG.tel}`} className="btn-primary">📞 Devis gratuit</a>
          <span className={styles.urgence}>Disponible 24h/7j</span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] Créer `components/service/ServiceProcess.tsx` :
```tsx
import styles from './ServiceProcess.module.css';
interface Props { process: { etape: string; detail: string }[]; }

export default function ServiceProcess({ process }: Props) {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.titre}>Notre méthode d'intervention</h2>
        <div className={styles.steps}>
          {process.map((step, i) => (
            <div key={i} className={styles.step}>
              <div className={styles.num}>{i + 1}</div>
              <div>
                <strong>{step.etape}</strong>
                <p>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] Créer `components/service/ServicePrix.tsx` :
```tsx
import styles from './ServicePrix.module.css';
interface PrixItem { label: string; min: number; max: number; unite: string; }
interface Props { prix: PrixItem[]; }

export default function ServicePrix({ prix }: Props) {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.titre}>Fourchettes de prix</h2>
        <p className={styles.note}>Prix indicatifs — devis gratuit avant intervention</p>
        <div className={styles.grid}>
          {prix.map((p, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.label}>{p.label}</div>
              {p.min > 0 ? (
                <div className={styles.price}>
                  {p.min}€ – {p.max}€
                  <span className={styles.unite}>{p.unite !== '€' ? p.unite : ''}</span>
                </div>
              ) : (
                <div className={styles.price}>{p.unite}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] Créer `components/service/ServiceFAQ.tsx` :
```tsx
'use client';
import { useState } from 'react';
import styles from './ServiceFAQ.module.css';
interface Props { faq: { question: string; reponse: string }[]; }

export default function ServiceFAQ({ faq }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.titre}>Questions fréquentes</h2>
        <div className={styles.list}>
          {faq.map((item, i) => (
            <div key={i} className={styles.item}>
              <button className={styles.question} onClick={() => setOpen(open === i ? null : i)}>
                {item.question}
                <span>{open === i ? '−' : '+'}</span>
              </button>
              {open === i && <div className={styles.reponse}>{item.reponse}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] Créer `app/services/[slug]/page.tsx` :
```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllServices, getServiceBySlug } from '@/lib/data/services';
import ServiceHero from '@/components/service/ServiceHero';
import ServiceProcess from '@/components/service/ServiceProcess';
import ServicePrix from '@/components/service/ServicePrix';
import ServiceFAQ from '@/components/service/ServiceFAQ';
import { CONFIG } from '@/lib/config';

interface Props { params: Promise<{ slug: string }>; }

export function generateStaticParams() {
  return getAllServices().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.titre,
    description: service.description,
    alternates: { canonical: `${CONFIG.siteUrl}/services/${slug}/` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faq.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.reponse },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.titre,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: CONFIG.siteName,
      telephone: CONFIG.tel,
      areaServed: { '@type': 'AdministrativeArea', name: 'Var', identifier: '83' },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <ServiceHero titre={service.h1} description={service.description} motCle={service.motCle} />
      <ServiceProcess process={service.process} />
      <ServicePrix prix={service.prix} />
      <ServiceFAQ faq={service.faq} />
    </>
  );
}
```

- [ ] Commit :
```bash
git add -A && git commit -m "feat: pages services avec Hero, Process, Prix, FAQ"
```

---

## Sprint 3 — Pages Problèmes + Prix + Homepage

### Task 6 : Pages problèmes

**Files:**
- Create: `app/problemes/[slug]/page.tsx`

- [ ] Créer `app/problemes/[slug]/page.tsx` :
```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllProblemes, getProblemeBySlug } from '@/lib/data/problemes';
import { CONFIG } from '@/lib/config';
import styles from './page.module.css';

interface Props { params: Promise<{ slug: string }>; }

export function generateStaticParams() {
  return getAllProblemes().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProblemeBySlug(slug);
  if (!p) return {};
  return {
    title: p.titre,
    description: p.description,
    alternates: { canonical: `${CONFIG.siteUrl}/problemes/${slug}/` },
  };
}

export default async function ProblemePage({ params }: Props) {
  const { slug } = await params;
  const p = getProblemeBySlug(slug);
  if (!p) notFound();

  return (
    <div className="container" style={{ padding: '40px 16px' }}>
      <h1>{p.titre}</h1>
      <p style={{ margin: '16px 0 32px', color: 'var(--text-light)' }}>{p.description}</p>
      <h2>Causes fréquentes</h2>
      <ul style={{ margin: '16px 0 32px 24px' }}>
        {p.causes.map((c, i) => <li key={i}>{c}</li>)}
      </ul>
      <h2>Solutions</h2>
      <ul style={{ margin: '16px 0 32px 24px' }}>
        {p.solutions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
      <h2>FAQ</h2>
      {p.faq.map((f, i) => (
        <div key={i} style={{ margin: '16px 0' }}>
          <strong>{f.question}</strong>
          <p style={{ marginTop: '8px' }}>{f.reponse}</p>
        </div>
      ))}
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <a href={`tel:${CONFIG.tel}`} className="btn-primary">📞 Appeler — {CONFIG.telDisplay}</a>
      </div>
    </div>
  );
}
```

---

### Task 7 : Pages prix

**Files:**
- Create: `app/prix/[slug]/page.tsx`

- [ ] Créer `app/prix/[slug]/page.tsx` :
```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPrix, getPrixBySlug } from '@/lib/data/prix';
import { CONFIG } from '@/lib/config';

interface Props { params: Promise<{ slug: string }>; }

export function generateStaticParams() {
  return getAllPrix().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getPrixBySlug(slug);
  if (!p) return {};
  return {
    title: p.titre,
    description: p.description,
    alternates: { canonical: `${CONFIG.siteUrl}/prix/${slug}/` },
  };
}

export default async function PrixPage({ params }: Props) {
  const { slug } = await params;
  const p = getPrixBySlug(slug);
  if (!p) notFound();

  return (
    <div className="container" style={{ padding: '40px 16px' }}>
      <h1>{p.titre}</h1>
      <p style={{ margin: '16px 0 32px', color: 'var(--text-light)' }}>{p.description}</p>
      {p.tableau.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
          <thead>
            <tr style={{ background: 'var(--bg-alt)' }}>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--border)' }}>Type de travaux</th>
              <th style={{ padding: '12px', textAlign: 'center', borderBottom: '2px solid var(--border)' }}>Fourchette</th>
              <th style={{ padding: '12px', textAlign: 'left', borderBottom: '2px solid var(--border)' }}>Détail</th>
            </tr>
          </thead>
          <tbody>
            {p.tableau.map((row, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '12px' }}>{row.type}</td>
                <td style={{ padding: '12px', textAlign: 'center', fontWeight: 700 }}>{row.min}€ – {row.max}€</td>
                <td style={{ padding: '12px', color: 'var(--text-light)' }}>{row.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '32px' }}>
        * Prix indicatifs TTC, hors cas particuliers. Devis gratuit avant toute intervention.
      </p>
      <div style={{ textAlign: 'center' }}>
        <a href={`tel:${CONFIG.tel}`} className="btn-primary">📞 Devis gratuit — {CONFIG.telDisplay}</a>
      </div>
    </div>
  );
}
```

- [ ] Commit :
```bash
git add -A && git commit -m "feat: pages problèmes et prix"
```

---

## Sprint 4 — Pages Géo-SEO (153 communes)

### Task 8 : Composants géo + page [ville]/reparation-canalisation

**Files:**
- Create: `components/geo/GeoHero.tsx`
- Create: `components/geo/GeoVillesProches.tsx`
- Create: `components/geo/GeoFAQ.tsx`
- Create: `app/[ville]/reparation-canalisation/page.tsx`

- [ ] Créer `components/geo/GeoHero.tsx` :
```tsx
import { CONFIG } from '@/lib/config';
import styles from './GeoHero.module.css';

interface Props { ville: string; codePostal: string; }

export default function GeoHero({ ville, codePostal }: Props) {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.badge}>Intervention {CONFIG.zone}</div>
        <h1 className={styles.h1}>
          Réparation Canalisation {ville} ({codePostal})<br />
          <span>— Expert Var</span>
        </h1>
        <p className={styles.desc}>
          Spécialiste réparation canalisation à {ville} depuis 19 ans.
          Chemisage, gainage, inspection caméra. Devis gratuit, intervention rapide.
        </p>
        <div className={styles.ctas}>
          <a href={`tel:${CONFIG.tel}`} className="btn-primary">📞 {CONFIG.telDisplay}</a>
          <span className={styles.urgence}>Disponible 24h/7j</span>
        </div>
      </div>
    </section>
  );
}
```

- [ ] Créer `components/geo/GeoVillesProches.tsx` :
```tsx
import Link from 'next/link';
import { Ville } from '@/lib/types';
import styles from './GeoVillesProches.module.css';

interface Props { villes: Ville[]; }

export default function GeoVillesProches({ villes }: Props) {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2>Communes Var voisines couvertes</h2>
        <div className={styles.grid}>
          {villes.map((v) => (
            <Link key={v.slug} href={`/${v.slug}/reparation-canalisation/`} className={styles.card}>
              {v.ville} ({v.code_postal})
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] Créer `app/[ville]/reparation-canalisation/page.tsx` :
```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllVilles, getVilleBySlug, getVillesProches } from '@/lib/data/villes';
import GeoHero from '@/components/geo/GeoHero';
import GeoVillesProches from '@/components/geo/GeoVillesProches';
import ServiceFAQ from '@/components/service/ServiceFAQ';
import ServicePrix from '@/components/service/ServicePrix';
import { CONFIG } from '@/lib/config';

interface Props { params: Promise<{ ville: string }>; }

export function generateStaticParams() {
  return getAllVilles().map((v) => ({ ville: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville: villeSlug } = await params;
  const ville = getVilleBySlug(villeSlug);
  if (!ville) return {};
  return {
    title: `Réparation Canalisation ${ville.ville} (${ville.code_postal}) — Expert Var`,
    description: `Réparation canalisation à ${ville.ville} dans le Var (83). Chemisage, gainage, inspection caméra. Devis gratuit, intervention 24h/7j.`,
    alternates: { canonical: `${CONFIG.siteUrl}/${villeSlug}/reparation-canalisation/` },
  };
}

const PRIX_GEO = [
  { label: 'Réparation ponctuelle', min: 150, max: 500, unite: '€' },
  { label: 'Chemisage (par mètre)', min: 80, max: 200, unite: '€/m' },
  { label: 'Inspection caméra', min: 100, max: 300, unite: '€' },
];

export default async function GeoPage({ params }: Props) {
  const { ville: villeSlug } = await params;
  const ville = getVilleBySlug(villeSlug);
  if (!ville) notFound();

  const villesProches = getVillesProches(villeSlug, 5);

  const faq = [
    {
      question: `Quel délai d'intervention à ${ville.ville} ?`,
      reponse: `Nos techniciens interviennent généralement en moins d'une heure à ${ville.ville}. En urgence, nous priorisons votre appel 24h/7j.`,
    },
    {
      question: `Réparez-vous sans tranchée à ${ville.ville} ?`,
      reponse: `Oui, nous utilisons le chemisage et le gainage sans tranchée dans la majorité des cas à ${ville.ville} et dans tout le Var.`,
    },
    {
      question: `Quel prix pour réparer une canalisation à ${ville.ville} ?`,
      reponse: `Le tarif dépend du type de réparation. Nous proposons un devis gratuit par téléphone avant toute intervention à ${ville.ville}.`,
    },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${CONFIG.siteName} — ${ville.ville}`,
    telephone: CONFIG.tel,
    areaServed: {
      '@type': 'City',
      name: ville.ville,
      containedInPlace: { '@type': 'AdministrativeArea', name: 'Var', identifier: '83' },
    },
    geo: { '@type': 'GeoCoordinates' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <GeoHero ville={ville.ville} codePostal={ville.code_postal} />
      <ServicePrix prix={PRIX_GEO} />
      <GeoVillesProches villes={villesProches} />
      <ServiceFAQ faq={faq} />
      <div className="container" style={{ padding: '32px 16px', textAlign: 'center' }}>
        <a href={`tel:${CONFIG.tel}`} className="btn-primary">
          📞 Appeler pour {ville.ville} — {CONFIG.telDisplay}
        </a>
      </div>
    </>
  );
}
```

- [ ] Commit :
```bash
git add -A && git commit -m "feat: 153 pages géo-SEO [ville]/reparation-canalisation"
```

---

## Sprint 5 — Blog AI + Cron

### Task 9 : Blog + Cron Vercel

**Files:**
- Create: `app/blog/[slug]/page.tsx`
- Create: `app/blog/page.tsx`
- Create: `app/api/cron/generate-article/route.ts`

- [ ] Créer `app/api/cron/generate-article/route.ts` :
```typescript
import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { supabaseAdmin } from '@/lib/db/supabase';

const SUJETS = [
  'Réparation canalisation dans le Var (83) : guide complet 2026',
  'Chemisage canalisation à Toulon : ce qu\'il faut savoir',
  'Prix réparation canalisation Var 2026 — fourchettes réelles',
  'Fuite canalisation enterrée dans le Var : que faire ?',
  'Canalisation en plomb dans le Var : obligations légales',
  'Remontée eaux usées dans le Var : urgence et solutions',
  'Inspection caméra canalisation Var : à partir de 100€',
  'Hydrocurage haute pression dans le Var',
  'Entretien préventif canalisations : conseils pour le Var',
  'Réparation sans tranchée dans le Var : chemisage CIPP',
];

function slugify(str: string): string {
  return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const sujet = SUJETS[Math.floor(Math.random() * SUJETS.length)];
  const slug = `${slugify(sujet)}-${new Date().getFullYear()}`;

  const { data: existing } = await supabaseAdmin.from('articles').select('id').eq('slug', slug).single();
  if (existing) return NextResponse.json({ message: 'Article already exists', slug });

  const client = new Anthropic();
  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 2000,
    messages: [{
      role: 'user',
      content: `Tu es expert réparation canalisation dans le Var (83).
Écris un article SEO de 800-1000 mots en français pour reparation-canalisation.fr.
Sujet : "${sujet}"
Format : Markdown. Structure : H1 → intro 150 mots → 3 H2 → fourchettes prix → FAQ 3 Q/R → CTA téléphone.
Zone : Var (83) UNIQUEMENT. Mentionner 3-4 communes du Var.
Prix : fourchettes uniquement, jamais montant fixe.
Retourne UNIQUEMENT le contenu Markdown, rien d'autre.`,
    }],
  });

  const contenu = (message.content[0] as { type: string; text: string }).text;
  const lignes = contenu.split('\n');
  const titre = lignes[0].replace(/^#\s*/, '').trim();
  const excerpt = lignes.find((l) => l.trim().length > 80 && !l.startsWith('#'))?.trim() || '';

  await supabaseAdmin.from('articles').insert({
    slug,
    titre,
    contenu,
    excerpt: excerpt.slice(0, 200),
    published: false,
    generated_by_ai: true,
  });

  return NextResponse.json({ success: true, slug, titre });
}
```

- [ ] Créer `app/blog/[slug]/page.tsx` :
```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { supabase } from '@/lib/db/supabase';
import { CONFIG } from '@/lib/config';

export const revalidate = 3600;

interface Props { params: Promise<{ slug: string }>; }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase.from('articles').select('titre, meta_title, meta_description').eq('slug', slug).single();
  if (!data) return {};
  return {
    title: data.meta_title || data.titre,
    description: data.meta_description,
    alternates: { canonical: `${CONFIG.siteUrl}/blog/${slug}/` },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const { data: article } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!article) notFound();

  return (
    <article className="container" style={{ padding: '40px 16px', maxWidth: '780px' }}>
      <h1 style={{ marginBottom: '24px' }}>{article.titre}</h1>
      <div dangerouslySetInnerHTML={{ __html: article.contenu.replace(/\n/g, '<br>') }} />
      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <a href={`tel:${CONFIG.tel}`} className="btn-primary">📞 {CONFIG.telDisplay}</a>
      </div>
    </article>
  );
}
```

- [ ] Créer `vercel.json` pour le cron :
```json
{
  "crons": [
    {
      "path": "/api/cron/generate-article",
      "schedule": "0 8 * * 1"
    }
  ]
}
```

- [ ] Commit :
```bash
git add -A && git commit -m "feat: blog AI + Vercel Cron lundi 8h"
```

---

## Sprint 6 — Sitemap + Homepage + next.config

### Task 10 : Sitemap + next.config + homepage

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/page.tsx`
- Create: `next.config.ts`

- [ ] Créer `app/sitemap.ts` :
```typescript
import { MetadataRoute } from 'next';
import { CONFIG } from '@/lib/config';
import { getAllVilles } from '@/lib/data/villes';
import { getAllServices } from '@/lib/data/services';
import { getAllProblemes } from '@/lib/data/problemes';
import { getAllPrix } from '@/lib/data/prix';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = CONFIG.siteUrl;
  const villes = getAllVilles();
  const services = getAllServices();
  const problemes = getAllProblemes();
  const prix = getAllPrix();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/urgence/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
  ];

  const serviceUrls = services.map((s) => ({
    url: `${base}/services/${s.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const problemeUrls = problemes.map((p) => ({
    url: `${base}/problemes/${p.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const prixUrls = prix.map((p) => ({
    url: `${base}/prix/${p.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const geoUrls = villes.map((v) => ({
    url: `${base}/${v.slug}/reparation-canalisation/`,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...serviceUrls, ...problemeUrls, ...prixUrls, ...geoUrls];
}
```

- [ ] Créer `next.config.ts` :
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
};

export default nextConfig;
```

- [ ] Commit final :
```bash
git add -A && git commit -m "feat: sitemap + homepage + next.config — projet complet prêt au déploiement"
```

---

## Variables d'environnement Vercel

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
CRON_SECRET=  (string aléatoire, ex: openssl rand -hex 32)
NEXT_PUBLIC_TEL=0627699134
NEXT_PUBLIC_TEL_DISPLAY=06 27 69 91 34
NEXT_PUBLIC_SITE_URL=https://reparation-canalisation.fr
```

## SQL Supabase

```sql
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  titre TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  contenu TEXT NOT NULL,
  excerpt TEXT,
  categorie TEXT,
  mots_cles TEXT[],
  ville_ciblee TEXT,
  published BOOLEAN DEFAULT false,
  generated_by_ai BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  published_at TIMESTAMPTZ
);
```

## Vérification finale

```bash
npm run build   # Zéro erreur TypeScript
# Tester : /services/reparation-canalisation/
# Tester : /toulon/reparation-canalisation/
# Tester : /blog/ (après cron ou insertion manuelle)
# Tester : /sitemap.xml
git push origin main  # → déploiement Vercel automatique
```
