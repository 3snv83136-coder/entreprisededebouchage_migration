import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/lib/data/articles';
import { COMPANY_NAME, BASE_URL } from '@/lib/config';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Blog débouchage Var — Conseils et guides',
  description:
    'Conseils d\'expert pour vos canalisations dans le Var (83). Guides, comparatifs et astuces de techniciens en débouchage depuis 19 ans.',
  alternates: { canonical: '/blog/' },
  openGraph: {
    title: 'Blog débouchage Var — Conseils et guides',
    url: `${BASE_URL}/blog/`,
  },
};

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogPage() {
  const articles = getAllArticles();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Blog débouchage Var — Conseils et guides',
    url: `${BASE_URL}/blog/`,
    numberOfItems: articles.length,
    itemListElement: articles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${BASE_URL}/blog/${article.slug}/`,
      name: article.titre,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className="section-label">Blog &amp; Conseils</p>
          <h1 className={`section-title ${styles.heroTitle}`}>
            Guides et conseils<br />débouchage Var
          </h1>
          <p className={`section-desc ${styles.heroDesc}`}>
            Des articles techniques rédigés par nos techniciens avec 19 ans d&apos;expérience
            dans le Var (83). Guides pratiques, comparatifs et conseils préventifs.
          </p>
        </div>
      </section>

      <section className={styles.listing}>
        <div className={`container ${styles.listingInner}`}>
          <div className={styles.grid}>
            {articles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}/`}
                className={styles.card}
              >
                <div className={styles.cardTop}>
                  <span className={styles.cardTag}>
                    {article.categorieSlug === 'guide' ? 'Guide' : 'Conseils'}
                  </span>
                  <span className={styles.cardTime}>
                    {article.tempsLecture} min de lecture
                  </span>
                </div>
                <h2 className={styles.cardTitle}>{article.titre}</h2>
                <p className={styles.cardDesc}>{article.description}</p>
                <div className={styles.cardFooter}>
                  <time className={styles.cardDate} dateTime={article.date}>
                    {formatDate(article.date)}
                  </time>
                  <span className={styles.cardLink}>Lire l&apos;article →</span>
                </div>
                <div className={styles.cardTags}>
                  {article.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className={styles.cardTagItem}>
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={`container ${styles.ctaInner}`}>
          <p className={styles.ctaText}>
            Un problème urgent ? Appelez directement notre technicien.
          </p>
          <a href="tel:0627699134" className="btn-primary">
            📞 06 27 69 91 34
          </a>
        </div>
      </section>
    </>
  );
}
