import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { PHONE, PHONE_RAW, COMPANY_NAME, BASE_URL } from '@/lib/config';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'À propos — Entreprise de débouchage Bouches-du-Rhône depuis 2005',
  description:
    'Entreprise de débouchage dans les Bouches-du-Rhône depuis 19 ans. Techniciens qualifiés, intervention 24h/7j sur 119 communes. 489 avis 4.9/5.',
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
    'Entreprise de débouchage spécialisée dans les Bouches-du-Rhône (13) depuis 2005. Intervention sur 119 communes, disponible 24h/7j. Canalisations, WC, fosses septiques, égouts.',
  url: BASE_URL,
  telephone: '0627699134',
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Bouches-du-Rhône',
    containsPlace: [
      { '@type': 'City', name: 'Marseille' },
      { '@type': 'City', name: 'Aix-en-Provence' },
      { '@type': 'City', name: 'Aubagne' },
      { '@type': 'City', name: 'Marignane' },
      { '@type': 'City', name: 'La Ciotat' },
      { '@type': 'City', name: 'Martigues' },
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
  { nom: 'Marseille', slug: 'marseille', cp: '13000' },
  { nom: 'Aix-en-Provence', slug: 'aix-en-provence', cp: '13100' },
  { nom: 'Aubagne', slug: 'aubagne', cp: '13400' },
  { nom: 'Marignane', slug: 'marignane', cp: '13700' },
  { nom: 'La Ciotat', slug: 'la-ciotat', cp: '13600' },
  { nom: 'Martigues', slug: 'martigues', cp: '13500' },
  { nom: 'Salon-de-Provence', slug: 'salon-de-provence', cp: '13300' },
  { nom: 'Istres', slug: 'istres', cp: '13800' },
  { nom: 'Vitrolles', slug: 'vitrolles', cp: '13127' },
  { nom: 'Arles', slug: 'arles', cp: '13200' },
  { nom: 'Gardanne', slug: 'gardanne', cp: '13120' },
  { nom: 'Allauch', slug: 'allauch', cp: '13190' },
];

const STATS = [
  { value: '2005', label: 'Année de création', sub: 'Plus de 19 ans d\'expérience' },
  { value: '489', label: 'Avis clients', sub: 'Note moyenne 4.9/5' },
  { value: '119', label: 'Communes couvertes', sub: 'Toutes les Bouches-du-Rhône (13)' },
  { value: '24/7', label: 'Disponibilite', sub: 'En zone principale' },
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
            <span className={styles.badge}>Depuis 2005 dans les Bouches-du-Rhône</span>
            <h1 className={styles.title}>
              À propos — Votre spécialiste débouchage dans les Bouches-du-Rhône depuis 19 ans
            </h1>
            <p className={styles.lead}>
              Fondée en 2005 à Aubagne, notre entreprise intervient sur l&apos;ensemble des{' '}
              <strong>Bouches-du-Rhône (13)</strong> pour tout type de bouchon : canalisation, WC, fosse septique,
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
                  dans les Bouches-du-Rhône. Cette expérience concrète — pas seulement des certifications — fait
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
                  Aubagne, Marignane, Marseille et les villes de l&apos;agglomération. Partout ailleurs
                  dans les Bouches-du-Rhône, nous visons moins de 2 heures.
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
              119 communes couvertes dans les Bouches-du-Rhône
            </h2>
            <p className={styles.sectionLead}>
              De Marseille à Arles, du littoral à l&apos;arrière-pays, nous couvrons
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
              Appeler maintenant
            </a>
          </section>
        </div>
      </article>
    </>
  );
}
