import Link from 'next/link';
import { GEO_EVIER_VAR_PAGES } from '@/lib/data/geo-evier-var';
import styles from '@/components/page-service/ServicePageContent.module.css';

export default function GeoEvierVarClusterLinks() {
  const subset = GEO_EVIER_VAR_PAGES.slice(0, 10);

  return (
    <section className={styles.section} style={{ background: 'var(--navy-mid)' }}>
      <div className="container">
        <div className="section-label">Toulon &amp; agglomération</div>
        <h2 className="section-title">Recherches fréquentes — debouchage évier</h2>
        <p className="section-desc" style={{ marginBottom: '20px' }}>
          Pages locales et intentions de recherche (urgence, siphon, communes autour de Toulon) :
        </p>
        <ul className={styles.textBlock} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {subset.map((p) => (
            <li key={p.slug} style={{ marginBottom: 10 }}>
              <Link href={`/debouchage-evier-var/${p.slug}/`} style={{ color: 'var(--orange-light)', fontWeight: 600 }}>
                {p.breadcrumbLabel}
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.textBlock} style={{ marginTop: 16 }}>
          <Link href="/debouchage-evier-var/toulon-urgence/" style={{ color: 'var(--orange)' }}>
            → Parcourir le cluster (20 pages)
          </Link>
          {' · '}
          <Link href="/zones-dintervention/" style={{ color: 'var(--slate)' }}>
            Zones d&apos;intervention
          </Link>
        </p>
      </div>
    </section>
  );
}
