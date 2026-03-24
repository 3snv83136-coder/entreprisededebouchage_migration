import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { COMPANY_NAME, BASE_URL, PHONE } from '@/lib/config';
import { getAllServices } from '@/lib/data/services';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: `Nos prestations de débouchage — ${COMPANY_NAME}`,
  description: `Débouchage canalisation, WC, évier, douche, fosse septique, égout… Découvrez toutes les prestations de ${COMPANY_NAME} dans le Var (83). Intervention 24h/7j.`,
  alternates: {
    canonical: '/nos-prestations/',
  },
  openGraph: {
    title: `Nos prestations — ${COMPANY_NAME}`,
    url: `${BASE_URL}/nos-prestations/`,
  },
};

const serviceDetails: Record<string, { temps: string; garantie: string }> = {
  'debouchage-canalisation':         { temps: '45 min – 1h30', garantie: '3 mois' },
  'debouchage-wc-toilettes':         { temps: '30 – 60 min',   garantie: '3 mois' },
  'debouchage-evier-lavabo':         { temps: '20 – 45 min',   garantie: '3 mois' },
  'debouchage-douche-baignoire':     { temps: '20 – 45 min',   garantie: '3 mois' },
  'debouchage-egouts-regards':       { temps: '1h – 3h',       garantie: '6 mois' },
  'debouchage-cuisine':              { temps: '30 – 60 min',   garantie: '3 mois' },
  'debouchage-fosse-septique':       { temps: '2h – 4h',       garantie: '6 mois' },
  'debouchage-salle-de-bain':        { temps: '45 min – 1h30', garantie: '3 mois' },
  'debouchage-lave-vaisselle':       { temps: '20 – 40 min',   garantie: '3 mois' },
  'debouchage-lave-linge':           { temps: '20 – 40 min',   garantie: '3 mois' },
  'debouchage-ballon-deau-chaude-chauffe-eau': { temps: '1h – 2h', garantie: '3 mois' },
};

export default function NosPrestationsPage() {
  const services = getAllServices();

  return (
    <article className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <Breadcrumbs
          items={[
            { name: 'Accueil', href: '/' },
            { name: 'Nos prestations', href: '/nos-prestations/' },
          ]}
        />

        <h1 className={styles.title}>Nos prestations de débouchage</h1>
        <p className={styles.lead}>
          Canalisations, WC, cuisine, fosse septique… notre équipe intervient sur{' '}
          <strong style={{ color: 'var(--white)' }}>tous types de bouchons</strong> dans le Var,{' '}
          7j/7 et 24h/24. Chaque prestation inclut un diagnostic gratuit et une garantie de résultat.
        </p>

        <p className={styles.phone}>
          Urgence ?{' '}
          <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>{' '}
          — réponse immédiate
        </p>

        <div className={styles.grid}>
          {services.map((service) => {
            const details = serviceDetails[service.slug];
            return (
              <Link key={service.slug} href={`/${service.slug}/`} className={styles.card}>
                <span className={styles.cardIcon}>{service.icon}</span>
                <h2 className={styles.cardTitle}>{service.label}</h2>
                <p className={styles.cardDesc}>{service.description}</p>
                <ul className={styles.cardProblems}>
                  {service.problems.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                {details && (
                  <div className={styles.cardMeta}>
                    <span>⏱ {details.temps}</span>
                    <span>✓ Garantie {details.garantie}</span>
                  </div>
                )}
                <span className={styles.cardLink}>Voir la prestation →</span>
              </Link>
            );
          })}
        </div>

        <section className={styles.bottom}>
          <h2>Pourquoi nous choisir ?</h2>
          <ul>
            <li>Intervention en moins de 2h dans tout le Var (83)</li>
            <li>Devis gratuit avant toute intervention</li>
            <li>Techniciens certifiés, matériel professionnel</li>
            <li>Facturation transparente, pas de frais cachés</li>
          </ul>
          <Link href="/nos-tarifs/" className={styles.ctaLink}>
            Consulter nos tarifs →
          </Link>
        </section>
      </div>
    </article>
  );
}
