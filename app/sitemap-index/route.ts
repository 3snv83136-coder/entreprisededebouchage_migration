import { BASE_URL } from '@/lib/config';

export const revalidate = 3600;

export async function GET() {
  const now = new Date().toISOString();
  const sitemaps = [
    `${BASE_URL}/sitemap-static.xml`,
    `${BASE_URL}/sitemap-villes.xml`,
    `${BASE_URL}/sitemap-realisations.xml`,
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map((loc) => `  <sitemap>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
