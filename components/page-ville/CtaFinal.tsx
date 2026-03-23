import { PHONE, PHONE_RAW } from '@/lib/config';
import styles from './CtaFinal.module.css';

interface Props {
  ville?: string;
}

export default function CtaFinal({ ville }: Props) {
  return (
    <section className={styles.cta}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          On s&apos;en occupe<br />maintenant.
        </h2>
        <p className={styles.desc}>
          Devis gratuit · Intervention en moins d&apos;1h · Disponible 24h/7j
          {ville ? ` à ${ville}` : ''}
        </p>
        <div className={styles.actions}>
          <a href={`tel:${PHONE_RAW}`} className={styles.btnDark}>
            📞 Appeler maintenant
          </a>
        </div>
        <a href={`tel:${PHONE_RAW}`} className={styles.phone}>
          {PHONE}
        </a>
      </div>
    </section>
  );
}
