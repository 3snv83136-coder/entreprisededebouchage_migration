import Link from 'next/link';
import { GEO_EVIER_13_PAGES } from '@/lib/data/geo-evier-13';
import styles from '@/components/page-service/ServicePageContent.module.css';

export default function GeoEvierVarClusterLinks() {
  const subset = GEO_EVIER_13_PAGES.slice(0, 10);

  return (
    <section className={styles.section} style={{ background: 'var(--navy-mid)' }}>
      <div className="container">
        <div className="section-label">Marseille &amp; agglomération</div>
        <h2 className="section-title">Recherches fréquentes — debouchage évier</h2>
        <p className="section-desc" style={{ marginBottom: '20px' }}>
          Pages locales et intentions de recherche (urgence, siphon, communes autour de Marseille) :
        </p>
        <ul className={styles.textBlock} style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {subset.map((p) => (
            <li key={p.slug} style={{ marginBottom: 10 }}>
              <Link href={`/debouchage-evier-13/${p.slug}/`} style={{ color: 'var(--orange-light)', fontWeight: 600 }}>
                {p.breadcrumbLabel}
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.textBlock} style={{ marginTop: 16 }}>
          <Link href="/debouchage-evier-13/marseille-urgence/" style={{ color: 'var(--orange)' }}>
            → Parcourir le cluster (19 pages)
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
