export interface Ville {
  ville: string;
  departement: string;
  code_postal: string;
  population: number;
  slug: string;
  tier: 1 | 2;
}

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

export interface Service {
  slug: string;
  label: string;
  description: string;
  icon: string;
  problems: string[];
  intervention: string;
  priceRange: string;
}

export interface PageData {
  title: string;
  slug: string;
  content: string;
  meta: SEOMetadata;
  faqs: FaqItem[];
}

export interface SEOMetadata {
  title: string;
  description: string;
  focusKeyword: string;
  canonical: string;
  ogImage?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface InternalLink {
  href: string;
  label: string;
  type: 'city' | 'service' | 'technique' | 'general';
}

export interface Realisation {
  id?: string;
  slug: string;
  type: string;
  service_slug: string;
  ville: string;
  ville_slug: string;
  mois: string;
  annee: string;
  contexte?: string;
  diagnostic?: string;
  intervention: string;
  resultat: string;
  contexte_enrichi?: string;
  diagnostic_enrichi?: string;
  intervention_enrichie?: string;
  temoignage?: string;
  duree?: string;
  meta_title?: string;
  meta_description?: string;
  created_at?: string;
  photo_avant_url?: string;
  photo_apres_url?: string;
  faq?: Array<{ question: string; reponse: string }>;
  json_ld?: object;
  publiee?: boolean;
  email_envoye?: boolean;
  code_postal?: string;
  materiels?: string;
  titre?: string;
  description_generee?: string;
  intervenant?: string;
}
