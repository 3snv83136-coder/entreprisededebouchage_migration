# Design — pages /nos-prestations/ et /nos-tarifs/
Date : 2026-03-23

## Contexte

Ces deux URLs sont référencées dans le sitemap et dans le breadcrumb des pages service
(`Accueil → Nos prestations → [service]`) mais aucune page n'existe dans l'app Next.js.
Elles retournent actuellement un 404.

---

## Page 1 : `/nos-prestations/`

**Objectif :** page vitrine listant les 11 services, hub de maillage interne.

### Metadata
```ts
import { generateMetadataForPage } from '@/lib/seo/metadata';
export const metadata: Metadata = {
  ...generateMetadataForPage('prestations'),
  alternates: { canonical: '/nos-prestations/' },
};
```

### Breadcrumb
```ts
[
  { name: 'Accueil', href: '/' },
  { name: 'Nos prestations', href: '/nos-prestations/' },
]
```

### Structure JSX
```
<article className={styles.page}>
  <div className="container">
    <Breadcrumbs items={...} />
    <h1>Nos prestations débouchage dans le Var</h1>
    <p className={styles.lead}> — 2 phrases intro — </p>
    <div className={styles.grid}>
      {services.map(s => (
        <Link href={`/${s.slug}/`}>
          <span className={styles.icon} aria-hidden="true">{s.icon}</span>  // emoji décoratif (texte brut, pas d'img)
          <strong>{s.label}</strong>
          <p>{s.description}</p>
        </Link>
      ))}
    </div>
    <VilleSearchInline
      villes={villesData}   // tableau serialisé { ville, slug, code_postal } — voir ci-dessous
      placeholder="Dans quelle ville ?"
      topCount={6}
    />
    <CtaFinal />
  </div>
</article>
```

Serialisation villes (obligatoire, pattern établi dans toutes les autres pages) :
```ts
const villes = getAllVilles();
const villesData = villes.map((v) => ({
  ville: v.ville,
  slug: v.slug,
  code_postal: v.code_postal,
}));
```

Imports :
- `Breadcrumbs` from `@/components/common/Breadcrumbs`
- `CtaFinal` from `@/components/page-ville/CtaFinal`
- `VilleSearchInline` from `@/components/common/VilleSearchInline`
- `getAllServices` from `@/lib/data/services`
- `getAllVilles` from `@/lib/data/villes`

### CSS — `page.module.css`
- `.page` : `padding: 100px 24px 80px; min-height: 60vh`
- `.lead` : `font-size: 17px; color: var(--slate); line-height: 1.75; max-width: 720px`
- `.grid` : `display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px`
  - Responsive : `@media (max-width: 768px)` → 2 colonnes ; `@media (max-width: 480px)` → 1 colonne
- `.card` (les `<Link>`) : `border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 20px; background: rgba(22,27,34,0.6); text-decoration: none; display: flex; flex-direction: column; gap: 8px`
  - `:hover` → `border-color: rgba(251,117,0,0.45); background: rgba(251,117,0,0.06)`
- `.icon` : `font-size: 28px`
- Titres de service : `color: var(--white); font-size: 16px`
- Description : `color: var(--slate); font-size: 14px; line-height: 1.6`

---

## Page 2 : `/nos-tarifs/`

**Objectif :** grille de tarifs fixes et transparents. "Prix annoncé avant intervention, sans supplément."

### Metadata
```ts
import { generateMetadataForPage } from '@/lib/seo/metadata';
export const metadata: Metadata = {
  ...generateMetadataForPage('tarifs'),
  alternates: { canonical: '/nos-tarifs/' },
};
```

### Breadcrumb
```ts
[
  { name: 'Accueil', href: '/' },
  { name: 'Nos tarifs', href: '/nos-tarifs/' },
]
```

### 3 forfaits (labels identiques à la homepage)
| Label (homepage exact) | Prix | Description |
|------------------------|------|-------------|
| Debouchage Manuel | 99 € | Furet mécanique — WC, évier, lavabo, douche, lave-linge |
| Inspection Caméra | 110 € | Diagnostic vidéo + rapport |
| Haute Pression | 199 € | Hydrocurage — canalisation, égout, regard, fosse |

La carte "Haute Pression" reçoit un badge "Le + demandé" (cohérence homepage).

### Tableau détail — 8 lignes
| Type d'intervention | Forfait | Prix |
|---------------------|---------|------|
| WC bouché | Debouchage Manuel | 99 € |
| Évier / lavabo | Debouchage Manuel | 99 € |
| Douche / baignoire | Debouchage Manuel | 99 € |
| Lave-linge / lave-vaisselle | Debouchage Manuel | 99 € |
| Canalisation extérieure | Haute Pression | 199 € |
| Égout / regard | Haute Pression | 199 € |
| Fosse septique | Haute Pression | 199 € |
| Diagnostic / recherche de fuite | Inspection Caméra | 110 € |

### Note transparence (sous le tableau)
> "Tous nos prix sont fixes et annoncés par téléphone avant tout déplacement. Pas de supplément, pas de mauvaise surprise."

### CTA
`<a href="tel:{PHONE_RAW}">📞 {PHONE} — Devis gratuit</a>`

### Structured data
Pas de schema `PriceSpecification` — le `generateSchemaBreadcrumbs` suffit via le composant `Breadcrumbs`. Décision explicite : ne pas ajouter de schema prix pour éviter de s'engager sur des montants indexés qui peuvent évoluer.

### Structure JSX
```
<article className={styles.page}>
  <div className="container">
    <Breadcrumbs items={...} />
    <h1>Nos tarifs débouchage dans le Var</h1>
    <p className={styles.lead}> — pitch transparence — </p>

    <section className={styles.cards}>  // 3 forfait cards
    <section className={styles.tableSection}>  // tableau 8 lignes
    <p className={styles.note}>  // note transparence
    <div className={styles.cta}>  // CTA téléphone
  </div>
</article>
```

Imports :
- `Breadcrumbs` from `@/components/common/Breadcrumbs`
- `PHONE`, `PHONE_RAW` from `@/lib/config` (BASE_URL non utilisé dans cette page)

### CSS — `page.module.css`
- `.page` / `.lead` : identiques à `/nos-prestations/`
- `.cards` : `display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 48px`
  - Responsive : `@media (max-width: 640px)` → 1 colonne
- `.card` : `border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; background: rgba(22,27,34,0.6); position: relative`
- `.cardPopular` (Haute Pression) : `border-color: rgba(251,117,0,0.5); background: rgba(251,117,0,0.07)`
- `.badge` : `position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: var(--orange); color: #000; font-size: 11px; font-weight: 700; padding: 3px 10px; border-radius: 20px`
- `.price` : `font-size: clamp(36px, 6vw, 52px); color: var(--white); font-weight: 800`
- `.tableSection` : `margin-bottom: 40px`
- `table` : `width: 100%; border-collapse: collapse`
- `th` : `text-align: left; font-size: 12px; color: var(--orange-light); text-transform: uppercase; letter-spacing: 0.06em; padding: 10px 12px; border-bottom: 1px solid rgba(255,255,255,0.08)`
- `td` : `padding: 12px; font-size: 15px; color: var(--slate); border-bottom: 1px solid rgba(255,255,255,0.05)`
- `td:last-child` : `color: var(--white); font-weight: 700`
- `.note` : `font-size: 14px; color: var(--slate); font-style: italic; margin-bottom: 32px`
- `.cta` : `display: flex; justify-content: center`
  - `a` : `btn-primary` (classe globale existante)

---

## Conventions communes

- App Router Next.js, pas de `'use client'`
- CSS Modules uniquement, variables CSS globales (`var(--white)`, `var(--orange)`, `var(--slate)`, `var(--navy-mid)`, `var(--orange-light)`)
- `CtaFinal` import depuis `@/components/page-ville/CtaFinal` (pas de chemin raccourci)
- Pattern structurel cohérent avec `zones-dintervention` et `ServicePageContent`

## Hors scope

- Modifier le sitemap (les URLs y sont déjà)
- Modifier les pages service existantes
- Créer de nouveaux composants partagés
