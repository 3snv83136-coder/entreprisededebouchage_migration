import { FaqItem } from '@/lib/types';
import styles from './Faq.module.css';

interface Props {
  faqs: FaqItem[];
  ville?: string;
}

export default function Faq({ faqs, ville }: Props) {
  return (
    <section className={styles.faq} id="faq">
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.sticky}>
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Questions fréquentes</h2>
            <p className="section-desc">
              Tout ce que vous devez savoir avant de nous appeler
              {ville ? ` à ${ville}` : ''}.
            </p>
          </div>
          <div className={styles.list}>
            {faqs.map((faq, i) => (
              <details key={i} className={styles.item} open={i === 0}>
                <summary className={styles.question}>
                  {faq.question}
                  <span className={styles.arrow}>+</span>
                </summary>
                <div className={styles.answer}>
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
