import Link from 'next/link';
import { getAllRealisations } from '@/lib/data/realisations';
import ActionButtons from './ActionButtons';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: Promise<{ enriched?: string; error?: string; deleted?: string }>;
}

export default async function AdminRealisationsPage({ searchParams }: Props) {
  const { enriched, error, deleted } = await searchParams;
  const realisations = await getAllRealisations();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Réalisations ({realisations.length})</h1>
        <Link href="/admin" className={styles.addBtn}>+ Nouvelle</Link>
      </div>

      {deleted && (
        <div className={styles.banner + ' ' + styles.bannerSuccess}>
          ✓ Réalisation supprimée.
        </div>
      )}
      {enriched && (
        <div className={styles.banner + ' ' + styles.bannerSuccess}>
          ✓ Réalisation enrichie avec succès !
        </div>
      )}
      {error && (
        <div className={styles.banner + ' ' + styles.bannerError}>
          Erreur lors de l&apos;enrichissement.
        </div>
      )}

      {realisations.length === 0 ? (
        <p className={styles.empty}>Aucune réalisation pour l&apos;instant.</p>
      ) : (
        <div className={styles.list}>
          {realisations.map((r) => {
            const hasEnrichment = !!(r.description_generee && r.description_generee !== r.contexte);
            return (
              <div key={r.id} className={styles.card}>
                <div className={styles.cardMain}>
                  <div className={styles.cardTitle}>{r.type}</div>
                  <div className={styles.cardMeta}>
                    📍 {r.ville}{r.code_postal ? ` (${r.code_postal})` : ''} · 📅 {r.mois} {r.annee}
                    {r.duree && ` · ⏱ ${r.duree}`}
                  </div>
                  <div className={styles.badges}>
                    {r.publiee !== false && (
                      <span className={`${styles.badge} ${styles.badgePublie}`}>Publié</span>
                    )}
                    {hasEnrichment ? (
                      <span className={`${styles.badge} ${styles.badgeIA}`}>IA ✓</span>
                    ) : (
                      <span className={`${styles.badge} ${styles.badgeNoIA}`}>Sans IA</span>
                    )}
                    {r.email_envoye && (
                      <span className={`${styles.badge} ${styles.badgeEmail}`}>Email ✓</span>
                    )}
                    {r.photo_avant_url && (
                      <span className={`${styles.badge} ${styles.badgePhoto}`}>📷 Avant</span>
                    )}
                    {r.photo_apres_url && (
                      <span className={`${styles.badge} ${styles.badgePhoto}`}>📷 Après</span>
                    )}
                  </div>
                </div>
                <ActionButtons
                  id={r.id!}
                  slug={r.slug}
                  hasEnrichment={hasEnrichment}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
