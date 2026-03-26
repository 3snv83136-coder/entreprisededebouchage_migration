import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { COMPANY_NAME, BASE_URL, PHONE } from '@/lib/config';
import { getAllServices } from '@/lib/data/services';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: `Tarifs débouchage Var — ${COMPANY_NAME}`,
  description: `3 tarifs fixes debouchage dans le Var (83) : 99€, 110€, 199€. Devis gratuit, intervention 24h/7j. Pas de frais caches.`,
  alternates: {
    canonical: '/nos-tarifs/',
  },
  openGraph: {
    title: `Tarifs débouchage — ${COMPANY_NAME}`,
    url: `${BASE_URL}/nos-tarifs/`,
  },
};

const TARIFS_FIXES = { simple: '99 €', camera: '110 €', hydro: '199 €' };

const pricingData: Record<string, { tarif: string; note: string }> = {
  'debouchage-evier-lavabo':         { tarif: TARIFS_FIXES.simple, note: 'Siphon + canalisation' },
  'debouchage-douche-baignoire':     { tarif: TARIFS_FIXES.simple, note: 'Extraction + nettoyage' },
  'debouchage-cuisine':              { tarif: TARIFS_FIXES.simple, note: 'Graisses + résidus' },
  'debouchage-lave-vaisselle':       { tarif: TARIFS_FIXES.simple, note: 'Pompe + canalisation' },
  'debouchage-lave-linge':           { tarif: TARIFS_FIXES.simple, note: 'Filtre + évacuation' },
  'debouchage-wc-toilettes':         { tarif: TARIFS_FIXES.simple, note: 'Sans démontage inutile' },
  'debouchage-salle-de-bain':        { tarif: TARIFS_FIXES.simple, note: 'Réseau complet' },
  'debouchage-canalisation':         { tarif: TARIFS_FIXES.hydro, note: 'Hydrocurage haute pression' },
  'debouchage-ballon-deau-chaude-chauffe-eau': { tarif: TARIFS_FIXES.camera, note: 'Détartrage + évacuation' },
  'debouchage-egouts-regards':       { tarif: TARIFS_FIXES.hydro, note: 'Réseau extérieur + rapport' },
  'debouchage-fosse-septique':       { tarif: TARIFS_FIXES.hydro, note: 'Vidange + curage complet' },
};

const priceLabels: Record<string, string> = {
  '€':   'Tarif accessible',
  '€€':  'Tarif intermédiaire',
  '€€€': 'Tarif élevé (travaux lourds)',
};

export default function NosTarifsPage() {
  const services = getAllServices();

  const groups = [
    { label: '€', title: 'Petites interventions' },
    { label: '€€', title: 'Interventions courantes' },
    { label: '€€€', title: 'Interventions lourdes' },
  ];

  return (
    <article className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <Breadcrumbs
          items={[
            { name: 'Accueil', href: '/' },
            { name: 'Nos tarifs', href: '/nos-tarifs/' },
          ]}
        />

        <h1 className={styles.title}>Tarifs fixes debouchage dans le Var</h1>
        <p className={styles.lead}>
          3 tarifs fixes, sans mauvaise surprise : <strong style={{ color: 'var(--orange)' }}>99 € · 110 € · 199 €</strong>.
          Pas de supplement cache.{' '}
          <strong style={{ color: 'var(--white)' }}>Devis gratuit</strong> avant tout travail.
        </p>

        <div className={styles.infoBox}>
          <span>📞 Devis immédiat :</span>
          <a href={`tel:${PHONE.replace(/\s/g, '')}`}>{PHONE}</a>
          <span className={styles.infoNote}>Disponible 24h/24 — 7j/7</span>
        </div>

        {groups.map((group) => {
          const groupServices = services.filter((s) => s.priceRange === group.label);
          if (groupServices.length === 0) return null;
          return (
            <section key={group.label} className={styles.group}>
              <h2 className={styles.groupTitle}>
                <span className={styles.groupBadge}>{group.label}</span>
                {group.title}
                <span className={styles.groupSub}>{priceLabels[group.label]}</span>
              </h2>
              <div className={styles.table}>
                {groupServices.map((service) => {
                  const pricing = pricingData[service.slug];
                  return (
                    <Link key={service.slug} href={`/${service.slug}/`} className={styles.row}>
                      <span className={styles.rowIcon}>{service.icon}</span>
                      <span className={styles.rowLabel}>{service.label}</span>
                      <span className={styles.rowNote}>{pricing?.note || service.intervention}</span>
                      <span className={styles.rowPrice}>
                        {pricing ? pricing.tarif : 'Sur devis'}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}

        <section className={styles.mentions}>
          <h2>Ce qui est inclus dans chaque intervention</h2>
          <ul>
            <li>Déplacement dans le Var (83) — inclus</li>
            <li>Diagnostic initial — inclus</li>
            <li>Main d&apos;œuvre — inclus</li>
            <li>Rapport d&apos;intervention — inclus</li>
            <li>TVA 10 % — incluse dans les tarifs affichés</li>
          </ul>
          <p className={styles.mentionsNote}>
            Supplément nuit/week-end/jour férié selon conditions. Tarifs indicatifs — le devis définitif est
            établi sur place après diagnostic.
          </p>
        </section>

        <div className={styles.cta}>
          <Link href="/nos-prestations/" className={styles.ctaLink}>
            Voir toutes nos prestations →
          </Link>
          <Link href="/zones-dintervention/" className={styles.ctaLinkSecondary}>
            Zones d&apos;intervention →
          </Link>
        </div>
      </div>
    </article>
  );
}
