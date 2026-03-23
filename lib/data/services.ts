import { Service } from '@/lib/types';

const services: Service[] = [
  {
    slug: 'debouchage-canalisation',
    label: 'Débouchage canalisation',
    icon: '🔧',
    description: 'Hydrocurage haute pression et furet motorisé pour éliminer toute obstruction dans vos conduites, quelle que soit la profondeur.',
    problems: ['Canalisation bouchée', 'Écoulement lent', 'Mauvaises odeurs'],
    intervention: 'Diagnostic caméra puis hydrocurage ou furet motorisé selon la nature du bouchon.',
    priceRange: '€€',
  },
  {
    slug: 'debouchage-wc-toilettes',
    label: 'Débouchage WC',
    icon: '🚽',
    description: 'Intervention rapide sur vos toilettes bouchées ou débordantes. Résultat en une seule visite, sans démontage superflu.',
    problems: ['WC bouché', 'Eau qui monte', 'WC qui déborde'],
    intervention: 'Débouchage mécanique ou haute pression, sans démontage inutile.',
    priceRange: '€€',
  },
  {
    slug: 'debouchage-evier-lavabo',
    label: 'Débouchage évier & lavabo',
    icon: '🍳',
    description: 'Nettoyage des siphons et conduites encrassés par les graisses, résidus alimentaires et calcaire accumulé.',
    problems: ['Évier bouché', 'Eau stagnante', 'Mauvaises odeurs'],
    intervention: 'Démontage siphon, furet ou hydrocurage selon la gravité.',
    priceRange: '€',
  },
  {
    slug: 'debouchage-douche-baignoire',
    label: 'Débouchage douche & baignoire',
    icon: '🛁',
    description: 'Traitement des bouchons formés par les cheveux et le calcaire. Écoulement rétabli durablement.',
    problems: ['Douche bouchée', 'Eau stagnante', 'Calcaire accumulé'],
    intervention: 'Extraction mécanique puis nettoyage haute pression du réseau.',
    priceRange: '€',
  },
  {
    slug: 'debouchage-egouts-regards',
    label: 'Débouchage égout & regard',
    icon: '🏚️',
    description: 'Intervention sur les réseaux extérieurs, fosses et regards colmatés. Curage complet avec rapport.',
    problems: ['Regard bouché', 'Remontées d\'égout', 'Fosse colmatée'],
    intervention: 'Hydrocurage haute pression du réseau extérieur avec rapport d\'intervention.',
    priceRange: '€€€',
  },
  {
    slug: 'debouchage-cuisine',
    label: 'Débouchage cuisine',
    icon: '🍽️',
    description: 'Débouchage complet de l\'évacuation cuisine : évier, lave-vaisselle, graisses accumulées dans les canalisations.',
    problems: ['Évier cuisine bouché', 'Graisses accumulées', 'Écoulement lent'],
    intervention: 'Nettoyage siphon et curage des canalisations de cuisine.',
    priceRange: '€',
  },
  {
    slug: 'debouchage-fosse-septique',
    label: 'Débouchage fosse septique',
    icon: '🏗️',
    description: 'Vidange et débouchage de fosse septique. Intervention professionnelle avec véhicule équipé.',
    problems: ['Fosse pleine', 'Remontées d\'odeurs', 'Débordement'],
    intervention: 'Vidange par camion pompe, curage et vérification du bon écoulement.',
    priceRange: '€€€',
  },
  {
    slug: 'debouchage-salle-de-bain',
    label: 'Débouchage salle de bain',
    icon: '🚿',
    description: 'Prise en charge complète de la salle de bain : douche, baignoire, lavabo, évacuation au sol.',
    problems: ['Eau stagnante', 'Cheveux accumulés', 'Calcaire'],
    intervention: 'Traitement de l\'ensemble du réseau salle de bain en une seule visite.',
    priceRange: '€€',
  },
  {
    slug: 'debouchage-lave-vaisselle',
    label: 'Débouchage lave-vaisselle',
    icon: '🫧',
    description: 'Débouchage de l\'évacuation du lave-vaisselle et nettoyage de la canalisation de raccordement.',
    problems: ['Lave-vaisselle ne vidange pas', 'Eau stagnante', 'Mauvaises odeurs'],
    intervention: 'Vérification du siphon, nettoyage de la pompe et curage de la canalisation.',
    priceRange: '€',
  },
  {
    slug: 'debouchage-lave-linge',
    label: 'Débouchage lave-linge',
    icon: '👕',
    description: 'Débouchage de l\'évacuation du lave-linge. Intervention rapide pour rétablir le bon fonctionnement.',
    problems: ['Lave-linge ne vidange pas', 'Eau qui remonte', 'Code erreur vidange'],
    intervention: 'Nettoyage filtre, vérification pompe et débouchage de la canalisation.',
    priceRange: '€',
  },
  {
    slug: 'debouchage-ballon-deau-chaude-chauffe-eau',
    label: 'Débouchage ballon d\'eau chaude',
    icon: '🔥',
    description: 'Détartrage et débouchage de l\'évacuation du ballon d\'eau chaude ou chauffe-eau.',
    problems: ['Pression faible', 'Eau tiède', 'Calcaire accumulé'],
    intervention: 'Détartrage, nettoyage de l\'évacuation et vérification du groupe de sécurité.',
    priceRange: '€€',
  },
];

export function getAllServices(): Service[] {
  return services;
}

export function getServiceBySlug(slug: string): Service | null {
  return services.find((s) => s.slug === slug) || null;
}
