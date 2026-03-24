import { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { COMPANY_NAME, BASE_URL, PHONE } from '@/lib/config';
import { getAllServices } from '@/lib/data/services';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: `Tarifs débouchage Var — ${COMPANY_NAME}`,
  description: `Tarifs clairs pour tous nos services de débouchage dans le Var (83). Devis gratuit, intervention 24h/7j. Pas de frais cachés — appelez le ${PHONE}.`,
  alternates: {
    canonical: '/nos-tarifs/',
  },
  openGraph: {
    title: `Tarifs débouchage — ${COMPANY_NAME}`,
    url: `${BASE_URL}/nos-tarifs/`,
  },
};

const pricingData: Record<string, { min: string; max: string; note: string }> = {
  'debouchage-evier-lavabo':         { min: '80 €', max: '150 €',  note: 'Siphon + canalisation' },
  'debouchage-douche-baignoire':     { min: '80 €', max: '150 €',  note: 'Extraction + nettoyage' },
  'debouchage-cuisine':              { min: '90 €', max: '160 €',  note: 'Graisses + résidus' },
  'debouchage-lave-vaisselle':       { min: '80 €', max: '130 €',  note: 'Pompe + canalisation' },
  'debouchage-lave-linge':           { min: '80 €', max: '130 €',  note: 'Filtre + évacuation' },
  'debouchage-wc-toilettes':         { min: '90 €', max: '180 €',  note: 'Sans démontage inutile' },
  'debouchage-salle-de-bain':        { min: '100 €', max: '200 €', note: 'Réseau complet' },
  'debouchage-canalisation':         { min: '120 €', max: '280 €', note: 'Hydrocurage haute pression' },
  'debouchage-ballon-deau-chaude-chauffe-eau': { min: '120 €', max: '220 €', note: 'Détartrage + évacuation' },
  'debouchage-egouts-regards':       { min: '180 €', max: '450 €', note: 'Réseau extérieur + rapport' },
  'debouchage-fosse-septique':       { min: '250 €', max: '600 €', note: 'Vidange + curage complet' },
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

        <h1 className={styles.title}>Tarifs débouchage dans le Var</h1>
        <p className={styles.lead}>
          Des tarifs clairs, sans mauvaise surprise. Le prix final dépend de l&apos;accessibilité,
          du type de bouchon et de la durée d&apos;intervention.{' '}
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
                        {pricing ? `${pricing.min} – ${pricing.max}` : 'Sur devis'}
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
