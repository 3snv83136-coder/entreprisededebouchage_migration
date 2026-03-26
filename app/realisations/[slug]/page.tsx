import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import LinkedText from '@/components/realisations/LinkedText';
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
  };

  // Article continu (enrichi) ou fallback sur brut
  const articleText = r.description_generee || r.contexte || r.resultat;

  // Resume 4 sections
  const contexteText = r.contexte_enrichi || r.contexte;
  const diagnosticText = r.diagnostic_enrichi || r.diagnostic;
  const interventionText = r.intervention_enrichie || r.intervention;
  const resultatText = r.resultat_enrichi || r.resultat;

  const serviceHref = `/${r.service_slug}/`;

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
              {r.materiels && <span>🔧 {r.materiels}</span>}
            </div>
          </header>

          {/* Photos avant/apres — remontees juste apres header */}
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

          {/* Article continu — coeur de la page */}
          <section className={styles.article}>
            <LinkedText
              text={articleText}
              excludeHref={serviceHref}
              className={styles.articleText}
            />
          </section>

          {/* Resume 4 points */}
          <div className={styles.resumeGrid}>
            {contexteText && (
              <div className={styles.resumeCard}>
                <div className={styles.resumeNum}>1</div>
                <h3 className={styles.resumeTitle}>Situation</h3>
                <p className={styles.resumeText}>{contexteText}</p>
              </div>
            )}
            {diagnosticText && (
              <div className={styles.resumeCard}>
                <div className={styles.resumeNum}>2</div>
                <h3 className={styles.resumeTitle}>Diagnostic</h3>
                <p className={styles.resumeText}>{diagnosticText}</p>
              </div>
            )}
            {interventionText && (
              <div className={styles.resumeCard}>
                <div className={styles.resumeNum}>3</div>
                <h3 className={styles.resumeTitle}>Intervention</h3>
                <p className={styles.resumeText}>{interventionText}</p>
              </div>
            )}
            {resultatText && (
              <div className={`${styles.resumeCard} ${styles.resumeCardResultat}`}>
                <div className={styles.resumeNum}>4</div>
                <h3 className={styles.resumeTitle}>Résultat</h3>
                <p className={styles.resumeText}>{resultatText}</p>
              </div>
            )}
          </div>

          {/* Temoignage */}
          {r.temoignage && (
            <blockquote className={styles.temoignage}>
              <p>{r.temoignage}</p>
              <cite>— Client à {r.ville}</cite>
            </blockquote>
          )}

          {/* FAQ accordeon */}
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
            <Link href={serviceHref} className={styles.linkPrimary}>
              En savoir plus sur le {r.type.toLowerCase()} →
            </Link>
            {r.ville_slug && (
              <Link href={`/debouchage-${r.ville_slug}/`} className={styles.linkSecondary}>
                Débouchage à {r.ville} →
              </Link>
            )}
          </div>

          <div className={styles.signature}>
            {r.intervenant && <span className={styles.signatureIntervenant}>Intervention realisee par {r.intervenant}</span>}
            <strong>Christophe Allard</strong>
            <span>Expert en assainissement — Entreprise de Debouchage</span>
          </div>

          <div className={styles.cta}>
            <p>Meme probleme ? On intervient rapidement.</p>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`} className={styles.ctaBtn}>
              Appeler maintenant
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
