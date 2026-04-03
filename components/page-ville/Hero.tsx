import Image from 'next/image';
import { Ville } from '@/lib/types';
import { PHONE_RAW } from '@/lib/config';
import styles from './Hero.module.css';

interface Props {
  ville: Ville;
}

export default function Hero({ ville }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.bg} />
      <Image
        src="/images/hero.jpg"
        alt="Technicien debouchage Bouches-du-Rhône"
        fill
        className={styles.bgPhoto}
        priority
        sizes="100vw"
      />
      <div className={styles.bgOverlay} />
      <div className={styles.grid} />
      <div className={styles.inner}>
        <div className={styles.badge}>Disponible maintenant</div>
        <h1 className={styles.title}>
          Debouchage<br />
          <em>{ville.ville}</em>
          {ville.code_postal}
        </h1>
        <p className={styles.sub}>
          Intervention rapide sur {ville.ville} et les Bouches-du-Rhône.
          Technicien qualifie, devis gratuit, garanti sans surprise.
        </p>
        <div className={styles.actions}>
          <a href={`tel:${PHONE_RAW}`} className="btn-primary">
            Appeler maintenant
          </a>
          <a href="#services" className="btn-secondary">
            Voir nos services
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNum}>24/7</div>
            <div className={styles.statLabel}>Disponibilite</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>0&euro;</div>
            <div className={styles.statLabel}>Devis deplacement</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>19 ans</div>
            <div className={styles.statLabel}>Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
