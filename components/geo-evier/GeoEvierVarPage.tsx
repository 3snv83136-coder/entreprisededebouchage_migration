import Link from 'next/link';
import {
  GeoEvier13PageDef,
  getGeoEvier13Page,
  getRelatedGeoEvier13Slugs,
} from '@/lib/data/geo-evier-13';
import { getVilleBySlug } from '@/lib/data/villes';
import { getServiceBySlug } from '@/lib/data/services';
import { PHONE_RAW } from '@/lib/config';
import Faq from '@/components/page-ville/Faq';
import CtaFinal from '@/components/page-ville/CtaFinal';
import UrgenceBanner from '@/components/page-ville/UrgenceBanner';
import scStyles from '@/components/page-service-city/ServiceCityContent.module.css';

interface Props {
  page: GeoEvier13PageDef;
}

export default function GeoEvierVarPage({ page }: Props) {
  const ville = page.villeSlug ? getVilleBySlug(page.villeSlug) : null;
  const service = getServiceBySlug('debouchage-evier-lavabo');
  const related = getRelatedGeoEvier13Slugs(page.slug, 6);
  const villeName = ville?.ville ?? 'Marseille et agglomération';

  const pillarServiceCity =
    ville && ville.tier === 1
      ? `/debouchage-evier-lavabo-${ville.slug}/`
      : null;
  const villePage = ville ? `/debouchage-${ville.slug}/` : '/debouchage-marseille/';

  return (
    <>
      <section className={scStyles.hero}>
        <div className={scStyles.heroBg} />
        <div className={scStyles.heroInner}>
          <div className={scStyles.badge}>🍳 Debouchage évier &amp; lavabo — Bouches-du-Rhône</div>
          <h1 className={scStyles.title}>
            {page.h1}
          </h1>
          <p
            className={scStyles.sub}
            dangerouslySetInnerHTML={{ __html: page.intro }}
          />
          <a href={`tel:${PHONE_RAW}`} className="btn-primary">
            Appeler maintenant
          </a>
        </div>
      </section>

      {page.sections.map((s, i) => (
        <section
          key={s.title}
          className={scStyles.section}
          style={{ background: i % 2 === 0 ? 'var(--navy-mid)' : 'transparent' }}
        >
          <div className="container">
            <div className="section-label">À savoir</div>
            <h2 className="section-title">{s.title}</h2>
            <div className={scStyles.textBlock}>
              <p dangerouslySetInnerHTML={{ __html: s.body }} />
            </div>
          </div>
        </section>
      ))}

      <section className={scStyles.section}>
        <div className="container">
          <div className="section-label">Maillage utile</div>
          <h2 className="section-title">Pages liées (évier, Marseille &amp; Bouches-du-Rhône)</h2>
          <div className={scStyles.textBlock}>
            <p>
              {service && (
                <>
                  <Link href={`/${service.slug}/`}>Page prestation « {service.label} »</Link>
                  {' · '}
                </>
              )}
              <Link href="/debouchage-evier-lavabo-marseille/">Debouchage évier &amp; lavabo à Marseille</Link>
              {' · '}
              <Link href={villePage}>Debouchage à {villeName}</Link>
              {pillarServiceCity && (
                <>
                  {' · '}
                  <Link href={pillarServiceCity}>Évier &amp; lavabo — page locale détaillée</Link>
                </>
              )}
              {' · '}
              <Link href="/zones-dintervention/">Zones d&apos;intervention</Link>
            </p>
          </div>
          <div className={scStyles.villeTags}>
            {related.map((slug) => {
              const p = getGeoEvier13Page(slug);
              if (!p) return null;
              return (
                <Link key={slug} href={`/debouchage-evier-13/${slug}/`} className={scStyles.villeTag}>
                  {p.breadcrumbLabel}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <UrgenceBanner />
      <Faq faqs={page.faqs} ville={villeName} />
      <CtaFinal ville={villeName} />
    </>
  );
}
