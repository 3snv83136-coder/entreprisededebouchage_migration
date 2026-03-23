import fs from 'fs';
import path from 'path';
import { PageData, FaqItem } from '@/lib/types';

const contentCache: Map<string, PageData> = new Map();

export function getPageContent(slug: string): PageData | null {
  if (contentCache.has(slug)) return contentCache.get(slug)!;

  const filePath = path.join(process.cwd(), 'data', 'generated', `${slug}.json`);

  if (!fs.existsSync(filePath)) return null;

  const raw = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  // Support both old (Yoast) and new format
  const faqs = raw.faq?.length
    ? raw.faq
    : extractFaqs(raw.content || '');

  const meta = raw.meta || {};

  const pageData: PageData = {
    title: raw.title,
    slug: raw.slug,
    content: raw.content,
    meta: {
      title: meta.title || meta._yoast_wpseo_title || raw.title,
      description: meta.description || meta._yoast_wpseo_metadesc || '',
      focusKeyword: meta.focus_keyword || meta._yoast_wpseo_focuskw || '',
      canonical: `/${raw.slug}/`,
    },
    faqs,
  };

  contentCache.set(slug, pageData);
  return pageData;
}

export function getAllPageSlugs(): string[] {
  const dir = path.join(process.cwd(), 'data', 'generated');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => f.replace('.json', ''));
}

function extractFaqs(html: string): FaqItem[] {
  const faqs: FaqItem[] = [];
  const regex = /<p><strong>(.*?)<\/strong><br\s*\/?>\s*([\s\S]*?)<\/p>/g;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim();
    const answer = match[2].replace(/<[^>]+>/g, '').trim();
    if (question.includes('?')) {
      faqs.push({ question, answer });
    }
  }
  return faqs;
}
