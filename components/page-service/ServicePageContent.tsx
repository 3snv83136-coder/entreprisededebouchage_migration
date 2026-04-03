import { Service, FaqItem } from '@/lib/types';
import { getAllVilles } from '@/lib/data/villes';
import { generateSchemaService, generateSchemaFAQ, generateSchemaBreadcrumbs, generateSchemaHowTo } from '@/lib/seo/schema';
import { PHONE, PHONE_RAW, BASE_URL } from '@/lib/config';
import Link from 'next/link';
import Faq from '@/components/page-ville/Faq';
import CtaFinal from '@/components/page-ville/CtaFinal';
import VilleSearchInline from '@/components/common/VilleSearchInline';
import GeoEvierVarClusterLinks from '@/components/geo-evier/GeoEvierVarClusterLinks';
import Pricing from '@/components/page-ville/Pricing';
import styles from './ServicePageContent.module.css';

export interface HowToStep {
  name: string;
  text: string;
}

interface Props {
  service: Service;
  faqs: FaqItem[];
  content: {
    intro: string;
    problems: string;
    intervention: string;
    tarif: string;
    steps?: HowToStep[];
    signes?: string;
    conseils?: string;
  };
}

export default function ServicePageContent({ service, faqs, content }: Props) {
  const villes = getAllVilles();
  const serviceSchema = generateSchemaService(service);
  const faqSchema = generateSchemaFAQ(faqs);
  const howtoSchema = content.steps?.length
    ? generateSchemaHowTo(`Comment se déroule un ${service.label.toLowerCase()} ?`, content.steps)
    : null;
  const breadcrumbSchema = generateSchemaBreadcrumbs([
    { name: 'Accueil', href: '/' },
    { name: 'Nos prestations', href: '/nos-prestations/' },
    { name: service.label, href: `/${service.slug}/` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {howtoSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <div className={styles.badge}>{service.icon} Service spécialisé</div>
          <h1 className={styles.title}>{service.label}</h1>
          <p className={styles.sub}>dans les Bouches-du-Rhône — Intervention rapide 24h/7j</p>
          <a href={`tel:${PHONE_RAW}`} className="btn-primary">
            Appeler maintenant
          </a>
        </div>
      </section>

      {/* Intro */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-label">Présentation</div>
          <h2 className="section-title">{service.label} dans les Bouches-du-Rhône</h2>
          <div className={styles.textBlock}>
            <p>{content.intro}</p>
          </div>
        </div>
      </section>

      {/* Problèmes courants */}
      <section className={styles.section} style={{ background: 'var(--navy-mid)' }}>
        <div className="container">
          <div className="section-label">Problèmes courants</div>
          <h2 className="section-title">Quand nous appeler ?</h2>
          <div className={styles.textBlock}>
            <p>{content.problems}</p>
            <ul className={styles.problemList}>
              {service.problems.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Intervention */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-label">Notre méthode</div>
          <h2 className="section-title">Comment on intervient</h2>
          <div className={styles.textBlock}>
            <p>{content.intervention}</p>
            <p><strong>Méthode :</strong> {service.intervention}</p>
          </div>
        </div>
      </section>

      {/* Étapes HowTo */}
      {content.steps && content.steps.length > 0 && (
        <section className={styles.section} style={{ background: 'var(--navy-mid)' }}>
          <div className="container">
            <div className="section-label">Déroulement</div>
            <h2 className="section-title">Les étapes de l&apos;intervention</h2>
            <ol className={styles.stepsList}>
              {content.steps.map((step, i) => (
                <li key={i} className={styles.stepItem}>
                  <span className={styles.stepNum}>{i + 1}</span>
                  <div>
                    <strong className={styles.stepName}>{step.name}</strong>
                    <p className={styles.stepText}>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Signes d'alerte */}
      {content.signes && (
        <section className={styles.section}>
          <div className="container">
            <div className="section-label">À surveiller</div>
            <h2 className="section-title">Signes qui ne trompent pas</h2>
            <div className={styles.textBlock}>
              <p>{content.signes}</p>
            </div>
          </div>
        </section>
      )}

      {/* Conseils préventifs */}
      {content.conseils && (
        <section className={styles.section} style={{ background: 'var(--navy-mid)' }}>
          <div className="container">
            <div className="section-label">Prévention</div>
            <h2 className="section-title">Conseils pour éviter la panne</h2>
            <div className={styles.textBlock}>
              <p>{content.conseils}</p>
            </div>
          </div>
        </section>
      )}

      {/* Tarif */}
      <Pricing />
      <section className={styles.section} style={{ background: 'var(--navy-mid)' }}>
        <div className="container">
          <div className={styles.textBlock}>
            <p>{content.tarif}</p>
            <p>Fourchette de prix : <strong>{service.priceRange}</strong>. Devis gratuit par téléphone avant toute intervention.</p>
          </div>
        </div>
      </section>

      {service.slug === 'debouchage-evier-lavabo' && <GeoEvierVarClusterLinks />}

      {/* Villes */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-label">Nos zones</div>
          <h2 className="section-title">{service.label} — Villes desservies</h2>
          <p className="section-desc" style={{ marginBottom: '24px' }}>
            On intervient dans les 119 communes des Bouches-du-Rhône. Trouvez la vôtre :
          </p>
          <VilleSearchInline
            villes={villes.map((v) => ({ ville: v.ville, slug: v.slug, code_postal: v.code_postal }))}
            placeholder={`${service.label} dans quelle ville ?`}
            topCount={6}
          />
        </div>
      </section>

      {/* FAQ */}
      <Faq faqs={faqs} />

      {/* CTA */}
      <CtaFinal />
    </>
  );
}
