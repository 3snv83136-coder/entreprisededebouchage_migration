import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import GeoEvierVarPage from '@/components/geo-evier/GeoEvierVarPage';
import { getAllGeoEvierVarSlugs, getGeoEvierVarPage } from '@/lib/data/geo-evier-var';
import { getVilleBySlug } from '@/lib/data/villes';
import { BASE_URL, COMPANY_NAME } from '@/lib/config';
import { generateSchemaBreadcrumbs, generateSchemaFAQ } from '@/lib/seo/schema';

export async function generateStaticParams() {
  return getAllGeoEvierVarSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getGeoEvierVarPage(slug);
  if (!page) return {};

  const title = page.metaTitle;
  const description = page.metaDescription;
  const canonical = `${BASE_URL}/debouchage-evier-var/${slug}/`;
  const place =
    page.villeSlug && getVilleBySlug(page.villeSlug)
      ? getVilleBySlug(page.villeSlug)!.ville
      : 'Toulon';

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: COMPANY_NAME,
      locale: 'fr_FR',
      type: 'website',
    },
    other: {
      'geo.region': 'FR-PAC',
      'geo.placename': place,
    },
  };
}

export default async function DebouchageEvierVarSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getGeoEvierVarPage(slug);
  if (!page) notFound();

  const faqSchema = generateSchemaFAQ(page.faqs);
  const breadcrumbs = [
    { name: 'Accueil', href: '/' },
    { name: 'Debouchage évier & lavabo', href: '/debouchage-evier-lavabo/' },
    { name: page.breadcrumbLabel, href: `/debouchage-evier-var/${slug}/` },
  ];
  const breadcrumbSchema = generateSchemaBreadcrumbs(breadcrumbs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Breadcrumbs items={breadcrumbs} />
      <GeoEvierVarPage page={page} />
    </>
  );
}
