/**
 * Construit les prompts de génération de contenu par archétype de ville
 * Chaque archétype impose une structure, un angle et des formulations différentes
 */

import { CityProfile } from './city-data-fetcher';

interface PromptContext {
  profile: CityProfile;
  service?: { slug: string; label: string; description: string; intervention: string; problems: string[] };
  bannedPhrases: string[];
  nearbyVilles: string[];
}

// Structure de sections différente par archétype
const SECTION_ORDERS: Record<CityProfile['archetype'], string[]> = {
  'urbain': [
    'Accroche : densité urbaine, immeubles, réseau ancien',
    'Types de canalisations rencontrées en milieu urbain (fonte, PVC, grès)',
    'Problèmes fréquents liés au bâti collectif et à la densité',
    'Zones d\'intervention par quartier',
    'Déroulement d\'une intervention en immeuble/copropriété',
    'FAQ (3 questions uniques)',
  ],
  'littoral-touristique': [
    'Accroche : saisonnalité, résidences secondaires, proximité mer',
    'Impact du tourisme sur les réseaux d\'assainissement',
    'Problèmes spécifiques : sable, sel, surcharge estivale',
    'Zones d\'intervention (quartiers balnéaires et centre)',
    'Intervention en location saisonnière : contraintes et solutions',
    'FAQ (3 questions uniques)',
  ],
  'rural-isole': [
    'Accroche : commune rurale, assainissement individuel, accessibilité',
    'Fosses septiques et assainissement non collectif',
    'Problèmes liés à l\'isolement : racines, terrain argileux, puits perdus',
    'Notre couverture même en zone rurale éloignée',
    'Quand appeler un pro vs tenter soi-même',
    'FAQ (3 questions uniques)',
  ],
  'periurbain': [
    'Accroche : lotissements, constructions récentes, croissance démographique',
    'Canalisations des années 70-2000 : les pièges courants',
    'Problèmes de raccordement et de réseau mixte ancien/récent',
    'Zones d\'intervention et quartiers résidentiels',
    'Entretien préventif en zone pavillonnaire',
    'FAQ (3 questions uniques)',
  ],
  'historique': [
    'Accroche : village perché, centre ancien, patrimoine',
    'Canalisations centenaires : grès, pierre, fonte d\'époque',
    'Contraintes d\'accès en centre historique (ruelles, escaliers)',
    'Techniques douces adaptées aux conduites fragiles',
    'Zones d\'intervention : vieux village et extensions modernes',
    'FAQ (3 questions uniques)',
  ],
};

// Angles éditoriaux par archétype
const EDITORIAL_ANGLES: Record<CityProfile['archetype'], string> = {
  'urbain': 'Insiste sur la complexité des réseaux collectifs, les copropriétés, les colonnes d\'immeuble, l\'urgence en milieu dense.',
  'littoral-touristique': 'Insiste sur la saisonnalité (afflux été), le sable/sel dans les canalisations, les locations vacances, l\'urgence pour les propriétaires non-résidents.',
  'rural-isole': 'Insiste sur l\'assainissement individuel (fosses septiques), l\'accessibilité, la confiance d\'un artisan qui se déplace même loin, les terrains en pente ou argileux.',
  'periurbain': 'Insiste sur les lotissements pavillonnaires, les canalisations PVC des constructions récentes, les jardins avec racines, les raccordements au tout-à-l\'égout.',
  'historique': 'Insiste sur le respect du patrimoine, les canalisations anciennes en grès/pierre, les accès difficiles en centre historique, les techniques adaptées.',
};

// Phrases interdites de base (enrichies dynamiquement)
const BASE_BANNED_PHRASES = [
  "On intervient rapidement, même dans les communes isolées des Bouches-du-Rhône",
  "C'est justement notre métier : couvrir tout le département",
  "Appelez le 06 27 69 91 34",
  "N'hésitez pas à nous contacter",
  "Notre équipe de professionnels qualifiés",
  "Nous mettons tout en œuvre",
  "Fort de notre expérience",
  "Un service de qualité",
  "Votre satisfaction est notre priorité",
  "Faites confiance à notre expertise",
  "Nous intervenons dans les meilleurs délais",
  "Un travail soigné et professionnel",
  "Des tarifs compétitifs",
  "Un devis gratuit et sans engagement",
];

export function buildCityPagePrompt(ctx: PromptContext): string {
  const { profile, bannedPhrases, nearbyVilles } = ctx;
  const sections = SECTION_ORDERS[profile.archetype];
  const angle = EDITORIAL_ANGLES[profile.archetype];
  const allBanned = [...BASE_BANNED_PHRASES, ...bannedPhrases];

  return `Tu es rédacteur pour un plombier-déboucheur installé dans les Bouches-du-Rhône (13). Tu écris la page SEO de ${profile.name} (${profile.code_postal}).

DONNÉES LOCALES RÉELLES (ne rien inventer, utiliser ces données) :
- Population : ${profile.population} habitants
- Quartiers/hameaux : ${profile.quartiers.join(', ')}
- Rues principales : ${profile.rues.length > 0 ? profile.rues.slice(0, 8).join(', ') : 'non disponibles'}
- Contexte Wikipedia : ${profile.wikipedia_extract.slice(0, 500)}
- Coordonnées : ${profile.coordinates.lat.toFixed(3)}°N, ${profile.coordinates.lon.toFixed(3)}°E
- Communes voisines : ${nearbyVilles.join(', ')}

ARCHÉTYPE DE CETTE VILLE : ${profile.archetype}
ANGLE ÉDITORIAL : ${angle}

STRUCTURE IMPOSÉE (respecter cet ordre) :
${sections.map((s, i) => `${i + 1}. ${s}`).join('\n')}

PHRASES INTERDITES (ne JAMAIS utiliser ces formulations, même reformulées) :
${allBanned.map(p => `- "${p}"`).join('\n')}

RÈGLES DE RÉDACTION :
- Ton direct et professionnel. Utilise "on" pas "nous". Phrases courtes.
- Chaque paragraphe DOIT mentionner un lieu, une rue, ou un fait spécifique à ${profile.name}
- Ne PAS mentionner le numéro de téléphone (géré par le composant React)
- Ne PAS mettre de section tarifs (gérée par un composant React séparé)
- Objectif : 700-1000 mots
- Chaque phrase doit apporter une info utile. Pas de remplissage.
- Les FAQ doivent être des questions que quelqu'un à ${profile.name} poserait vraiment

FORMAT DE SORTIE : JSON strict, pas de markdown autour.
{
  "title": "Debouchage ${profile.name} ${profile.code_postal} — ...",
  "slug": "debouchage-${profile.slug}",
  "type": "ville",
  "ville": "${profile.name}",
  "code_postal": "${profile.code_postal}",
  "status": "published",
  "meta": {
    "title": "Debouchage ${profile.name} ${profile.code_postal} — Intervention rapide 24h",
    "description": "... (145-160 caractères, mentionner ${profile.name} et ${profile.code_postal})",
    "focus_keyword": "debouchage ${profile.name.toLowerCase()}"
  },
  "content": "<h2>...</h2><p>...</p>... (HTML avec h2, p, ul/li. PAS de h1.)",
  "faq": [
    {"question": "...", "answer": "..."},
    {"question": "...", "answer": "..."},
    {"question": "...", "answer": "..."}
  ],
  "internal_links": [
    ${nearbyVilles.slice(0, 6).map(v => `{"slug": "debouchage-${slugifySimple(v)}", "label": "Débouchage ${v}"}`).join(',\n    ')}
  ],
  "quartiers": ${JSON.stringify(profile.quartiers)},
  "word_count": 0
}`;
}

export function buildServiceCityPagePrompt(ctx: PromptContext): string {
  const { profile, service, bannedPhrases, nearbyVilles } = ctx;
  if (!service) throw new Error('Service required for service-city prompt');

  const allBanned = [...BASE_BANNED_PHRASES, ...bannedPhrases];

  return `Tu es rédacteur pour un plombier-déboucheur des Bouches-du-Rhône (13). Tu écris la page SEO "${service.label} à ${profile.name}" (${profile.code_postal}).

DONNÉES LOCALES RÉELLES :
- Population : ${profile.population} habitants
- Quartiers : ${profile.quartiers.join(', ')}
- Rues : ${profile.rues.length > 0 ? profile.rues.slice(0, 8).join(', ') : 'non disponibles'}
- Contexte : ${profile.wikipedia_extract.slice(0, 400)}
- Archétype ville : ${profile.archetype}
- Communes voisines : ${nearbyVilles.join(', ')}

SERVICE SPÉCIFIQUE :
- Nom : ${service.label}
- Description : ${service.description}
- Méthode : ${service.intervention}
- Problèmes traités : ${service.problems.join(', ')}

CONTRAINTES D'ÉCRITURE :
- Le contenu doit être spécifique À LA FOIS au service "${service.label}" ET à la ville "${profile.name}"
- Chaque paragraphe mentionne un lieu réel de ${profile.name} OU un détail technique du service
- Ton direct, "on" pas "nous"
- 600-900 mots
- Pas de numéro de téléphone, pas de section tarifs
- Ne pas répéter les mêmes causes/symptômes que la page ville générale

PHRASES INTERDITES :
${allBanned.map(p => `- "${p}"`).join('\n')}

STRUCTURE :
1. Intro spécifique : pourquoi "${service.label}" est un besoin courant à ${profile.name}
2. Causes et symptômes spécifiques à ce service dans ce type de ville
3. Comment on intervient (technique adaptée au contexte local)
4. Zones couvertes à ${profile.name}
5. FAQ (3 questions mêlant le service et la ville)

FORMAT : JSON strict.
{
  "title": "${service.label} à ${profile.name} (${profile.code_postal})",
  "slug": "${service.slug.replace('debouchage-', '')}-${profile.slug}",
  "type": "service-ville",
  "ville": "${profile.name}",
  "code_postal": "${profile.code_postal}",
  "service": "${service.slug}",
  "status": "published",
  "meta": {
    "title": "${service.label} ${profile.name} ${profile.code_postal} — Intervention rapide",
    "description": "... (145-160 caractères)",
    "focus_keyword": "${service.label.toLowerCase()} ${profile.name.toLowerCase()}"
  },
  "content": "<h2>...</h2><p>...</p>... (HTML, PAS de h1)",
  "faq": [{"question":"...","answer":"..."},{"question":"...","answer":"..."},{"question":"...","answer":"..."}],
  "internal_links": [
    {"slug": "debouchage-${profile.slug}", "label": "Tous les services à ${profile.name}"},
    ${nearbyVilles.slice(0, 5).map(v => `{"slug": "debouchage-${service.slug.replace('debouchage-', '')}-${slugifySimple(v)}", "label": "${service.label} ${v}"}`).join(',\n    ')}
  ],
  "quartiers": ${JSON.stringify(profile.quartiers)},
  "word_count": 0
}`;
}

function slugifySimple(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}
