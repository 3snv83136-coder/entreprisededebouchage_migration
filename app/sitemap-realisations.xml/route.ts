import { BASE_URL } from '@/lib/config';
import { getAllRealisations } from '@/lib/data/realisations';

export const revalidate = 3600;

export async function GET() {
  const realisations = await getAllRealisations();

  const indexUrl = `  <url>
    <loc>${BASE_URL}/realisations/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;

  const urls = realisations.map((r) => {
    const lastmod = r.created_at
      ? new Date(r.created_at).toISOString().split('T')[0]
      : new Date().toISOString().split('T')[0];
    return `  <url>
    <loc>${BASE_URL}/realisations/${r.slug}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexUrl}
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}
