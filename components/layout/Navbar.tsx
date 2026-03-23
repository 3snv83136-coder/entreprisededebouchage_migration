import Image from 'next/image';
import Link from 'next/link';
import { PHONE_RAW, NAV_BRAND_TITLE } from '@/lib/config';
import styles from './Navbar.module.css';

/** Deux lignes : tout sauf le dernier mot, puis dernier mot (lisibilité + césure propre). */
function splitBrandTitle(title: string): { line1: string; line2: string } {
  const t = title.trim();
  const last = t.lastIndexOf(' ');
  if (last <= 0) return { line1: t, line2: '' };
  return { line1: t.slice(0, last), line2: t.slice(last + 1) };
}

export default function Navbar() {
  const { line1, line2 } = splitBrandTitle(NAV_BRAND_TITLE);

  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/logo-edd.png"
          alt="Logo Entreprise de Débouchage, ventouse rouge."
          width={44}
          height={44}
          className={styles.logoImg}
          priority
        />
        <span className={styles.logoText} aria-label={NAV_BRAND_TITLE}>
          {line2 ? (
            <>
              <span className={styles.logoLine}>{line1}</span>
              <span className={styles.logoLine}>{line2}</span>
            </>
          ) : (
            <span className={styles.logoLine}>{line1}</span>
          )}
        </span>
      </Link>
      <a href={`tel:${PHONE_RAW}`} className={styles.cta}>
        📞 Appeler maintenant
      </a>
    </nav>
  );
}
