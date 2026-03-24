import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { BASE_URL, PHONE } from '@/lib/config';
import { getRealisationBySlug } from '@/lib/data/realisations';
import styles from './page.module.css';

export const revalidate = 3600;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const r = await getRealisationBySlug(slug);
  if (!r) return {};
  return {
    title: r.titre || r.meta_title || `${r.type} à ${r.ville} — ${r.mois} ${r.annee}`,
    description: r.meta_description,
    alternates: { canonical: `/realisations/${r.slug}/` },
    openGraph: {
      title: r.titre || r.meta_title || `${r.type} à ${r.ville}`,
      url: `${BASE_URL}/realisations/${r.slug}/`,
      ...(r.photo_apres_url && { images: [{ url: r.photo_apres_url }] }),
    },
  };
}

export default async function RealisationPage({ params }: Props) {
  const { slug } = await params;
  const r = await getRealisationBySlug(slug);
  if (!r) notFound();

  const schema = r.json_ld || {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${r.type} à ${r.ville} — ${r.mois} ${r.annee}`,
    description: r.meta_description,
    url: `${BASE_URL}/realisations/${r.slug}/`,
    ...(r.temoignage && {
      review: {
        '@type': 'Review',
        reviewBody: r.temoignage,
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      },
    }),
  };

  const texteIntervention = r.description_generee || r.resultat;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <article className={styles.page}>
        <div className={`container ${styles.inner}`}>
          <Breadcrumbs
            items={[
              { name: 'Accueil', href: '/' },
              { name: 'Réalisations', href: '/realisations/' },
              { name: `${r.type} — ${r.ville}`, href: `/realisations/${r.slug}/` },
            ]}
          />

          <header className={styles.header}>
            <span className={styles.badge}>{r.type}</span>
            <h1 className={styles.title}>{r.titre || `${r.type} à ${r.ville}`}</h1>
            <div className={styles.meta}>
              <span>📍 {r.ville}</span>
              <span>📅 {r.mois} {r.annee}</span>
              {r.duree && <span>⏱ {r.duree}</span>}
            </div>
          </header>

          {/* Photos avant/après */}
          {(r.photo_avant_url || r.photo_apres_url) && (
            <div className={styles.photos}>
              {r.photo_avant_url && (
                <div className={styles.photoWrapper}>
                  <span className={styles.photoLabel}>Avant</span>
                  <Image
                    src={r.photo_avant_url}
                    alt={`${r.type} à ${r.ville} — avant intervention`}
                    width={600}
                    height={400}
                    className={styles.photo}
                  />
                </div>
              )}
              {r.photo_apres_url && (
                <div className={styles.photoWrapper}>
                  <span className={`${styles.photoLabel} ${styles.photoLabelApres}`}>Après</span>
                  <Image
                    src={r.photo_apres_url}
                    alt={`${r.type} à ${r.ville} — après intervention`}
                    width={600}
                    height={400}
                    className={styles.photo}
                  />
                </div>
              )}
            </div>
          )}

          <div className={styles.sections}>

            {r.contexte && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Situation</h2>
                <p className={styles.sectionText}>{r.contexte}</p>
              </section>
            )}

            {r.diagnostic && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>Diagnostic</h2>
                <p className={styles.sectionText}>{r.diagnostic}</p>
              </section>
            )}

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Intervention</h2>
              <p className={styles.sectionText}>{r.intervention}</p>
            </section>

            <section className={`${styles.section} ${styles.sectionResultat}`}>
              <h2 className={styles.sectionTitle}>Résultat</h2>
              <p className={styles.sectionText}>{texteIntervention}</p>
            </section>

            {r.temoignage && (
              <blockquote className={styles.temoignage}>
                <p>{r.temoignage}</p>
                <cite>— Client à {r.ville}</cite>
              </blockquote>
            )}

          </div>

          {/* FAQ */}
          {r.faq && r.faq.length > 0 && (
            <section className={styles.faqSection}>
              <h2 className={styles.faqTitle}>Questions fréquentes</h2>
              <div className={styles.faqList}>
                {r.faq.map((item, i) => (
                  <details key={i} className={styles.faqItem}>
                    <summary className={styles.faqQuestion}>{item.question}</summary>
                    <p className={styles.faqAnswer}>{item.reponse}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          <div className={styles.links}>
            <Link href={`/${r.service_slug}/`} className={styles.linkPrimary}>
              En savoir plus sur le {r.type.toLowerCase()} →
            </Link>
            {r.ville_slug && (
              <Link href={`/debouchage-${r.ville_slug}/`} className={styles.linkSecondary}>
                Débouchage à {r.ville} →
              </Link>
            )}
          </div>

          <div className={styles.cta}>
            <p>Même problème ? On intervient dans les 2h.</p>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className={styles.ctaBtn}>
              📞 {PHONE}
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
