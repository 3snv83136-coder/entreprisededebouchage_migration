import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllQuestions, getQuestionBySlug } from '@/lib/data/questions';
import { BASE_URL, PHONE, PHONE_RAW, COMPANY_NAME } from '@/lib/config';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllQuestions().map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const q = getQuestionBySlug(slug);
  if (!q) return { title: 'Page introuvable' };
  return {
    title: q.titre,
    description: q.metaDesc
      .replace(/\{PRIX_MANUEL\}/g, process.env.NEXT_PUBLIC_PRIX_MANUEL ?? '110')
      .replace(/\{PRIX_HAUTE_PRESSION\}/g, process.env.NEXT_PUBLIC_PRIX_HAUTE_PRESSION ?? '249')
      .replace(/\{PRIX_CAMERA\}/g, process.env.NEXT_PUBLIC_PRIX_CAMERA ?? '110'),
    alternates: { canonical: `/questions/${q.slug}/` },
    robots: q.noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

const TYPE_LABELS: Record<string, string> = {
  how: 'Guide pratique',
  what: 'Comparatif',
  who: 'Qui & responsabilités',
  how_expensive: 'Tarifs',
  definition: 'Définition',
  yesno: 'Vrai ou faux',
};

export default async function QuestionPage({ params }: Props) {
  const { slug } = await params;
  const q = getQuestionBySlug(slug);
  if (!q) notFound();

  const prixManuel = process.env.NEXT_PUBLIC_PRIX_MANUEL ?? '110';
  const prixHautePression = process.env.NEXT_PUBLIC_PRIX_HAUTE_PRESSION ?? '249';
  const prixCamera = process.env.NEXT_PUBLIC_PRIX_CAMERA ?? '110';

  const rv = (text: string) =>
    text
      .replace(/\{PRIX_MANUEL\}/g, prixManuel)
      .replace(/\{PRIX_HAUTE_PRESSION\}/g, prixHautePression)
      .replace(/\{PRIX_CAMERA\}/g, prixCamera)
      .replace(/\{TELEPHONE_DB\}/g, PHONE);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: q.faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: rv(f.r) },
    })),
  };

  const howtoSchema =
    q.typeQuestion === 'how'
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: q.h1,
          step: q.sections.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.heading,
            text: rv(s.body),
          })),
        }
      : null;

  const definedTermSchema =
    q.typeQuestion === 'definition'
      ? {
          '@context': 'https://schema.org',
          '@type': 'DefinedTerm',
          name: q.h1,
          description: rv(q.intro),
          inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: 'Lexique Assainissement',
            url: `${BASE_URL}/questions/`,
          },
        }
      : null;

  const serviceSchema =
    q.typeQuestion === 'how_expensive'
      ? {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: q.titre,
          provider: { '@type': 'Plumber', name: COMPANY_NAME, url: BASE_URL },
          areaServed: { '@type': 'AdministrativeArea', name: 'Var' },
          offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            price: prixManuel,
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: prixManuel,
              maxPrice: prixHautePression,
              priceCurrency: 'EUR',
            },
          },
        }
      : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Questions', item: `${BASE_URL}/questions/` },
      { '@type': 'ListItem', position: 3, name: q.h1, item: `${BASE_URL}/questions/${q.slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {howtoSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howtoSchema) }} />
      )}
      {definedTermSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSchema) }} />
      )}
      {serviceSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <article className={styles.page}>
        <div className={`container ${styles.inner}`}>
          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
            <Link href="/" className={styles.breadcrumbLink}>Accueil</Link>
            <span className={styles.sep} aria-hidden="true">›</span>
            <Link href="/questions/" className={styles.breadcrumbLink}>Questions</Link>
            <span className={styles.sep} aria-hidden="true">›</span>
            <span className={styles.breadcrumbCurrent}>{q.h1}</span>
          </nav>

          {/* Header */}
          <header className={styles.header}>
            <div className={styles.typeTag}>{TYPE_LABELS[q.typeQuestion] ?? q.typeQuestion}</div>
            <h1 className={styles.title}>{q.h1}</h1>
            <p className={styles.intro}>{rv(q.intro)}</p>
          </header>

          {/* Sections */}
          <div className={styles.content}>
            {q.sections.map((s, i) => (
              <div key={i} className={styles.section}>
                <h2 className={styles.sectionTitle}>{s.heading}</h2>
                <p className={styles.sectionBody}>{rv(s.body)}</p>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className={styles.faq}>
            <h2 className={styles.faqTitle}>Questions fréquentes</h2>
            {q.faq.map((f, i) => (
              <div key={i} className={styles.faqItem}>
                <h3 className={styles.faqQ}>{f.q}</h3>
                <p className={styles.faqA}>{rv(f.r)}</p>
              </div>
            ))}
          </div>

          {/* Liens internes */}
          {(q.servicesCta.length > 0 || q.villesCta.length > 0) && (
            <div className={styles.links}>
              <p className={styles.linksTitle}>Nos services et zones d&apos;intervention :</p>
              <div className={styles.chips}>
                {q.servicesCta.map((href) => {
                  const label = href.replace(/\//g, '').replace(/-/g, ' ');
                  return (
                    <Link key={href} href={href} className={styles.chip}>
                      {label}
                    </Link>
                  );
                })}
                {q.villesCta.map((href) => {
                  const label = href.replace(/\/debouchage-/g, '').replace(/\//g, '').replace(/-/g, ' ');
                  return (
                    <Link key={href} href={href} className={`${styles.chip} ${styles.chipVille}`}>
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className={styles.ctaBox}>
            <p className={styles.ctaTitle}>Un problème de canalisation dans les Bouches-du-Rhône ?</p>
            <p className={styles.ctaDesc}>
              Notre technicien intervient 24h/7j sur Marseille, Aubagne et tout le département des Bouches-du-Rhône (13).
              Devis gratuit, intervention rapide.
            </p>
            <a href={`tel:${PHONE_RAW}`} className="btn-primary">
              Appeler maintenant
            </a>
          </div>
        </div>
      </article>
    </>
  );
}
