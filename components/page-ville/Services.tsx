import { getAllServices } from '@/lib/data/services';
import styles from './Services.module.css';

interface Props {
  ville: string;
}

export default function Services({ ville }: Props) {
  const services = getAllServices().slice(0, 6);

  return (
    <section className={styles.services} id="services">
      <div className="container">
        <div className={styles.header}>
          <div className="section-label">Nos interventions</div>
          <h2 className="section-title">
            Ce qu&apos;on débouche<br />à {ville}
          </h2>
          <p className="section-desc">
            Canalisations, WC, éviers, baignoires ou égouts — nous intervenons sur
            tous types d&apos;obstructions avec le matériel adapté.
          </p>
        </div>
        <div className={styles.grid}>
          {services.map((s) => (
            <div key={s.slug} className={`${styles.card} reveal`}>
              <span className={styles.icon}>{s.icon}</span>
              <h3>{s.label}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
