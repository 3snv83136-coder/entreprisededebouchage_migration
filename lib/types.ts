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
