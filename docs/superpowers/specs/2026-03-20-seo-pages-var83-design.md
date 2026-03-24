# Spec — Génération massive pages SEO Var (83) + Amélioration Design

**Date :** 2026-03-20
**Projet :** entreprisededebouchage.com (Next.js)
**Scope :** 285 pages SEO + refonte CTA/responsive

---

## 1. Objectif

Générer 285 pages SEO ultra-locales pour les 153 communes du Var (83), avec contenu unique à 90%+, signaux E-E-A-T, GEO, Schema.org, et maillage interne dense. En parallèle, améliorer le design des CTA et le responsive.

---

## 2. Structure des pages

### Tier 1 — Villes majeures (pop > 15 000) : 12 villes × 12 pages = 144

Chaque ville obtient 1 page ville + 11 pages service×ville.

**Villes Tier 1 :**
Toulon, La Seyne-sur-Mer, Hyères, Fréjus, Draguignan, Saint-Raphaël, Six-Fours-les-Plages, La Garde, La Valette-du-Var, La Crau, Brignoles, Sanary-sur-Mer

**Services (11) :**
debouchage-canalisation, debouchage-wc-toilettes, debouchage-evier-lavabo, debouchage-douche-baignoire, debouchage-salle-de-bain, debouchage-cuisine, debouchage-lave-vaisselle, debouchage-lave-linge, debouchage-fosse-septique, debouchage-egouts-regards, debouchage-ballon-deau-chaude-chauffe-eau

### Tier 2 — Communes restantes : 141 pages ville

Page ville enrichie avec mentions de tous les services et maillage interne.

### Total : 285 pages

- 153 pages villes (12 Tier 1 + 141 Tier 2)
- 132 pages service×ville (12 villes × 11 services)

---

## 3. Données source — villes.csv

Le fichier `data/villes.csv` sera mis à jour avec les 153 communes du Var :

```
ville,departement,code_postal,population,tier
Toulon,Var,83000,169736,1
La Seyne-sur-Mer,Var,83500,64651,1
...
Vérignon,Var,83630,15,2
```

Colonnes : ville, departement, code_postal, population, tier (1 ou 2)

---

## 4. Architecture URL

### Pages villes
```
/debouchage-[ville-slug]/
```
Exemples : `/debouchage-toulon/`, `/debouchage-hyeres/`, `/debouchage-frejus/`

### Pages service×ville (Tier 1 uniquement)
```
/debouchage-[service]-[ville-slug]/
```
Exemples : `/debouchage-canalisation-toulon/`, `/debouchage-wc-toilettes-hyeres/`

### Routes Next.js

**Existant :** `app/debouchage-[slug]/page.tsx` — pages villes dynamiques

**À créer :** Routes dynamiques pour les combos service×ville. Deux options :
- **Option A :** `app/debouchage-[service]-[ville]/page.tsx` — route dynamique unique
- **Option retenue : A** — chaque combo est une route statique générée via `generateStaticParams()`

---

## 5. Contenu — Structure par type de page

### 5.1 Page ville (Tier 1 & Tier 2)

```
H1: Debouchage [Ville] [Code Postal] — Intervention rapide 24h/7j

[HERO] Accroche locale + CTA téléphone + badge urgence + stats (délai, dispo, devis)

H2: Nos services de debouchage à [Ville]
  → Grille des 11 services avec liens (Tier 1 : vers pages service×ville, Tier 2 : vers pages services génériques)

H2: Intervention de debouchage à [Quartier 1], [Quartier 2] et dans tout [Ville]
  → Paragraphe ultra-local : quartiers, rues, type d'habitat, problématiques spécifiques
  → Mention réseau ancien centre-ville, calcaire, etc.

H2: Zone d'intervention autour de [Ville]
  → Liste des 5 communes voisines les plus proches avec liens internes
  → Mention axes routiers

H2: Pourquoi faire appel à nous à [Ville] ?
  → 3 arguments : réactivité, transparence tarifs, expertise locale

H2: Questions fréquentes sur le debouchage à [Ville]
  → 3 FAQ localisées, uniques par ville

[CTA FINAL] Bandeau orange + numéro + "Devis gratuit en 5 minutes"
```

**Minimum 600 mots. Objectif 800-1000 pour Tier 1.**

### 5.2 Page service×ville (Tier 1 uniquement)

```
H1: Debouchage [Service Label] à [Ville] — Technicien disponible 24h

[HERO] Accroche ciblée service + ville + CTA

H2: [Service] bouché à [Ville] ? On intervient vite.
  → Intro spécifique au problème dans le contexte local

H2: Les causes fréquentes de [problème] à [Ville]
  → 3-4 causes avec contexte local (calcaire Var, vétusté centre-ville, etc.)

H2: Comment on intervient pour un [service] bouché
  → Déroulé technique : diagnostic, méthode, durée

H2: Tarifs debouchage [service] à [Ville]
  → Fourchette réaliste, mention devis gratuit

H2: On intervient aussi dans les communes voisines
  → Liens vers les 3-5 communes les plus proches

H2: Questions fréquentes
  → 3 FAQ spécifiques service + ville

[CTA FINAL]
```

**Minimum 600 mots.**

---

## 6. Contenu unique à 90%+

### Éléments de variation par page

| Dimension | Source de variation |
|---|---|
| Quartiers/lieux-dits | 3-5 par commune, recherchés ou générés de manière crédible |
| Problématiques locales | Calcaire, réseau ancien, inondations, fosses septiques rurales |
| Type d'habitat | HLM, villas, immeubles anciens, lotissements |
| Axes routiers | Boulevard principal, route départementale |
| Contexte géographique | Littoral, arrière-pays, collines, centre urbain |
| Population/densité | Données INSEE dans le contenu |
| Communes voisines | Différentes pour chaque page |
| FAQ | Questions uniques, ancrées dans le contexte local |
| Statistiques | Chiffrées différemment selon la taille |

### Mécanisme anti-duplication

- Chaque agent reçoit un brief unique avec les données locales
- Instruction explicite : ne jamais réutiliser de formulations d'une autre page
- Vérification post-génération : comparaison de similarité entre pages du même batch

---

## 7. Ton éditorial

**Pro avec touche humaine — jamais de copwriting agressif.**

### Règles :
- "On" plutôt que "Nous" (proximité)
- Phrases courtes, verbes d'action
- Références terrain concrètes (quartiers, rues, type de bâti)
- Vocabulaire technique juste mais accessible
- Pas de superlatifs creux ("leader", "meilleur", "n°1")
- Pas de pression commerciale ("offre limitée", "dernière chance")
- Ton rassurant : "On connaît bien le problème", "Pas de surprise sur la facture"

### Exemples de ton cible :
> "Une canalisation bouchée à Toulon, ça n'attend pas. Nos techniciens interviennent dans l'heure, 7j/7. On diagnostique, on débouche, on vous explique comment éviter que ça revienne."

> "Dans les immeubles anciens du Mourillon, les canalisations en fonte ont tendance à s'entartrer. On intervient régulièrement dans le quartier — un coup de fil et on est chez vous."

---

## 8. E-E-A-T

| Signal | Implémentation |
|---|---|
| **Experience** | Détails techniques crédibles : hydrocurage haute pression, inspection caméra, furet électrique. Mention années d'activité dans le Var. |
| **Expertise** | Vocabulaire technique précis par service. Diagnostic adapté au type de problème. |
| **Authoritativeness** | Schema.org Plumber avec areaServed. Breadcrumbs structurés. Liens internes denses. |
| **Trustworthiness** | Fourchettes de prix réalistes. Mention "devis gratuit". Pas de faux témoignages. Numéro visible. |

---

## 9. GEO (Generative Engine Optimization)

### Objectif : maximiser la citabilité par les IA (Google AI Overviews, ChatGPT, Perplexity)

| Signal | Implémentation |
|---|---|
| **Passages citables** | Chaque H2 commence par une réponse directe à la question implicite |
| **Données factuelles** | Population, code postal, département intégrés naturellement |
| **Structure claire** | H1 > H2 > contenu, pas de blocs ambigus |
| **FAQ schema** | JSON-LD FAQPage sur chaque page |
| **Ancrage local fort** | Quartiers, rues, contexte = contenu difficilement substituable |
| **Réponses complètes** | Chaque section est auto-suffisante (peut être extraite seule) |

---

## 10. Schema.org

### Page ville
```json
[
  { "@type": "Plumber", "name": "...", "areaServed": { "@type": "City" }, "telephone": "...", ... },
  { "@type": "FAQPage", "mainEntity": [...] },
  { "@type": "BreadcrumbList", "itemListElement": [...] }
]
```

### Page service×ville
```json
[
  { "@type": "Plumber", ... },
  { "@type": "Service", "name": "Debouchage [service]", "areaServed": { "@type": "City" }, ... },
  { "@type": "FAQPage", ... },
  { "@type": "BreadcrumbList", ... }
]
```

---

## 11. Maillage interne

Chaque page contient minimum **5 liens internes** :

| Depuis | Vers | Nombre |
|---|---|---|
| Page ville | 3 communes voisines | 3 |
| Page ville | Pages services (nav ou service×ville) | 2+ |
| Page service×ville | Page ville parente | 1 |
| Page service×ville | Même service dans ville voisine | 2 |
| Page service×ville | Autres services même ville | 2 |

Les communes voisines sont calculées par proximité géographique (même arrondissement, puis même canton).

---

## 12. Amélioration Design — CTA & Responsive

### 12.1 CTA améliorés

**Hero CTA :**
- Bouton téléphone agrandi (min 56px hauteur, full-width mobile)
- Animation pulse subtile sur le bouton principal
- Badge "Urgence 24h/7j" avec icône
- Numéro de téléphone en gros (clamp 1.5rem → 2.5rem)

**Sticky CTA mobile :**
- Barre fixe en bas avec bouton "Appeler" + numéro
- Apparaît après scroll 300px
- Fond orange vif, texte blanc, ombre portée
- Touch target minimum 48px

**CTA intermédiaire (Urgence Banner) :**
- Bandeau rouge/orange entre les sections
- "Urgence debouchage ? Appelez maintenant"
- Pleine largeur, padding généreux

**CTA final :**
- Section dédiée avant le footer
- Fond dégradé orange
- Titre + sous-titre + bouton + numéro
- Centré, gros, impossible à rater

### 12.2 Responsive 100%

**Breakpoints :**
```css
--mobile: 480px
--tablet: 768px
--desktop: 1024px
--wide: 1280px
```

**Audit et corrections :**
- Tous les grids passent en 1 colonne sous 768px
- Touch targets minimum 48×48px partout
- Font-size en clamp() pour fluidité
- Images en `aspect-ratio` + `object-fit`
- Padding bottom 80px sur mobile (pour sticky CTA)
- Navigation hamburger sous 768px
- Hero : stack vertical mobile, côte à côte desktop
- FAQ : accordion full-width, zones cliquables larges
- Tableaux : scroll horizontal ou stack vertical

---

## 13. Plan de génération multi-agent

### Process par batch de 5 pages

```
1. Agent reçoit brief (5 communes + données locales + template)
2. Agent génère 5 fichiers JSON dans data/generated/
3. Chaque JSON : { title, slug, meta, content (HTML), faq, schema }
4. Vérification : longueur > 600 mots, liens internes présents, unicité
5. Batch suivant
```

### Parallélisation

- Agents indépendants par batch de 5
- Chaque agent a son propre contexte local (quartiers, voisines, problématiques)
- Pas de dépendance entre batches

### Ordre de génération

1. **Phase 1 :** 12 pages villes Tier 1 (2-3 batches)
2. **Phase 2 :** 132 pages service×ville Tier 1 (26 batches)
3. **Phase 3 :** 141 pages villes Tier 2 (28 batches)

### Format JSON généré

```json
{
  "title": "Debouchage Toulon 83000 — Intervention rapide 24h/7j",
  "slug": "debouchage-toulon",
  "type": "ville",
  "ville": "Toulon",
  "code_postal": "83000",
  "status": "draft",
  "meta": {
    "title": "Debouchage Toulon 83000 — Urgence 24h/7j",
    "description": "Service de debouchage à Toulon. Intervention rapide dans tout le centre-ville et le Mourillon. Devis gratuit. Disponible 24h/7j.",
    "focus_keyword": "debouchage Toulon"
  },
  "content": "<article>...HTML complet...</article>",
  "faq": [
    { "question": "...", "answer": "..." }
  ],
  "schema": { ... },
  "internal_links": [
    { "slug": "debouchage-la-seyne-sur-mer", "label": "Debouchage La Seyne-sur-Mer" }
  ],
  "word_count": 856,
  "quartiers": ["Le Mourillon", "Le Port", "La Rode", "Saint-Jean du Var", "Le Pont du Las"]
}
```

---

## 14. Données locales à intégrer

### Par commune (à rechercher ou générer) :

- 3-5 quartiers/lieux-dits
- 1-2 axes routiers principaux
- Type d'habitat dominant (immeubles, villas, mixte)
- Problématique principale (calcaire, réseau ancien, zone inondable, fosses septiques)
- Contexte : littoral, arrière-pays, zone urbaine/rurale

### Problématiques régionales Var :

- **Littoral** : canalisations anciennes centres-villes, résidences secondaires (engorgement été)
- **Arrière-pays** : fosses septiques, réseaux individuels, accès difficile
- **Zones urbaines** : immeubles collectifs, colonnes montantes, engorgements fréquents
- **Calcaire** : eau très calcaire dans tout le Var → entartrage
- **Épisodes méditerranéens** : pluies violentes → débordement réseaux pluviaux

---

## 15. Fichiers impactés

### Nouveaux fichiers :
- `data/villes.csv` — mis à jour avec 153 communes + tier
- `data/generated/*.json` — 285 fichiers JSON générés
- `app/[service]-[ville]/page.tsx` — route dynamique service×ville (ou pattern adapté)
- `lib/data/quartiers.ts` — données quartiers par commune

### Fichiers modifiés :
- `components/layout/StickyCta.tsx` — refonte mobile
- `components/page-ville/Hero.tsx` — CTA amélioré
- `components/page-ville/CtaFinal.tsx` — refonte design
- `components/common/UrgenceBanner.tsx` — si existant
- `app/globals.css` — breakpoints, utilities responsive, animations CTA
- `app/sitemap.ts` — inclure les 285 pages
- `lib/data/villes.ts` — charger 153 communes + tier
- `lib/seo/schema.ts` — schema Service pour pages combo
- `lib/seo/metadata.ts` — metadata pour pages combo
- `lib/linking/internal.ts` — calcul voisines pour 153 communes

---

## 16. Critères de succès

- [ ] 285 pages générées avec contenu unique > 600 mots
- [ ] Similarité entre pages < 10% (hors structure)
- [ ] Schema.org valide sur chaque page
- [ ] 5+ liens internes par page
- [ ] Build Next.js réussi (toutes pages statiques)
- [ ] Score Lighthouse mobile > 90
- [ ] CTA visible above the fold sur mobile
- [ ] Touch targets 48px+ sur mobile
- [ ] Sitemap XML incluant les 285 URLs
