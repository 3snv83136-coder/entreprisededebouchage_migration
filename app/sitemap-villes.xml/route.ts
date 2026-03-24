import { BASE_URL } from '@/lib/config';
import { getAllVilles } from '@/lib/data/villes';

export const revalidate = 86400;

export async function GET() {
  const villes = getAllVilles();

  const urls = villes.map((v) => `  <url>
    <loc>${BASE_URL}/debouchage-${v.slug}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${v.tier === 1 ? '0.9' : '0.7'}</priority>
  </url>`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
