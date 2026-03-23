import Link from 'next/link';
import { PHONE_RAW, COMPANY_NAME } from '@/lib/config';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" className={styles.logo}>
        Débouchage<span>Pro</span>
      </Link>
      <a href={`tel:${PHONE_RAW}`} className={styles.cta}>
        📞 Appeler maintenant
      </a>
    </nav>
  );
}
