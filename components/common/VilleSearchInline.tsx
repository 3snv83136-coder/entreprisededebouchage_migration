'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './VilleSearchInline.module.css';

interface VilleOption {
  ville: string;
  slug: string;
  code_postal: string;
}

interface Props {
  villes: VilleOption[];
  placeholder?: string;
  topCount?: number;
}

export default function VilleSearchInline({ villes, placeholder = 'Tapez votre ville...', topCount = 5 }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const filtered = query.length > 0
    ? villes.filter((v) =>
        v.ville.toLowerCase().includes(query.toLowerCase()) ||
        v.code_postal.includes(query)
      ).slice(0, 6)
    : villes.slice(0, topCount);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  useEffect(() => { setActiveIndex(-1); }, [query]);

  function go(slug: string) {
    setOpen(false);
    setQuery('');
    router.push(`/debouchage-${slug}/`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === 'Enter' && activeIndex >= 0 && filtered[activeIndex]) { e.preventDefault(); go(filtered[activeIndex].slug); }
    else if (e.key === 'Escape') setOpen(false);
  }

  return (
    <div className={styles.wrap} ref={containerRef}>
      <div className={styles.field}>
        <svg className={styles.ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          aria-label="Rechercher une ville"
        />
        {query && <button className={styles.clear} onClick={() => { setQuery(''); inputRef.current?.focus(); }}>×</button>}
      </div>
      {open && filtered.length > 0 && (
        <ul className={styles.list}>
          {!query && <li className={styles.hint}>Villes principales</li>}
          {filtered.map((v, i) => (
            <li key={v.slug} className={`${styles.item} ${i === activeIndex ? styles.active : ''}`} onMouseEnter={() => setActiveIndex(i)} onClick={() => go(v.slug)}>
              <span className={styles.name}>{v.ville}</span>
              <span className={styles.cp}>{v.code_postal}</span>
            </li>
          ))}
          {!query && <li className={styles.hint} style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 4, paddingTop: 8 }}>Tapez pour chercher parmi {villes.length} communes</li>}
        </ul>
      )}
      {open && query.length > 0 && filtered.length === 0 && (
        <div className={styles.empty}>Aucune ville trouvée</div>
      )}
    </div>
  );
}
