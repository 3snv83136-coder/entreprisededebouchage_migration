import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { PHONE, PHONE_RAW, COMPANY_NAME, BASE_URL } from '@/lib/config';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'À propos — Entreprise de débouchage Var depuis 2005',
  description:
    'Entreprise de débouchage dans le Var depuis 19 ans. Techniciens qualifiés, intervention 24h/7j sur 153 communes. 489 avis 4.9/5.',
  alternates: { canonical: `${BASE_URL}/a-propos/` },
  openGraph: {
    title: `À propos — ${COMPANY_NAME}`,
    url: `${BASE_URL}/a-propos/`,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Plumber',
  name: COMPANY_NAME,
  foundingDate: '2005',
  description:
    'Entreprise de débouchage spécialisée dans le Var (83) depuis 2005. Intervention sur 153 communes, disponible 24h/7j. Canalisations, WC, fosses septiques, égouts.',
  url: BASE_URL,
  telephone: '0627699134',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Var',
    containsPlace: [
      { '@type': 'City', name: 'Toulon' },
      { '@type': 'City', name: 'Hyères' },
      { '@type': 'City', name: 'La Seyne-sur-Mer' },
      { '@type': 'City', name: 'Fréjus' },
      { '@type': 'City', name: 'Draguignan' },
      { '@type': 'City', name: 'Saint-Raphaël' },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '489',
    bestRating: '5',
    worstRating: '1',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de débouchage',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Débouchage canalisation' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Débouchage WC' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Débouchage fosse septique' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Débouchage égouts' } },
    ],
  },
};

const VILLES_PRINCIPALES = [
  { nom: 'Toulon', slug: 'toulon', cp: '83000' },
  { nom: 'Hyères', slug: 'hyeres', cp: '83400' },
  { nom: 'La Seyne-sur-Mer', slug: 'la-seyne-sur-mer', cp: '83500' },
  { nom: 'Fréjus', slug: 'frejus', cp: '83600' },
  { nom: 'Draguignan', slug: 'draguignan', cp: '83300' },
  { nom: 'Saint-Raphaël', slug: 'saint-raphael', cp: '83700' },
  { nom: 'Six-Fours-les-Plages', slug: 'six-fours-les-plages', cp: '83140' },
  { nom: 'La Garde', slug: 'la-garde', cp: '83130' },
  { nom: 'Ollioules', slug: 'ollioules', cp: '83190' },
  { nom: 'Bandol', slug: 'bandol', cp: '83150' },
  { nom: 'Sainte-Maxime', slug: 'sainte-maxime', cp: '83120' },
  { nom: 'Brignoles', slug: 'brignoles', cp: '83170' },
];

const STATS = [
  { value: '2005', label: 'Année de création', sub: 'Plus de 19 ans d\'expérience' },
  { value: '489', label: 'Avis clients', sub: 'Note moyenne 4.9/5' },
  { value: '153', label: 'Communes couvertes', sub: 'Tout le Var (83)' },
  { value: '< 1h', label: 'Délai d\'intervention', sub: 'En zone principale' },
];

const ENGAGEMENTS = [
  'Prix fixe communiqué avant toute intervention — aucune surprise',
  'Devis gratuit et sans engagement sur simple appel',
  'Garantie résultat : on ne part pas tant que c\'est bouché',
  'Techniciens formés, outillage professionnel haute pression',
  'Disponible 24h/24, 7j/7, y compris jours fériés',
  'Facturation détaillée, paiement sur place ou en ligne',
];

export default function AProposPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className={styles.page}>
        <div className={`container ${styles.inner}`}>
          <Breadcrumbs
            items={[
              { name: 'Accueil', href: '/' },
              { name: 'À propos', href: '/a-propos/' },
            ]}
          />

          {/* HERO */}
          <header className={styles.hero}>
            <span className={styles.badge}>Depuis 2005 dans le Var</span>
            <h1 className={styles.title}>
              À propos — Votre spécialiste débouchage dans le Var depuis 19 ans
            </h1>
            <p className={styles.lead}>
              Fondée en 2005 à Toulon, notre entreprise intervient sur l&apos;ensemble du{' '}
              <strong>Var (83)</strong> pour tout type de bouchon : canalisation, WC, fosse septique,
              égout. En 19 ans d&apos;activité, nous avons bâti notre réputation sur la réactivité,
              la transparence des prix et la qualité du travail.
            </p>
          </header>

          {/* STATS */}
          <section className={styles.statsSection} aria-label="Chiffres clés">
            <div className={styles.statsGrid}>
              {STATS.map((s) => (
                <div key={s.value} className={styles.statCard}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                  <span className={styles.statSub}>{s.sub}</span>
                </div>
              ))}
            </div>
          </section>

          {/* EXPÉRIENCE */}
          <section className={styles.section} aria-labelledby="experience-title">
            <h2 id="experience-title" className={styles.sectionTitle}>
              Notre expérience terrain
            </h2>
            <div className={styles.twoCol}>
              <div className={styles.colText}>
                <p>
                  Depuis 2005, nos techniciens traitent des centaines d&apos;interventions par an
                  dans le Var. Cette expérience concrète — pas seulement des certifications — fait
                  la différence face aux situations complexes : canalisations vétustes, fosses
                  hors norme, racines envahissantes.
                </p>
                <p>
                  Nos <strong>489 avis avec une note de 4,9/5</strong> reflètent ce que nos
                  clients retiennent : un technicien qui arrive à l&apos;heure, explique ce
                  qu&apos;il fait, et règle le problème sans revenir le lendemain.
                </p>
                <p>
                  Le délai moyen d&apos;intervention est inférieur à <strong>1 heure</strong> sur
                  Toulon, Hyères, La Seyne-sur-Mer et les villes du littoral. Partout ailleurs
                  dans le Var, nous visons moins de 2 heures.
                </p>
              </div>
              <div className={styles.colHighlight}>
                <div className={styles.ratingBox}>
                  <span className={styles.ratingScore}>4.9</span>
                  <span className={styles.ratingStars} aria-hidden="true">★★★★★</span>
                  <span className={styles.ratingCount}>489 avis vérifiés</span>
                </div>
                <p className={styles.ratingNote}>
                  Collectés sur Google, Pages Jaunes et notre site — clients réels, aucun avis commandé.
                </p>
              </div>
            </div>
          </section>

          {/* ZONE */}
          <section className={styles.section} aria-labelledby="zone-title">
            <h2 id="zone-title" className={styles.sectionTitle}>
              153 communes couvertes dans le Var
            </h2>
            <p className={styles.sectionLead}>
              De Toulon à Draguignan, du littoral varois à l&apos;arrière-pays, nous couvrons
              l&apos;intégralité du département. Voici les principales agglomérations :
            </p>
            <ul className={styles.villesList}>
              {VILLES_PRINCIPALES.map((v) => (
                <li key={v.slug}>
                  <Link href={`/debouchage-${v.slug}/`} className={styles.villeLink}>
                    Débouchage {v.nom}
                    <span className={styles.villeCP}>{v.cp}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className={styles.villesNote}>
              Votre commune n&apos;est pas listée ?{' '}
              <Link href="/zones-dintervention/" className={styles.inlineLink}>
                Consultez toutes nos zones d&apos;intervention →
              </Link>
            </p>
          </section>

          {/* ENGAGEMENTS */}
          <section className={styles.section} aria-labelledby="engagements-title">
            <h2 id="engagements-title" className={styles.sectionTitle}>
              Nos engagements
            </h2>
            <ul className={styles.engagementsList}>
              {ENGAGEMENTS.map((e) => (
                <li key={e} className={styles.engagementItem}>
                  <span className={styles.checkIcon} aria-hidden="true">✓</span>
                  {e}
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <section className={styles.ctaSection} aria-label="Appel à l'action">
            <p className={styles.ctaTitle}>Un bouchon ? On arrive.</p>
            <p className={styles.ctaSub}>
              Devis gratuit — prix annoncé avant intervention — disponible 24h/7j.
            </p>
            <a href={`tel:${PHONE_RAW}`} className="btn-primary">
              Appeler le {PHONE}
            </a>
          </section>
        </div>
      </article>
    </>
  );
}
