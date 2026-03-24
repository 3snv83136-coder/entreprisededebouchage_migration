import styles from './Pricing.module.css';

export default function Pricing() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Nos tarifs à <span style={{ color: 'var(--orange)' }}>prix fixe</span></h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Debouchage Manuel</h3>
            <p className={styles.cardDesc}>Évier, WC, Douche</p>
            <div className={styles.price}>99<span>€</span></div>
          </div>
          <div className={`${styles.card} ${styles.cardPopular}`}>
            <div className={styles.badge}>Le + demandé</div>
            <h3 className={styles.cardTitle}>Haute Pression</h3>
            <p className={styles.cardDesc}>Hydrocurage technique</p>
            <div className={styles.price}>199<span>€</span></div>
          </div>
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>Inspection Caméra</h3>
            <p className={styles.cardDesc}>Diagnostic vidéo complet</p>
            <div className={styles.price}>110<span>€</span></div>
          </div>
        </div>
        <p className={styles.note}>Déplacement inclus &amp; Devis gratuit</p>
      </div>
    </section>
  );
}
