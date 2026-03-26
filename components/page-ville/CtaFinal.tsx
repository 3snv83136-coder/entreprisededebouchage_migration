import { PHONE_RAW } from '@/lib/config';
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
          Devis gratuit · Intervention rapide · Disponible 24h/7j
          {ville ? ` a ${ville}` : ''}
        </p>
        <div className={styles.actions}>
          <a href={`tel:${PHONE_RAW}`} className={styles.btnDark}>
            Appeler maintenant
          </a>
        </div>
      </div>
    </section>
  );
}
