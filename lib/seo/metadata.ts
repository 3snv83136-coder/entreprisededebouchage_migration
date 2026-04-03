import { Metadata } from 'next';
import { Ville, Service } from '@/lib/types';
import { BASE_URL, COMPANY_NAME } from '@/lib/config';

export function generateMetadataForCity(ville: Ville): Metadata {
  const title = `Debouchage ${ville.ville} ${ville.code_postal} — Urgence 24h/7j`;
  const description = `Debouchage à ${ville.ville} (${ville.code_postal}) : intervention rapide 24h/7j pour canalisations, WC et évier bouchés. Technicien qualifié dans les ${ville.departement}, devis gratuit.`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/debouchage-${ville.slug}/` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/debouchage-${ville.slug}/`,
      siteName: COMPANY_NAME,
      locale: 'fr_FR',
      type: 'website',
    },
    other: {
      'geo.region': 'FR-13',
      'geo.placename': `${ville.ville}, Bouches-du-Rhône, Provence-Alpes-Côte d'Azur, France`,
    },
  };
}

export function generateMetadataForService(service: Service): Metadata {
  const title = `${service.label} dans les Bouches-du-Rhône — Intervention rapide`;
  const description = `${service.label} dans les Bouches-du-Rhône. Technicien qualifié, intervention rapide 24h/7j. Devis gratuit et sans engagement.`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/${service.slug}/` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/${service.slug}/`,
      siteName: COMPANY_NAME,
      locale: 'fr_FR',
      type: 'website',
    },
  };
}

export function generateMetadataForServiceCity(service: Service, ville: Ville): Metadata {
  const title = `${service.label} ${ville.ville} ${ville.code_postal} — Intervention rapide`;
  const description = `${service.label} à ${ville.ville} (${ville.code_postal}). Technicien qualifié, intervention rapide 24h/7j dans les ${ville.departement}. Devis gratuit.`;
  const slug = `${service.slug}-${ville.slug}`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/debouchage-${slug.replace('debouchage-', '')}/` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/debouchage-${slug.replace('debouchage-', '')}/`,
      siteName: COMPANY_NAME,
      locale: 'fr_FR',
      type: 'website',
    },
    other: {
      'geo.region': 'FR-13',
      'geo.placename': `${ville.ville}, Bouches-du-Rhône, Provence-Alpes-Côte d'Azur, France`,
    },
  };
}

export function generateMetadataForPage(pageType: string): Metadata {
  const meta: Record<string, { title: string; description: string }> = {
    home: {
      title: `${COMPANY_NAME} — Debouchage dans les Bouches-du-Rhône 24h/7j`,
      description: `${COMPANY_NAME} : debouchage canalisations, WC, évier à Aubagne et dans les Bouches-du-Rhône. Intervention rapide 24h/7j, devis gratuit. Depuis 19 ans.`,
    },
    tarifs: {
      title: 'Nos tarifs — Debouchage dans les Bouches-du-Rhône',
      description: 'Tarifs transparents pour tous nos services de debouchage dans les Bouches-du-Rhône. Devis gratuit, prix fixe annoncé avant intervention.',
    },
    prestations: {
      title: 'Nos prestations — Debouchage dans les Bouches-du-Rhône',
      description: 'Découvrez nos prestations de debouchage : canalisations, WC, évier, douche, égout, fosse septique. Intervention 24h/7j dans les Bouches-du-Rhône.',
    },
  };

  const m = meta[pageType] || meta.home;
  return {
    title: m.title,
    description: m.description,
    openGraph: {
      title: m.title,
      description: m.description,
      siteName: COMPANY_NAME,
      locale: 'fr_FR',
      type: 'website',
    },
  };
}
