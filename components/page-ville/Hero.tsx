import Image from 'next/image';
import { Ville } from '@/lib/types';
import { PHONE, PHONE_RAW } from '@/lib/config';
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
        alt="Technicien debouchage Var"
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
          Intervention d&apos;urgence en moins d&apos;une heure sur {ville.ville} et le Var.
          Technicien qualifié, devis gratuit, garanti sans surprise.
        </p>
        <div className={styles.actions}>
          <a href={`tel:${PHONE_RAW}`} className="btn-primary">
            📞 {PHONE}
          </a>
          <a href="#services" className="btn-secondary">
            Voir nos services ↓
          </a>
        </div>
        <a href={`tel:${PHONE_RAW}`} className={styles.phone}>
          <span className={styles.phoneLabel}>Numéro d&apos;urgence</span>
          {PHONE}
        </a>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <div className={styles.statNum}>&lt;1H</div>
            <div className={styles.statLabel}>Délai intervention</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>24/7</div>
            <div className={styles.statLabel}>Disponibilité</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statNum}>0€</div>
            <div className={styles.statLabel}>Devis déplacement</div>
          </div>
        </div>
      </div>
    </section>
  );
}
