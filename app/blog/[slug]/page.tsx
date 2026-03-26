import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug } from '@/lib/data/articles';
import { COMPANY_NAME, BASE_URL, PHONE, PHONE_RAW } from '@/lib/config';
import styles from './page.module.css';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return { title: 'Article introuvable' };
  }

  return {
    title: article.titre,
    description: article.description,
    alternates: { canonical: `/blog/${article.slug}/` },
    openGraph: {
      title: article.titre,
      description: article.description,
      url: `${BASE_URL}/blog/${article.slug}/`,
      type: 'article',
      publishedTime: article.date,
      authors: [article.auteur],
    },
  };
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.titre,
    description: article.description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      '@type': 'Person',
      name: article.auteur,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY_NAME,
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo-edd.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${article.slug}/`,
    },
    keywords: article.tags.join(', '),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className={styles.page}>
        <div className={`container ${styles.inner}`}>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
            <Link href="/" className={styles.breadcrumbLink}>Accueil</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
            <Link href="/blog/" className={styles.breadcrumbLink}>Blog</Link>
            <span className={styles.breadcrumbSep} aria-hidden="true">›</span>
            <span className={styles.breadcrumbCurrent}>{article.titre}</span>
          </nav>

          {/* Header */}
          <header className={styles.header}>
            <div className={styles.headerMeta}>
              <span className={styles.categorieTag}>
                {article.categorieSlug === 'guide' ? 'Guide' : 'Conseils'}
              </span>
              <span className={styles.readTime}>
                {article.tempsLecture} min de lecture
              </span>
            </div>

            <h1 className={styles.title}>{article.titre}</h1>
            <p className={styles.description}>{article.description}</p>

            <div className={styles.articleMeta}>
              <span className={styles.metaAuteur}>{article.auteur}</span>
              <span className={styles.metaSep}>·</span>
              <time className={styles.metaDate} dateTime={article.date}>
                {formatDate(article.date)}
              </time>
            </div>

            <div className={styles.tags}>
              {article.tags.map((tag) => (
                <span key={tag} className={styles.tagItem}>
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Content */}
          <div
            className={styles.prose}
            dangerouslySetInnerHTML={{ __html: article.contenu }}
          />

          {/* CTA final */}
          <div className={styles.ctaBox}>
            <div className={styles.ctaContent}>
              <p className={styles.ctaTitle}>Un problème de canalisation dans le Var ?</p>
              <p className={styles.ctaDesc}>
                Notre technicien intervient 24h/7j sur Toulon, Hyères et tout le département du Var (83).
                Devis gratuit, intervention rapide.
              </p>
              <a href={`tel:${PHONE_RAW}`} className="btn-primary">
                Appeler maintenant
              </a>
            </div>
          </div>

          {/* Back link */}
          <div className={styles.backLink}>
            <Link href="/blog/" className={styles.backLinkAnchor}>
              ← Retour au blog
            </Link>
          </div>

        </div>
      </article>
    </>
  );
}
