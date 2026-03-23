'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './VilleSearch.module.css';

interface VilleOption {
  ville: string;
  slug: string;
  code_postal: string;
  population: number;
}

interface Props {
  villes: VilleOption[];
}

export default function VilleSearch({ villes }: Props) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filtered = query.length > 0
    ? villes.filter((v) =>
        v.ville.toLowerCase().includes(query.toLowerCase()) ||
        v.code_postal.includes(query)
      ).slice(0, 8)
    : villes.filter((v) => v.population >= 10000).slice(0, 8);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  function navigate(slug: string) {
    setOpen(false);
    router.push(`/debouchage-${slug}/`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0 && filtered[activeIndex]) {
      e.preventDefault();
      navigate(filtered[activeIndex].slug);
    } else if (e.key === 'Escape') {
      setOpen(false);
      inputRef.current?.blur();
    }
  }

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.inputWrap}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="Votre ville dans le Var..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-label="Rechercher votre ville"
        />
        {query && (
          <button
            className={styles.clear}
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            aria-label="Effacer"
          >
            ×
          </button>
        )}
      </div>

      {open && filtered.length > 0 && (
        <ul className={styles.list} ref={listRef} role="listbox">
          {filtered.map((v, i) => (
            <li
              key={v.slug}
              className={`${styles.item} ${i === activeIndex ? styles.active : ''}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => navigate(v.slug)}
            >
              <span className={styles.itemName}>{v.ville}</span>
              <span className={styles.itemCode}>{v.code_postal}</span>
            </li>
          ))}
          {query.length > 0 && filtered.length === 0 && (
            <li className={styles.empty}>Aucune ville trouvée</li>
          )}
        </ul>
      )}

      {!open && (
        <div className={styles.quickLinks}>
          {villes.filter(v => v.population >= 30000).slice(0, 6).map((v) => (
            <button
              key={v.slug}
              className={styles.quickLink}
              onClick={() => navigate(v.slug)}
            >
              {v.ville}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
