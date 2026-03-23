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
