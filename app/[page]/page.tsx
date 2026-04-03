import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getAllVilles, getVilleBySlug, getTier1Villes } from '@/lib/data/villes';
import { getAllServices, getServiceBySlug } from '@/lib/data/services';
import { OLD_VAR_SLUGS } from '@/lib/data/var-redirects';
import { getPageContent } from '@/lib/data/content';
import { generateMetadataForCity, generateMetadataForServiceCity } from '@/lib/seo/metadata';
import { generateSchemaCity, generateSchemaFAQ, generateSchemaServiceCity } from '@/lib/seo/schema';
import { getBreadcrumbItems } from '@/lib/linking/internal';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Hero from '@/components/page-ville/Hero';
import Services from '@/components/page-ville/Services';
import UrgenceBanner from '@/components/page-ville/UrgenceBanner';
import ZoneCoverte from '@/components/page-ville/ZoneCoverte';
import Arguments from '@/components/page-ville/Arguments';
import Faq from '@/components/page-ville/Faq';
import CtaFinal from '@/components/page-ville/CtaFinal';
import Pricing from '@/components/page-ville/Pricing';
import GeneratedContent from '@/components/page-ville/GeneratedContent';
import ServiceCityContent from '@/components/page-service-city/ServiceCityContent';
import { FaqItem } from '@/lib/types';

interface PageProps {
  params: Promise<{ page: string }>;
}

function parsePageSlug(pageSlug: string): { type: 'city'; villeSlug: string } | { type: 'service-city'; serviceSlug: string; villeSlug: string } | null {
  if (!pageSlug || !pageSlug.startsWith('debouchage-')) return null;

  // Remove the "debouchage-" prefix
  const slug = pageSlug.replace('debouchage-', '');
  if (!slug) return null;

  const services = getAllServices();
  // Try service×city first — sort by prefix length desc to match longest first
  const sorted = [...services].sort((a, b) => b.slug.length - a.slug.length);
  for (const service of sorted) {
    const servicePrefix = service.slug.replace('debouchage-', '');
    if (slug.startsWith(servicePrefix + '-')) {
      const villeSlug = slug.slice(servicePrefix.length + 1);
      if (villeSlug) {
        const ville = getVilleBySlug(villeSlug);
        if (ville) {
          return { type: 'service-city', serviceSlug: service.slug, villeSlug };
        }
      }
    }
  }

  // Try city
  const ville = getVilleBySlug(slug);
  if (ville) {
    return { type: 'city', villeSlug: slug };
  }

  return null;
}

export async function generateStaticParams() {
  const villes = getAllVilles();
  const services = getAllServices();
  const tier1 = getTier1Villes();

  // City pages: /debouchage-toulon
  const cityParams = villes.map((v) => ({ page: `debouchage-${v.slug}` }));

  // Service×city pages: /debouchage-canalisation-toulon
  const serviceCityParams = tier1.flatMap((v) =>
    services.map((s) => ({
      page: `debouchage-${s.slug.replace('debouchage-', '')}-${v.slug}`,
    }))
  );

  return [...cityParams, ...serviceCityParams];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  const parsed = parsePageSlug(page);
  if (!parsed) return {};

  if (parsed.type === 'city') {
    const ville = getVilleBySlug(parsed.villeSlug)!;
    return generateMetadataForCity(ville);
  }

  const service = getServiceBySlug(parsed.serviceSlug)!;
  const ville = getVilleBySlug(parsed.villeSlug)!;
  return generateMetadataForServiceCity(service, ville);
}

function getDefaultFaqs(villeName: string): FaqItem[] {
  return [
    {
      question: `Quel est le délai d'intervention à ${villeName} ?`,
      answer: `Nos techniciens interviennent généralement rapidement sur ${villeName} et les quartiers proches. En cas d'urgence absolue, nous priorisons votre appel.`,
    },
    {
      question: `Le debouchage est-il garanti à ${villeName} ?`,
      answer: `Oui, chaque intervention est garantie. Si le bouchon n'est pas résolu, nous revenons sans frais supplémentaires.`,
    },
    {
      question: `Combien coûte un debouchage à ${villeName} ?`,
      answer: `Le tarif dépend du type d'intervention. Nous donnons un devis gratuit par téléphone et confirmons le prix avant de commencer. Aucun frais caché.`,
    },
  ];
}

// Abbreviated service slugs → canonical service slug
const SERVICE_ALIASES: Record<string, string> = {
  'wc': 'wc-toilettes',
  'evier': 'evier-lavabo',
  'douche': 'douche-baignoire',
  'fosse': 'fosse-septique',
  'egout': 'egouts-regards',
  'egouts': 'egouts-regards',
  'ballon': 'ballon-deau-chaude-chauffe-eau',
  'chauffe-eau': 'ballon-deau-chaude-chauffe-eau',
};

export default async function DynamicPage({ params }: PageProps) {
  const { page } = await params;
  const parsed = parsePageSlug(page);

  if (!parsed && page.startsWith('debouchage-')) {
    const slug = page.replace('debouchage-', '');

    // Try alias resolution: debouchage-wc-bandol → debouchage-wc-toilettes-bandol
    for (const [alias, canonical] of Object.entries(SERVICE_ALIASES)) {
      if (slug.startsWith(alias + '-')) {
        const villeSlug = slug.slice(alias.length + 1);
        const ville = getVilleBySlug(villeSlug);
        if (ville) {
          permanentRedirect(`/debouchage-${canonical}-${villeSlug}/`);
        }
      }
    }

    // Redirect old Var (83) city pages → homepage
    if (OLD_VAR_SLUGS.has(slug)) {
      permanentRedirect('/');
    }

    // Redirect old Var (83) service+city pages → service page
    const services = getAllServices();
    for (const service of services) {
      const servicePrefix = service.slug.replace('debouchage-', '');
      if (slug.startsWith(servicePrefix + '-')) {
        const citySlug = slug.slice(servicePrefix.length + 1);
        if (OLD_VAR_SLUGS.has(citySlug)) {
          permanentRedirect(`/${service.slug}/`);
        }
      }
    }
  }

  if (!parsed) notFound();

  if (parsed.type === 'service-city') {
    const service = getServiceBySlug(parsed.serviceSlug)!;
    const ville = getVilleBySlug(parsed.villeSlug)!;
    const content = getPageContent(`${parsed.serviceSlug}-${parsed.villeSlug}`);
    const faqs = content?.faqs?.length ? content.faqs : getDefaultFaqs(ville.ville);

    const serviceSchema = generateSchemaServiceCity(service, ville);
    const faqSchema = generateSchemaFAQ(faqs);
    const breadcrumbs = getBreadcrumbItems('service-city', service.label, page, {
      villeLabel: ville.ville,
      villeSlug: ville.slug,
      serviceLabel: service.label,
      serviceSlug: service.slug,
    });

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <Breadcrumbs items={breadcrumbs} />
        <ServiceCityContent service={service} ville={ville} content={content} faqs={faqs} />
      </>
    );
  }

  // City page
  const ville = getVilleBySlug(parsed.villeSlug)!;
  const content = getPageContent(`debouchage-${parsed.villeSlug}`);
  const faqs = content?.faqs?.length ? content.faqs : getDefaultFaqs(ville.ville);
  const breadcrumbs = getBreadcrumbItems('city', ville.ville, ville.slug);
  const citySchema = generateSchemaCity(ville);
  const faqSchema = generateSchemaFAQ(faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={breadcrumbs} />
      <Hero ville={ville} />
      <Pricing />
      {content?.content ? (
        <GeneratedContent html={content.content} />
      ) : (
        <>
          <Services ville={ville.ville} />
          <ZoneCoverte ville={ville} />
          <Arguments />
        </>
      )}
      <UrgenceBanner />
      <Faq faqs={faqs} ville={ville.ville} />
      <CtaFinal ville={ville.ville} />
    </>
  );
}
