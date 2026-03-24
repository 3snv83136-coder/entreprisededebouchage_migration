import type { Metadata } from 'next';
import Link from 'next/link';
import { getIndexedQuestions } from '@/lib/data/questions';
import { BASE_URL, PHONE, PHONE_RAW } from '@/lib/config';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Questions fréquentes — Débouchage canalisation Var',
  description:
    'Réponses aux questions les plus posées sur le débouchage de canalisations dans le Var : prix, méthodes, qui appeler, produits efficaces. Par un pro depuis 2005.',
  alternates: { canonical: `${BASE_URL}/questions/` },
};

const TYPE_LABELS: Record<string, string> = {
  how: 'Guide',
  what: 'Comparatif',
  who: 'Responsabilités',
  how_expensive: 'Tarifs',
  definition: 'Définition',
  yesno: 'Vrai ou faux',
};

const TYPE_ICONS: Record<string, string> = {
  how: '🔧',
  what: '📊',
  who: '👤',
  how_expensive: '💰',
  definition: '📖',
  yesno: '✅',
};

export default function QuestionsPage() {
  const questions = getIndexedQuestions();

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Questions', item: `${BASE_URL}/questions/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={styles.page}>
        <section className={styles.hero}>
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
              <Link href="/" className={styles.breadcrumbLink}>Accueil</Link>
              <span aria-hidden="true"> › </span>
              <span>Questions</span>
            </nav>
            <h1 className={styles.title}>Questions fréquentes</h1>
            <p className={styles.sub}>
              Tout ce qu&apos;il faut savoir sur le débouchage de canalisations dans le Var — prix, méthodes, responsabilités, produits.
            </p>
          </div>
        </section>

        <section className={styles.list}>
          <div className="container">
            <div className={styles.grid}>
              {questions.map((q) => (
                <Link key={q.slug} href={`/questions/${q.slug}/`} className={styles.card}>
                  <div className={styles.cardType}>
                    <span className={styles.icon}>{TYPE_ICONS[q.typeQuestion] ?? '❓'}</span>
                    {TYPE_LABELS[q.typeQuestion] ?? q.typeQuestion}
                  </div>
                  <h2 className={styles.cardTitle}>{q.h1}</h2>
                  <p className={styles.cardIntro}>{q.intro.slice(0, 120)}…</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <div className={styles.ctaBox}>
              <p className={styles.ctaTitle}>Votre question n&apos;est pas dans la liste ?</p>
              <p className={styles.ctaDesc}>Appelez-nous, un technicien vous répond directement.</p>
              <a href={`tel:${PHONE_RAW}`} className="btn-primary">📞 {PHONE}</a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
