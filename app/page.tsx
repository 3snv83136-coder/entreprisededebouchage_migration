import Link from 'next/link';
import Image from 'next/image';

import { getAllVilles } from '@/lib/data/villes';
import { getAllServices } from '@/lib/data/services';
import { getAllRealisations } from '@/lib/data/realisations';
import VilleSearch from '@/components/common/VilleSearch';
import VilleSearchInline from '@/components/common/VilleSearchInline';
import { PHONE_RAW } from '@/lib/config';
import styles from './page.module.css';

export const revalidate = 3600;

export default async function Home() {
  const villes = getAllVilles();
  const services = getAllServices();
  const realisations = await getAllRealisations();

  // Serialize for client component
  const villesData = villes.map((v) => ({
    ville: v.ville,
    slug: v.slug,
    code_postal: v.code_postal,
    population: v.population,
  }));

  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <Image
          src="/images/hero.jpg"
          alt="Technicien debouchage Var"
          fill
          className={styles.heroPhoto}
          priority
          sizes="100vw"
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroGrid}>
          {/* Left column — Text */}
          <div className={styles.heroText}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              Disponible immediatement — Var (83)
            </div>
            <h1 className={styles.title}>
              Debouchage express<br />
              <span className={styles.titleAccent}>dans le Var 24h/7j</span>
            </h1>
            <p className={styles.sub}>
              Intervention rapide. Prix fixe transparent
              et devis gratuit avant chaque intervention. Pas de mauvaise surprise.
            </p>

            <div className={styles.heroCtas}>
              <a href={`tel:${PHONE_RAW}`} className="btn-primary">
                Appeler maintenant
              </a>
              <a href={`tel:${PHONE_RAW}`} className={styles.btnSecondaryHero}>
                <span className={styles.desktopOnly}>Devis gratuit</span>
                <span className={styles.mobileOnly}>Prise en charge Assurance*</span>
              </a>
            </div>
          </div>

          {/* Right column — Bento Grid */}
          <div className={styles.bentoGrid}>
            <div className={`${styles.bentoCard} ${styles.bentoCentered}`}>
              <div className={styles.bentoBig}>3 prix fixes</div>
              <div className={styles.bentoLabel}>99&euro; &middot; 110&euro; &middot; 199&euro;</div>
            </div>
            <div className={`${styles.bentoCard} ${styles.bentoCardAccent} ${styles.bentoCentered}`}>
              <div className={styles.bentoSmTitle}>Prise en charge par</div>
              <div className={styles.bentoBig}>votre assurance</div>
            </div>
            <div className={`${styles.bentoCard} ${styles.bentoCardWide}`}>
              <div className={styles.bentoIcon}>&#9889;</div>
              <div>
                <div className={styles.bentoValue}>Intervention rapide</div>
                <div className={styles.bentoLabel}>Partout dans le Var, de jour comme de nuit</div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ PRICING — always in first third ═══ */}
        <div className={styles.pricingWrapper}>
          <div className={styles.pricing}>
            <div className={styles.pricingCard}>
              <h3 className={styles.pricingTitle}>Debouchage Manuel</h3>
              <p className={styles.pricingDesc}>Evier, WC, Douche</p>
              <div className={styles.pricingPrice}>99<span>&euro;</span></div>
            </div>
            <div className={`${styles.pricingCard} ${styles.pricingCardPopular}`}>
              <div className={styles.pricingBadge}>Le + demande</div>
              <h3 className={styles.pricingTitle}>Haute Pression</h3>
              <p className={styles.pricingDesc}>Hydrocurage technique</p>
              <div className={styles.pricingPrice}>199<span>&euro;</span></div>
            </div>
            <div className={styles.pricingCard}>
              <h3 className={styles.pricingTitle}>Inspection Camera</h3>
              <p className={styles.pricingDesc}>Diagnostic video complet</p>
              <div className={styles.pricingPrice}>110<span>&euro;</span></div>
            </div>
          </div>
          <p className={styles.pricingNote}>Deplacement inclus &amp; Devis gratuit</p>
        </div>

        {/* Search in hero */}
        <div className={styles.searchSection}>
          <p className={styles.searchLabel}>Trouvez votre ville</p>
          <VilleSearch villes={villesData} />
        </div>

        {/* Mobile stats */}
        <div className={styles.statsMobile}>
          <div><strong>4.9/5</strong><span>Avis Google</span></div>
          <div><strong>19 ans</strong><span>Experience</span></div>
          <div><strong>24h/7j</strong><span>Intervention rapide</span></div>
        </div>
        <div className={styles.assuranceBadge}>
          Prise en charge par votre assurance
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className={styles.section} style={{ background: 'var(--navy-mid)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Nos Solutions de <span className={styles.titleAccent}>Debouchage</span></h2>
              <p className="section-desc">Nous utilisons les dernieres technologies d&apos;hydrocurage et d&apos;inspection video pour garantir un resultat durable.</p>
            </div>
            <div className={styles.priceTag}>
              99&euro; &middot; 110&euro; &middot; 199&euro;
            </div>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}/`}
                className={styles.serviceCard}
              >
                <div className={styles.serviceCardInner}>
                  <strong>{s.label}</strong>
                  <p className={styles.serviceDesc}>{s.description.slice(0, 100)}...</p>
                </div>
                <span className={styles.serviceArrow}>&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REALISATIONS ═══ */}
      <section className={styles.section} style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div className="section-label">Interventions reelles</div>
            <h2 className={styles.sectionTitle}>Interventions Recentes</h2>
            <p className="section-desc" style={{ margin: '0 auto' }}>La preuve par l&apos;image de notre savoir-faire technique quotidien.</p>
          </div>
          <div className={styles.realisationsGrid}>
            {realisations.slice(0, 3).length > 0 ? realisations.slice(0, 3).map((r) => (
              <Link key={r.slug} href={`/realisations/${r.slug}/`} className={styles.realisationCard}>
                <div className={styles.realisationOverlay} />
                <div className={styles.realisationContent}>
                  <div className={styles.realisationCity}>{r.ville}</div>
                  <div className={styles.realisationTitle}>{r.type}</div>
                  {r.duree && <div className={styles.realisationMeta}>{r.duree}</div>}
                </div>
              </Link>
            )) : (
              <>
                <div className={styles.realisationCard}>
                  <div className={styles.realisationOverlay} />
                  <div className={styles.realisationContent}>
                    <div className={styles.realisationCity}>Toulon</div>
                    <div className={styles.realisationTitle}>Debouchage par hydrocurage</div>
                  </div>
                </div>
                <div className={styles.realisationCard}>
                  <div className={styles.realisationOverlay} />
                  <div className={styles.realisationContent}>
                    <div className={styles.realisationCity}>Frejus</div>
                    <div className={styles.realisationTitle}>Diagnostic camera endoscopique</div>
                  </div>
                </div>
                <div className={styles.realisationCard}>
                  <div className={styles.realisationOverlay} />
                  <div className={styles.realisationContent}>
                    <div className={styles.realisationCity}>Hyeres</div>
                    <div className={styles.realisationTitle}>Remise en conformite reseau</div>
                  </div>
                </div>
              </>
            )}
          </div>
          <p className={styles.pricingNote} style={{ marginTop: '24px' }}>
            <Link href="/realisations/" style={{ color: 'var(--orange)', fontWeight: 700, textDecoration: 'none' }}>
              Voir toutes nos realisations &rarr;
            </Link>
          </p>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h2 className={styles.ctaTitle}>Un probleme urgent ?<br />Ne restez pas les pieds dans l&apos;eau.</h2>
          <p className={styles.ctaDesc}>Nos techniciens sont en route pour vous depanner. Devis gratuit immediat par telephone ou via notre formulaire.</p>
          <div className={styles.ctaButtons}>
            <a href={`tel:${PHONE_RAW}`} className="btn-primary" style={{ fontSize: '20px', padding: '20px 40px' }}>
              Appeler maintenant
            </a>
            <button className={styles.btnOutline} type="button">
              Devis en ligne gratuit
            </button>
          </div>
        </div>
      </section>

      {/* ═══ VILLES ═══ */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-label">153 communes couvertes</div>
          <h2 className={styles.sectionTitle}>Toutes les villes du Var</h2>
          <p className="section-desc" style={{ marginBottom: '24px' }}>
            On intervient dans les 153 communes du departement. Trouvez la votre :
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
