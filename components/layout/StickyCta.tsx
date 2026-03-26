'use client';
import { PHONE_RAW } from '@/lib/config';
import { useStickyCta } from '@/hooks/useStickyCta';
import styles from './StickyCta.module.css';

export default function StickyCta() {
  const visible = useStickyCta();

  return (
    <div className={`${styles.sticky} ${visible ? styles.visible : ''}`}>
      <div className={styles.inner}>
        <span className={styles.text}>Urgence debouchage ?</span>
        <a href={`tel:${PHONE_RAW}`} className={styles.link}>
          Appeler maintenant
        </a>
      </div>
    </div>
  );
}
