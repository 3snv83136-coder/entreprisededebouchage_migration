'use client';
import { useRouter, usePathname } from 'next/navigation';
import styles from './BackButton.module.css';

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Ne pas afficher sur la page d'accueil
  if (pathname === '/') return null;

  return (
    <button
      className={styles.btn}
      onClick={() => router.back()}
      aria-label="Retour en arrière"
    >
      ← Retour
    </button>
  );
}
