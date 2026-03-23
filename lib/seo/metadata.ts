import { Metadata } from 'next';
import { Ville, Service } from '@/lib/types';
import { BASE_URL, COMPANY_NAME } from '@/lib/config';

export function generateMetadataForCity(ville: Ville): Metadata {
  const title = `Débouchage ${ville.ville} ${ville.code_postal} — Urgence 24h/7j`;
  const description = `Débouchage à ${ville.ville} (${ville.code_postal}) : intervention rapide 24h/7j pour canalisations, WC et évier bouchés. Technicien qualifié dans le ${ville.departement}, devis gratuit.`;

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
  };
}

export function generateMetadataForService(service: Service): Metadata {
  const title = `${service.label} dans le Var — Intervention rapide`;
  const description = `${service.label} dans le Var. Technicien qualifié, intervention rapide 24h/7j. Devis gratuit et sans engagement.`;

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
  const description = `${service.label} à ${ville.ville} (${ville.code_postal}). Technicien qualifié, intervention rapide 24h/7j dans le ${ville.departement}. Devis gratuit.`;
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
  };
}

export function generateMetadataForPage(pageType: string): Metadata {
  const meta: Record<string, { title: string; description: string }> = {
    home: {
      title: `${COMPANY_NAME} — Débouchage dans le Var 24h/7j`,
      description: `${COMPANY_NAME} : débouchage canalisations, WC, évier à Toulon et dans le Var. Intervention rapide 24h/7j, devis gratuit. Depuis 19 ans.`,
    },
    tarifs: {
      title: 'Nos tarifs — Débouchage dans le Var',
      description: 'Tarifs transparents pour tous nos services de débouchage dans le Var. Devis gratuit, prix fixe annoncé avant intervention.',
    },
    prestations: {
      title: 'Nos prestations — Débouchage dans le Var',
      description: 'Découvrez nos prestations de débouchage : canalisations, WC, évier, douche, égout, fosse septique. Intervention 24h/7j dans le Var.',
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
