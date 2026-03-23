import Link from 'next/link';
import { COMPANY_NAME, PHONE, PHONE_RAW } from '@/lib/config';
import { getAllVilles } from '@/lib/data/villes';
import { getAllServices } from '@/lib/data/services';
import FooterVilleSearch from './FooterVilleSearch';
import styles from './Footer.module.css';

export default function Footer() {
  const villes = getAllVilles().map((v) => ({
    ville: v.ville,
    slug: v.slug,
    code_postal: v.code_postal,
    population: v.population,
  }));
  const services = getAllServices().slice(0, 6);
  const topVilles = villes.filter((v) => v.population >= 30000).slice(0, 6);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Col 1 — Marque */}
        <div className={styles.col}>
          <div className={styles.brand}>Débouchage<span>Pro</span></div>
          <p className={styles.desc}>
            Entreprise de débouchage dans le Var depuis 19 ans. Intervention rapide 24h/7j sur les 153 communes du département.
          </p>
          <a href={`tel:${PHONE_RAW}`} className={styles.phone}>
            📞 {PHONE}
          </a>
        </div>

        {/* Col 2 — Services */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Services</h3>
          <ul className={styles.links}>
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}/`}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 — Villes principales */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Villes principales</h3>
          <ul className={styles.links}>
            {topVilles.map((v) => (
              <li key={v.slug}>
                <Link href={`/debouchage-${v.slug}/`}>{v.ville}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 — Recherche ville */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Trouvez votre ville</h3>
          <FooterVilleSearch villes={villes} />
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} {COMPANY_NAME} — Var (83) ·{' '}
          <Link href="/">entreprisededebouchage.com</Link> ·{' '}
          <Link href="/mentions-legales/">Mentions légales</Link>
        </p>
      </div>
    </footer>
  );
}
