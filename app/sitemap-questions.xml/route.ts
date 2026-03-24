import { getIndexedQuestions } from '@/lib/data/questions';
import { BASE_URL } from '@/lib/config';

export async function GET() {
  const questions = getIndexedQuestions();
  const urls = questions
    .map(
      (q) =>
        `  <url><loc>${BASE_URL}/questions/${q.slug}/</loc><changefreq>monthly</changefreq><priority>0.6</priority></url>`
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
