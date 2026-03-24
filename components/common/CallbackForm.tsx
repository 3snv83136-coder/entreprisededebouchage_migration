'use client';
import { useEffect, useState } from 'react';
import styles from './CallbackForm.module.css';

export default function CallbackForm() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    const body = encodeURIComponent(`Bonjour, je suis ${name} (${phone}). Je souhaite être rappelé pour un débouchage. Merci.`);
    window.location.href = `sms:0627699134?body=${body}`;
    setSent(true);
    setTimeout(() => { setSent(false); setOpen(false); setName(''); setPhone(''); }, 4000);
  }

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('edd:open-callback', onOpen);
    return () => window.removeEventListener('edd:open-callback', onOpen);
  }, []);

  return (
    <>
      {/* Floating button — desktop only */}
      {!open && (
        <button className={styles.trigger} onClick={() => setOpen(true)} aria-label="Demander un rappel">
          <span className={styles.triggerPulse} />
          <svg className={styles.triggerIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className={styles.triggerLabel}>Rappel gratuit</span>
        </button>
      )}

      {/* Panel */}
      {open && (
        <div className={styles.panel}>
          <button className={styles.close} onClick={() => setOpen(false)} aria-label="Fermer">×</button>

          {!sent ? (
            <>
              <div className={styles.header}>
                <div className={styles.urgenceBadge}>
                  <span className={styles.dot} />
                  Technicien disponible
                </div>
                <h3 className={styles.title}>On vous rappelle<br />en 2 minutes</h3>
                <p className={styles.subtitle}>Gratuit · Sans engagement · 24h/7j</p>
              </div>

              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="cb-name">Votre prénom</label>
                  <input
                    id="cb-name"
                    className={styles.input}
                    type="text"
                    placeholder="Jean"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="given-name"
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="cb-phone">Votre numéro</label>
                  <input
                    id="cb-phone"
                    className={styles.input}
                    type="tel"
                    placeholder="06 00 00 00 00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoComplete="tel"
                  />
                </div>
                <button type="submit" className={styles.submit}>
                  📞 Rappel immédiat
                </button>
                <p className={styles.legal}>
                  Vos données ne sont utilisées que pour vous rappeler. Aucun spam.
                </p>
              </form>
            </>
          ) : (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3 className={styles.title}>C&apos;est noté !</h3>
              <p className={styles.subtitle}>On vous rappelle dans 2 minutes, {name}.</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
