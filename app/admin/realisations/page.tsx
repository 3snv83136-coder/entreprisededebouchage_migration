import Link from 'next/link';
import { getAllRealisations } from '@/lib/data/realisations';
import { deleteRealisation } from '../actions';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

export default async function AdminRealisationsPage() {
  const realisations = await getAllRealisations();

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Réalisations ({realisations.length})</h1>
        <Link href="/admin" className={styles.addBtn}>+ Nouvelle</Link>
      </div>

      {realisations.length === 0 ? (
        <p className={styles.empty}>Aucune réalisation pour l&apos;instant.</p>
      ) : (
        <div className={styles.list}>
          {realisations.map((r) => (
            <div key={r.id} className={styles.card}>
              <div className={styles.cardMain}>
                <div className={styles.cardTitle}>{r.type}</div>
                <div className={styles.cardMeta}>
                  📍 {r.ville} · 📅 {r.mois} {r.annee}
                  {r.duree && ` · ⏱ ${r.duree}`}
                </div>
                <div className={styles.badges}>
                  {r.publiee !== false && (
                    <span className={`${styles.badge} ${styles.badgePublie}`}>Publié</span>
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
              <div className={styles.cardActions}>
                <Link
                  href={`/realisations/${r.slug}/`}
                  target="_blank"
                  className={styles.viewBtn}
                >
                  Voir →
                </Link>
                <form action={deleteRealisation.bind(null, r.id!)}>
                  <button type="submit" className={styles.deleteBtn} onClick={(e) => {
                    if (!confirm('Supprimer cette réalisation ?')) e.preventDefault();
                  }}>
                    Supprimer
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
