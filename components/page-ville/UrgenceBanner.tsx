import { PHONE, PHONE_RAW } from '@/lib/config';
import styles from './UrgenceBanner.module.css';

export default function UrgenceBanner() {
  return (
    <div className={styles.urgence}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2>
            Canalisation bouchée ?<br />N&apos;attendez pas.
          </h2>
          <p>Chaque heure qui passe aggrave le problème. Appelez maintenant.</p>
        </div>
        <a href={`tel:${PHONE_RAW}`} className={styles.phone}>
          {PHONE}
        </a>
      </div>
    </div>
  );
}
