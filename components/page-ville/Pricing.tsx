import styles from './Pricing.module.css';

export default function Pricing() {
  return (
    <section className={styles.section}>
      <div className="container">
        <h2 className={styles.title}>Nos tarifs a <span style={{ color: 'var(--orange)' }}>prix fixe</span></h2>
        <div className={styles.grid}>
          <div className={styles.card} data-callback>
            <h3 className={styles.cardTitle}>Debouchage Manuel</h3>
            <p className={styles.cardDesc}>Evier, WC, Douche</p>
            <div className={styles.price}>110<span>&euro;</span></div>
          </div>
          <div className={`${styles.card} ${styles.cardPopular}`} data-callback>
            <div className={styles.badge}>Le + demande</div>
            <h3 className={styles.cardTitle}>Haute Pression</h3>
            <p className={styles.cardDesc}>Hydrocurage technique</p>
            <div className={styles.price}>249<span>&euro;</span></div>
          </div>
          <div className={styles.card} data-callback>
            <h3 className={styles.cardTitle}>Inspection Camera</h3>
            <p className={styles.cardDesc}>Diagnostic video complet</p>
            <div className={styles.price}>180<span>&euro;</span></div>
          </div>
        </div>
        <p className={styles.note}>Deplacement inclus &amp; Devis gratuit</p>
        <script dangerouslySetInnerHTML={{ __html: `
          document.querySelectorAll('[data-callback]').forEach(function(card) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
              window.dispatchEvent(new Event('edd:open-callback'));
            });
          });
        `}} />
      </div>
    </section>
  );
}
