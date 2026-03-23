import { PHONE, PHONE_RAW } from '@/lib/config';
import styles from './Topbar.module.css';

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      🚨 Urgence bouchon ? Appelez maintenant :{' '}
      <a href={`tel:${PHONE_RAW}`}>{PHONE}</a> — Disponible 24h/7j
    </div>
  );
}
