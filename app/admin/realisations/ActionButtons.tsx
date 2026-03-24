'use client';

import { deleteRealisation, reEnrichirRealisation } from '../actions';
import styles from './page.module.css';

interface Props {
  id: string;
  slug: string;
  hasEnrichment: boolean;
}

export default function ActionButtons({ id, slug, hasEnrichment }: Props) {
  return (
    <div className={styles.cardActions}>
      <a
        href={`/realisations/${slug}/`}
        target="_blank"
        className={styles.viewBtn}
      >
        Voir →
      </a>
      {!hasEnrichment && (
        <form action={reEnrichirRealisation.bind(null, id)}>
          <button type="submit" className={styles.enrichBtn}>
            ✨ Enrichir
          </button>
        </form>
      )}
      <form action={deleteRealisation.bind(null, id)}>
        <button
          type="submit"
          className={styles.deleteBtn}
          onClick={(e) => {
            if (!confirm('Supprimer cette réalisation ?')) e.preventDefault();
          }}
        >
          Suppr.
        </button>
      </form>
    </div>
  );
}
