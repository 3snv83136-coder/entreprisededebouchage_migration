import { Ville, FaqItem, Service } from '@/lib/types';
import { PHONE, COMPANY_NAME, BASE_URL } from '@/lib/config';

const ORG_ID = `${BASE_URL}/#organization`;

const SERVICE_PRICES: Record<string, string> = {
  'debouchage-canalisation': '199',
  'debouchage-wc-toilettes': '99',
  'debouchage-evier-lavabo': '99',
  'debouchage-douche-baignoire': '99',
  'debouchage-egouts-regards': '199',
  'debouchage-cuisine': '99',
  'debouchage-fosse-septique': '199',
  'debouchage-salle-de-bain': '99',
  'debouchage-lave-vaisselle': '99',
  'debouchage-lave-linge': '99',
  'debouchage-ballon-deau-chaude-chauffe-eau': '110',
};

export function generateSchemaOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': ORG_ID,
    name: COMPANY_NAME,
    url: BASE_URL,
    telephone: PHONE,
    priceRange: '99€ - 350€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toulon',
      postalCode: '83000',
      addressRegion: 'Var',
      addressCountry: 'FR',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Var (83)',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '489',
      bestRating: '5',
    },
  };
}

export function generateSchemaCity(ville: Ville) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${BASE_URL}/debouchage-${ville.slug}/#plumber`,
    name: `${COMPANY_NAME} — ${ville.ville}`,
    description: `Service de debouchage à ${ville.ville} disponible 24h/7j`,
    parentOrganization: { '@id': ORG_ID },
    areaServed: {
      '@type': 'City',
      name: ville.ville,
      postalCode: ville.code_postal,
    },
    telephone: PHONE,
    priceRange: '99€ - 350€',
    openingHours: 'Mo-Su 00:00-23:59',
    url: `${BASE_URL}/debouchage-${ville.slug}/`,
  };
}

export function generateSchemaService(service: Service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.label,
    description: service.description,
    url: `${BASE_URL}/${service.slug}/`,
    serviceType: service.label,
    provider: {
      '@type': 'Plumber',
      '@id': ORG_ID,
      name: COMPANY_NAME,
      telephone: PHONE,
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Var',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: SERVICE_PRICES[service.slug] ?? '99',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'EUR',
        price: SERVICE_PRICES[service.slug] ?? '99',
        unitText: 'intervention',
      },
    },
  };
}

export function generateSchemaServiceCity(service: Service, ville: Ville) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.label} à ${ville.ville}`,
    description: `${service.label} à ${ville.ville} (${ville.code_postal}). Intervention rapide 24h/7j.`,
    url: `${BASE_URL}/debouchage-${service.slug.replace('debouchage-', '')}-${ville.slug}/`,
    serviceType: service.label,
    provider: {
      '@type': 'Plumber',
      '@id': ORG_ID,
      name: COMPANY_NAME,
      telephone: PHONE,
    },
    areaServed: {
      '@type': 'City',
      name: ville.ville,
      postalCode: ville.code_postal,
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      price: SERVICE_PRICES[service.slug] ?? '99',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'EUR',
        price: SERVICE_PRICES[service.slug] ?? '99',
        unitText: 'intervention',
      },
    },
  };
}

export function generateSchemaHowTo(
  name: string,
  steps: { name: string; text: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    step: steps.map((s, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function generateSchemaFAQ(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateSchemaBreadcrumbs(
  items: { name: string; href: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };
}
