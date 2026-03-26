import { PHONE_RAW } from '@/lib/config';
import styles from './UrgenceBanner.module.css';

export default function UrgenceBanner() {
  return (
    <div className={styles.urgence}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <h2>
            Canalisation bouchee ?<br />N&apos;attendez pas.
          </h2>
          <p>Chaque heure qui passe aggrave le probleme. Appelez maintenant.</p>
        </div>
        <a href={`tel:${PHONE_RAW}`} className={styles.phone}>
          Appeler maintenant
        </a>
      </div>
    </div>
  );
}
