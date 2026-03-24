import { BASE_URL } from '@/lib/config';
import { getAllVilles, getTier1Villes } from '@/lib/data/villes';
import { getAllServices } from '@/lib/data/services';
import { getAllGeoEvierVarSlugs } from '@/lib/data/geo-evier-var';

export const revalidate = 86400;

function url(loc: string, priority: string, changefreq = 'monthly', lastmod?: string): string {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod || new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

export async function GET() {
  const villes = getAllVilles();
  const services = getAllServices();
  const tier1 = getTier1Villes();
  const geoSlugs = getAllGeoEvierVarSlugs();

  const staticUrls = [
    url(`${BASE_URL}/`, '1.0', 'weekly'),
    url(`${BASE_URL}/nos-prestations/`, '0.8', 'monthly'),
    url(`${BASE_URL}/nos-tarifs/`, '0.8', 'monthly'),
    url(`${BASE_URL}/zones-dintervention/`, '0.8', 'monthly'),
    url(`${BASE_URL}/realisations/`, '0.8', 'weekly'),
  ];

  const serviceUrls = services.map((s) =>
    url(`${BASE_URL}/${s.slug}/`, '0.8')
  );

  const serviceCityUrls = tier1.flatMap((v) =>
    services.map((s) =>
      url(`${BASE_URL}/debouchage-${s.slug.replace('debouchage-', '')}-${v.slug}/`, '0.8')
    )
  );

  const geoUrls = geoSlugs.map((slug) =>
    url(`${BASE_URL}/debouchage-evier-var/${slug}/`, '0.72')
  );

  const villeUrls = villes.map((v) =>
    url(`${BASE_URL}/debouchage-${v.slug}/`, v.tier === 1 ? '0.9' : '0.7')
  );

  const allUrls = [...staticUrls, ...serviceUrls, ...serviceCityUrls, ...geoUrls, ...villeUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
