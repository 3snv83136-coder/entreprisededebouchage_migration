'use client';

import styles from './Navbar.module.css';

export default function NavbarCallbackButton() {
  return (
    <button
      type="button"
      className={styles.ctaRappel}
      onClick={() => window.dispatchEvent(new CustomEvent('edd:open-callback'))}
      aria-label="Demander un rappel gratuit"
    >
      Rappel gratuit
    </button>
  );
}
