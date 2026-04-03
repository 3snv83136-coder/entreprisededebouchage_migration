import styles from './Arguments.module.css';

const args = [
  { num: '01', icon: '⚡', title: 'Moins d\'1 heure', text: 'Nos techniciens sont positionnés dans les Bouches-du-Rhône pour garantir le délai d\'intervention minimal, même aux heures de pointe.' },
  { num: '02', icon: '🕐', title: 'Disponible 24h/7j', text: 'Week-ends, jours fériés, nuits — nous répondons à toute heure. Une urgence n\'attend pas, notre équipe non plus.' },
  { num: '03', icon: '💶', title: 'Prix fixe annoncé', text: 'Le tarif est confirmé par téléphone avant toute intervention. Aucune surprise sur la facture finale. Devis gratuit.' },
];

export default function Arguments() {
  return (
    <section className={styles.arguments} id="arguments">
      <div className="container">
        <div className="section-label">Pourquoi nous ?</div>
        <h2 className="section-title">3 raisons de nous choisir</h2>
        <div className={styles.grid}>
          {args.map((a) => (
            <div key={a.num} className={`${styles.card} reveal`}>
              <div className={styles.num}>{a.num}</div>
              <span className={styles.icon}>{a.icon}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
