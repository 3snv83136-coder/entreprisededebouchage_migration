import { Service, Ville, PageData, FaqItem } from '@/lib/types';
import { getNearbyVilles } from '@/lib/data/villes';
import { PHONE, PHONE_RAW } from '@/lib/config';
import Link from 'next/link';
import Faq from '@/components/page-ville/Faq';
import CtaFinal from '@/components/page-ville/CtaFinal';
import UrgenceBanner from '@/components/page-ville/UrgenceBanner';
import styles from './ServiceCityContent.module.css';

interface Props {
  service: Service;
  ville: Ville;
  content: PageData | null;
  faqs: FaqItem[];
}

export default function ServiceCityContent({ service, ville, content, faqs }: Props) {
  const nearby = getNearbyVilles(ville.slug, 5);

  return (
    <>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className={styles.heroInner}>
          <div className={styles.badge}>{service.icon} {service.label}</div>
          <h1 className={styles.title}>
            {service.label}<br />
            <em>à {ville.ville}</em>
          </h1>
          <p className={styles.sub}>
            Technicien disponible 24h/7j à {ville.ville} ({ville.code_postal}).
            Intervention rapide, devis gratuit.
          </p>
          <a href={`tel:${PHONE_RAW}`} className="btn-primary">
            📞 {PHONE}
          </a>
        </div>
      </section>

      {/* Generated content or fallback */}
      {content?.content ? (
        <article className={styles.section}>
          <div className="container">
            <div
              className={styles.generatedContent}
              dangerouslySetInnerHTML={{ __html: content.content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, '') }}
            />
          </div>
        </article>
      ) : (
        <>
          <section className={styles.section}>
            <div className="container">
              <div className="section-label">Le problème</div>
              <h2 className="section-title">{service.label} bouché à {ville.ville} ?</h2>
              <div className={styles.textBlock}>
                <p>{service.description}</p>
              </div>
            </div>
          </section>

          <section className={styles.section} style={{ background: 'var(--navy-mid)' }}>
            <div className="container">
              <div className="section-label">Notre méthode</div>
              <h2 className="section-title">Comment on intervient</h2>
              <div className={styles.textBlock}>
                <p><strong>Méthode :</strong> {service.intervention}</p>
                <ul className={styles.problemList}>
                  {service.problems.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className="container">
              <div className="section-label">Tarif</div>
              <h2 className="section-title">Combien ça coûte ?</h2>
              <div className={styles.textBlock}>
                <p>Fourchette de prix : <strong>{service.priceRange}</strong>. Devis gratuit par téléphone avant toute intervention.</p>
              </div>
            </div>
          </section>
        </>
      )}

      <UrgenceBanner />

      {/* Nearby cities with same service */}
      <section className={styles.section}>
        <div className="container">
          <div className="section-label">Communes voisines</div>
          <h2 className="section-title">{service.label} près de {ville.ville}</h2>
          <div className={styles.villeTags}>
            <Link href={`/debouchage-${ville.slug}/`} className={styles.villeTag}>
              ← Tous les services à {ville.ville}
            </Link>
            {nearby.map((v) => (
              <Link
                key={v.slug}
                href={v.tier === 1
                  ? `/debouchage-${service.slug.replace('debouchage-', '')}-${v.slug}/`
                  : `/debouchage-${v.slug}/`
                }
                className={styles.villeTag}
              >
                {v.ville}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Faq faqs={faqs} ville={ville.ville} />
      <CtaFinal ville={ville.ville} />
    </>
  );
}
