import Link from 'next/link';
import Image from 'next/image';

import { getAllVilles } from '@/lib/data/villes';
import { getAllServices } from '@/lib/data/services';
import { getAllRealisations } from '@/lib/data/realisations';
import VilleSearch from '@/components/common/VilleSearch';
import VilleSearchInline from '@/components/common/VilleSearchInline';
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

      <section className={styles.section} style={{ background: 'var(--navy)' }}>
        <div className="container">
          <div className="section-label">Interventions réelles</div>
          <h2 className="section-title">Nos réalisations</h2>
          <div className={styles.pricing} style={{ marginTop: '32px' }}>
            {realisations.slice(0, 3).length > 0 ? realisations.slice(0, 3).map((r) => (
              <Link key={r.slug} href={`/realisations/${r.slug}/`} className={styles.pricingCard} style={{ textDecoration: 'none' }}>
                <h3 className={styles.pricingTitle}>{r.type}</h3>
                <p className={styles.pricingDesc}>{r.ville} — {r.mois} {r.annee}</p>
                {r.duree && (
                  <div className={styles.pricingPrice} style={{ fontSize: '22px', letterSpacing: 0 }}>
                    ⏱ {r.duree}
                  </div>
                )}
                <p className={styles.pricingDesc} style={{ marginTop: '8px', marginBottom: 0 }}>
                  {r.resultat.slice(0, 70)}…
                </p>
              </Link>
            )) : (
              <>
                <div className={styles.pricingCard}>
                  <h3 className={styles.pricingTitle}>Débouchage canalisation</h3>
                  <p className={styles.pricingDesc}>Toulon — Janvier 2026</p>
                  <div className={styles.pricingPrice}>1h<span>15</span></div>
                  <p className={styles.pricingDesc} style={{ marginBottom: 0 }}>Hydrocurage haute pression, résultat immédiat.</p>
                </div>
                <div className={`${styles.pricingCard} ${styles.pricingCardPopular}`}>
                  <div className={styles.pricingBadge}>Récent</div>
                  <h3 className={styles.pricingTitle}>Débouchage WC</h3>
                  <p className={styles.pricingDesc}>Hyères — Février 2026</p>
                  <div className={styles.pricingPrice}>45<span>min</span></div>
                  <p className={styles.pricingDesc} style={{ marginBottom: 0 }}>WC débordant remis en état sans démontage.</p>
                </div>
                <div className={styles.pricingCard}>
                  <h3 className={styles.pricingTitle}>Fosse septique</h3>
                  <p className={styles.pricingDesc}>La Seyne — Mars 2026</p>
                  <div className={styles.pricingPrice}>2h<span>30</span></div>
                  <p className={styles.pricingDesc} style={{ marginBottom: 0 }}>Vidange complète + curage, rapport fourni.</p>
                </div>
              </>
            )}
          </div>
          <p className={styles.pricingNote}>
            <Link href="/realisations/" style={{ color: 'var(--orange)', fontWeight: 700, textDecoration: 'none' }}>
              Voir toutes nos réalisations →
            </Link>
          </p>
        </div>
      </section>

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
