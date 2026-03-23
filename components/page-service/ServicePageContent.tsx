import { Service, FaqItem } from '@/lib/types';
import { getAllVilles } from '@/lib/data/villes';
import { generateSchemaService, generateSchemaFAQ, generateSchemaBreadcrumbs } from '@/lib/seo/schema';
import { PHONE, PHONE_RAW, BASE_URL } from '@/lib/config';
import Link from 'next/link';
import Faq from '@/components/page-ville/Faq';
import CtaFinal from '@/components/page-ville/CtaFinal';
import VilleSearchInline from '@/components/common/VilleSearchInline';
import styles from './ServicePageContent.module.css';

interface Props {
  service: Service;
  faqs: FaqItem[];
  content: {
    intro: string;
    problems: string;
    intervention: string;
    tarif: string;
  };
}

export default function ServicePageContent({ service, faqs, content }: Props) {
  const villes = getAllVilles();
  const serviceSchema = generateSchemaService(service);
  const faqSchema = generateSchemaFAQ(faqs);
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
          <p className={styles.sub}>dans le Var — Intervention rapide 24h/7j</p>
          <a href={`tel:${PHONE_RAW}`} className="btn-primary">
            📞 {PHONE}
          </a>
        </div>
      </section>

      {/* Intro */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-label">Présentation</div>
          <h2 className="section-title">{service.label} dans le Var</h2>
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

      {/* Tarif */}
      <section className={styles.section} style={{ background: 'var(--navy-mid)' }}>
        <div className="container">
          <div className="section-label">Tarif</div>
          <h2 className="section-title">Combien ça coûte ?</h2>
          <div className={styles.textBlock}>
            <p>{content.tarif}</p>
            <p>Fourchette de prix : <strong>{service.priceRange}</strong>. Devis gratuit par téléphone avant toute intervention.</p>
          </div>
        </div>
      </section>

      {/* Villes */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-label">Nos zones</div>
          <h2 className="section-title">{service.label} — Villes desservies</h2>
          <p className="section-desc" style={{ marginBottom: '24px' }}>
            On intervient dans les 153 communes du Var. Trouvez la vôtre :
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
