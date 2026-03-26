import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { COMPANY_NAME, BASE_URL } from '@/lib/config';
import { getAllRealisations } from '@/lib/data/realisations';
import styles from './page.module.css';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: `Nos réalisations — ${COMPANY_NAME}`,
  description: `Découvrez les interventions réalisées par ${COMPANY_NAME} dans le Var (83). Débouchages, fosses septiques, canalisations — des cas concrets avec résultats.`,
  alternates: { canonical: '/realisations/' },
  openGraph: {
    title: `Nos réalisations — ${COMPANY_NAME}`,
    url: `${BASE_URL}/realisations/`,
  },
};

export default async function RealisationsPage() {
  const realisations = await getAllRealisations();

  return (
    <article className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <Breadcrumbs
          items={[
            { name: 'Accueil', href: '/' },
            { name: 'Réalisations', href: '/realisations/' },
          ]}
        />

        <h1 className={styles.title}>Nos réalisations</h1>
        <p className={styles.lead}>
          Des interventions réelles, dans le Var.{' '}
          <strong style={{ color: 'var(--white)' }}>{realisations.length} réalisation{realisations.length > 1 ? 's' : ''}</strong>{' '}
          documentées avec contexte, méthode et résultat.
        </p>

        {realisations.length === 0 ? (
          <p className={styles.empty}>Aucune réalisation pour l&apos;instant. Revenez bientôt.</p>
        ) : (
          <div className={styles.grid}>
            {realisations.map((r) => (
              <Link key={r.slug} href={`/realisations/${r.slug}/`} className={styles.card}>
                {r.photo_apres_url && (
                  <div className={styles.cardImageWrapper}>
                    <Image
                      src={r.photo_apres_url}
                      alt={`${r.type} à ${r.ville}`}
                      width={400}
                      height={225}
                      className={styles.cardImage}
                    />
                  </div>
                )}
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardBadge}>{r.type}</span>
                    <span className={styles.cardDate}>{r.mois} {r.annee}</span>
                  </div>
                  <h2 className={styles.cardTitle}>
                    {r.type} à {r.ville}
                  </h2>
                  <p className={styles.cardResultat}>
                    {(() => {
                      const text = r.description_generee || r.resultat;
                      return text.length > 150 ? text.slice(0, 150) + '…' : text;
                    })()}
                  </p>
                  <div className={styles.cardFooter}>
                    {r.duree && <span>⏱ {r.duree}</span>}
                    {r.temoignage && <span>Temoignage client</span>}
                    <span className={styles.cardLink}>Voir →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className={styles.cta}>
          <p>Besoin d&apos;une intervention similaire ?</p>
          <Link href="/nos-prestations/">Voir toutes nos prestations →</Link>
        </div>
      </div>
    </article>
  );
}
