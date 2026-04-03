import { Metadata } from 'next';
import { COMPANY_NAME, PHONE } from '@/lib/config';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Mentions légales — Entreprise de Débouchage Bouches-du-Rhône',
  description: `Mentions légales de ${COMPANY_NAME}. SIRET, activité débouchage assainissement Bouches-du-Rhône (13), hébergeur Vercel, RGPD.`,
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return (
    <article className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Mentions légales</h1>

        <section className={styles.section}>
          <h2>Éditeur du site</h2>
          <p>
            <strong>{COMPANY_NAME}</strong><br />
            Entreprise individuelle de debouchage et plomberie<br />
            Entreprise en activité depuis 2005 dans les Bouches-du-Rhône (13)<br />
            Siège social : Aubagne (13400), Bouches-du-Rhône, France<br />
            Téléphone : {PHONE}<br />
            Email : contact@entreprisededebouchage.com<br />
            SIRET : À renseigner avant mise en ligne<br />
            Directeur de la publication : À renseigner avant mise en ligne
          </p>
        </section>

        <section className={styles.section}>
          <h2>Activité professionnelle</h2>
          <p>
            Activité : Débouchage et assainissement de canalisations<br />
            Code APE / NAF : 3700Z (collecte et traitement des eaux usées)<br />
            Zone d&apos;intervention : Département des Bouches-du-Rhône (13), 119 communes<br />
            Certification : Techniciens formés aux techniques de débouchage et d&apos;hydrocurage
          </p>
        </section>

        <section className={styles.section}>
          <h2>Hébergeur</h2>
          <p>
            Vercel Inc.<br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
            Site : vercel.com
          </p>
        </section>

        <section className={styles.section}>
          <h2>Propriété intellectuelle</h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, logos, icônes) est la propriété
            exclusive de {COMPANY_NAME} ou de ses partenaires. Toute reproduction, même partielle,
            est interdite sans autorisation préalable.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Protection des données personnelles</h2>
          <p>
            Les informations recueillies via le formulaire de rappel (nom, numéro de téléphone) sont
            utilisées uniquement pour vous recontacter dans le cadre de votre demande d&apos;intervention.
            Elles ne sont ni vendues, ni partagées avec des tiers.
          </p>
          <p>
            Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
            Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de rectification et de
            suppression de vos données. Pour exercer ce droit, contactez-nous au {PHONE}.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Cookies</h2>
          <p>
            Ce site utilise des cookies techniques nécessaires à son fonctionnement. Aucun cookie
            publicitaire ou de tracking tiers n&apos;est utilisé sans votre consentement.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Tarification</h2>
          <p>
            Les tarifs affichés sur ce site (110€, 249€, 180€) sont les prix minimum par type
            d&apos;intervention standard. Un devis gratuit et définitif est systématiquement
            communiqué avant toute intervention.
          </p>
        </section>

        <section className={styles.section}>
          <h2>Responsabilité</h2>
          <p>
            {COMPANY_NAME} s&apos;efforce de fournir des informations exactes et à jour sur ce site.
            Toutefois, des erreurs ou omissions peuvent survenir. Les tarifs affichés sont indicatifs
            et peuvent varier selon la nature de l&apos;intervention. Un devis gratuit est systématiquement
            proposé avant toute intervention.
          </p>
        </section>
      </div>
    </article>
  );
}
