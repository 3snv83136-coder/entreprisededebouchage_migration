import Link from 'next/link';
import { generateSchemaBreadcrumbs } from '@/lib/seo/schema';
import styles from './Breadcrumbs.module.css';

interface Props {
  items: { name: string; href: string }[];
}

export default function Breadcrumbs({ items }: Props) {
  const schema = generateSchemaBreadcrumbs(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav className={styles.breadcrumbs} aria-label="Fil d'ariane">
        {items.map((item, i) => (
          <span key={item.href}>
            {i > 0 && <span className={styles.separator}>/</span>}
            {i < items.length - 1 ? (
              <Link href={item.href}>{item.name}</Link>
            ) : (
              <span className={styles.current}>{item.name}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
