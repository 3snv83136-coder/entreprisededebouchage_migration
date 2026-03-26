import Link from 'next/link';
import { Ville } from '@/lib/types';
import { getNearbyVilles } from '@/lib/data/villes';
import styles from './ZoneCoverte.module.css';

interface Props {
  ville: Ville;
}

export default function ZoneCoverte({ ville }: Props) {
  const nearby = getNearbyVilles(ville.slug, 8);

  return (
    <section className={styles.zone} id="zone">
      <div className="container">
        <div className={styles.layout}>
          <div>
            <div className="section-label">Zone couverte</div>
            <h2 className="section-title">
              {ville.ville} &amp;<br />alentours
            </h2>
            <p className="section-desc">
              Nous intervenons sur l&apos;ensemble de {ville.ville} et les communes
              du secteur rapidement.
            </p>
            <div className={styles.tags}>
              <span className={`${styles.tag} ${styles.active}`}>
                {ville.ville} {ville.code_postal}
              </span>
              {nearby.map((v) => (
                <Link
                  key={v.slug}
                  href={`/debouchage-${v.slug}/`}
                  className={styles.tag}
                >
                  {v.ville}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.visual}>
            <div className={styles.mapPlaceholder}>
              <span className={styles.mapIcon}>🗺️</span>
              <p>
                Zone d&apos;intervention<br />
                <strong>{ville.ville} &amp; Var</strong>
              </p>
            </div>
            <div className={styles.pulse} />
          </div>
        </div>
      </div>
    </section>
  );
}
