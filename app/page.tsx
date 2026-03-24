import Link from 'next/link';
import { getAllVilles } from '@/lib/data/villes';
import { getAllServices } from '@/lib/data/services';
import VilleSearch from '@/components/common/VilleSearch';
import VilleSearchInline from '@/components/common/VilleSearchInline';
import styles from './page.module.css';

export default function Home() {
  const villes = getAllVilles();
  const services = getAllServices();

  // Serialize for client component
  const villesData = villes.map((v) => ({
    ville: v.ville,
    slug: v.slug,
    code_postal: v.code_postal,
    population: v.population,
  }));

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            Disponible maintenant — Var (83)
          </div>
          <h1 className={styles.title}>
            Debouchage<br />
            <em>dans le Var</em>
            24h/7j
          </h1>
          <p className={styles.sub}>
            Entreprise de debouchage depuis 19 ans. Intervention en moins d&apos;une
            heure à Toulon et dans tout le Var. Devis gratuit, prix fixe.
          </p>

          <a href="tel:0627699134" className="btn-primary">
            📞 Urgence
          </a>

          {/* Tarifs */}
          <div className={styles.pricing}>
            <div className={styles.pricingCard}>
              <h3 className={styles.pricingTitle}>Debouchage Manuel</h3>
              <p className={styles.pricingDesc}>Évier, WC, Douche</p>
              <div className={styles.pricingPrice}>99<span>€</span></div>
            </div>
            <div className={`${styles.pricingCard} ${styles.pricingCardPopular}`}>
              <div className={styles.pricingBadge}>Le + demandé</div>
              <h3 className={styles.pricingTitle}>Haute Pression</h3>
              <p className={styles.pricingDesc}>Hydrocurage technique</p>
              <div className={styles.pricingPrice}>199<span>€</span></div>
            </div>
            <div className={styles.pricingCard}>
              <h3 className={styles.pricingTitle}>Inspection Caméra</h3>
              <p className={styles.pricingDesc}>Diagnostic vidéo complet</p>
              <div className={styles.pricingPrice}>110<span>€</span></div>
            </div>
          </div>
          <p className={styles.pricingNote}>Déplacement inclus &amp; Devis gratuit</p>

          <div className={styles.searchSection}>
            <p className={styles.searchLabel}>Trouvez votre ville</p>
            <VilleSearch villes={villesData} />
          </div>

          <div className={styles.stats}>
            <div><strong>4.9/5</strong><span>489 avis</span></div>
            <div><strong>19 ans</strong><span>d&apos;expérience</span></div>
            <div><strong>&lt;1h</strong><span>d&apos;intervention</span></div>
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ background: 'var(--navy-mid)' }}>
        <div className="container">
          <div className="section-label">Nos prestations</div>
          <h2 className="section-title">Services</h2>
          <div className={styles.serviceGrid}>
            {services.map((s, i) => (
              <Link
                key={s.slug}
                href={`/${s.slug}/`}
                className={styles.serviceCard}
                style={{ '--card-index': i } as React.CSSProperties}
              >
                <div>
                  <strong>{s.label}</strong>
                  <p className={styles.serviceDesc}>{s.description.slice(0, 80)}…</p>
                </div>
                <span className={styles.serviceArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.realisationsStrip}>
        <div className="container">
          <Link href="/realisations/" className={styles.realisationsLink}>
            <span>Interventions récentes dans le Var</span>
            <span className={styles.realisationsArrow}>Voir nos réalisations →</span>
          </Link>
        </div>
      </div>

      <section className={styles.section}>
        <div className="container">
          <div className="section-label">153 communes couvertes</div>
          <h2 className="section-title">Toutes les villes du Var</h2>
          <p className="section-desc" style={{ marginBottom: '24px' }}>
            On intervient dans les 153 communes du département. Trouvez la vôtre :
          </p>
          <VilleSearchInline
            villes={villesData}
            placeholder="Rechercher parmi 153 communes..."
            topCount={6}
          />
        </div>
      </section>
    </>
  );
}
