export interface CityLocalData {
  quartiers: string[];
  axes: string[];
  habitat: string;
  problematique: string;
  contexte: string;
}

const cityData: Record<string, CityLocalData> = {
  'toulon': {
    quartiers: ['Le Mourillon', 'Saint-Jean du Var', 'La Rode', 'Pont du Las', 'Le Port'],
    axes: ['Avenue de la République', 'Boulevard de Strasbourg'],
    habitat: 'Immeubles anciens centre-ville, résidences en périphérie',
    problematique: 'Canalisations en fonte vieillissantes dans le centre historique, forte calcaire',
    contexte: 'Préfecture du Var, centre urbain dense avec réseau ancien',
  },
  'la-seyne-sur-mer': {
    quartiers: ['Mar Vivo', 'Les Sablettes', 'Tamaris', 'Le Pas du Loup', 'Berthe'],
    axes: ['Avenue Esprit Armando', 'Corniche Michel Pacha'],
    habitat: 'Mix immeubles collectifs et villas littorales',
    problematique: 'Réseau ancien en centre-ville, engorgements estivaux littoral',
    contexte: 'Deuxième ville du Var, littoral méditerranéen',
  },
  'hyeres': {
    quartiers: ["L'Ayguade", 'Les Salins', 'Giens', 'Le Port', 'Costebelle'],
    axes: ['Avenue Gambetta', 'Route de Giens'],
    habitat: 'Villas résidentielles, résidences touristiques, centre ancien',
    problematique: "Afflux touristique surchargeant les réseaux, vieux centre médiéval",
    contexte: "Station balnéaire, presqu'île de Giens, forte saisonnalité",
  },
  'frejus': {
    quartiers: ['Fréjus Plage', 'Saint-Aygulf', 'Tour de Mare', 'La Gabelle', 'Villeneuve'],
    axes: ['Boulevard de la Libération', 'Route de Bagnols'],
    habitat: 'Résidences touristiques, villas, immeubles récents',
    problematique: 'Sable et sédiments dans les canalisations proches du littoral',
    contexte: 'Ville romaine, mix centre historique et stations balnéaires',
  },
  'draguignan': {
    quartiers: ['Les Collettes', 'Les Négadis', 'Saint-Hermentaire', 'La Foux', 'Le Dragon'],
    axes: ['Boulevard Georges Clemenceau', 'Avenue de Montferrat'],
    habitat: 'Centre ancien dense, lotissements périphériques',
    problematique: 'Réseau vétuste centre historique, épisodes cévenols violents',
    contexte: "Sous-préfecture, arrière-pays varois, zone inondable",
  },
  'saint-raphael': {
    quartiers: ['Valescure', 'Boulouris', 'Le Dramont', 'Santa Lucia', 'Agay'],
    axes: ['Boulevard Félix Martin', "Corniche d'Or"],
    habitat: 'Villas résidentielles haut de gamme, résidences balnéaires',
    problematique: 'Calcaire important, canalisations résidences secondaires peu entretenues',
    contexte: 'Station balnéaire chic, Estérel, forte population saisonnière',
  },
  'six-fours-les-plages': {
    quartiers: ['Le Brusc', 'Reynier', 'La Coudoulière', 'Les Lônes', 'Le Cap Nègre'],
    axes: ['Route de la Seyne', 'Chemin de la Plage'],
    habitat: 'Villas pavillonnaires, quelques résidences',
    problematique: 'Fosses septiques anciennes dans certains quartiers, calcaire',
    contexte: "Commune littorale résidentielle, île des Embiez",
  },
  'la-garde': {
    quartiers: ['Sainte-Marguerite', 'Le Thouar', 'Les Savels', 'La Planquette', 'La Pauline'],
    axes: ['Avenue de Draguignan', 'Route de La Valette'],
    habitat: 'Lotissements pavillonnaires, résidences universitaires',
    problematique: "Calcaire modéré, lotissements des années 70-80 avec réseau vieillissant",
    contexte: 'Commune périurbaine de Toulon, université',
  },
  'la-valette-du-var': {
    quartiers: ['Le Coudon', 'Sainte-Claire', 'Le Partegal', 'Les Fourriers', 'Le Gai Versant'],
    axes: ['Avenue Colonel Picot', 'Rocade Est'],
    habitat: 'Pavillonnaire dense, quelques immeubles récents',
    problematique: 'Réseau mixte ancien/récent, calcaire important',
    contexte: 'Commune résidentielle, flanc du Coudon',
  },
  'la-crau': {
    quartiers: ['Le Centre', 'Les Vallons', 'La Moutonne', 'La Decapris', 'Les Parcs'],
    axes: ['Route Nationale 97', 'Avenue de la Gare'],
    habitat: 'Villas avec jardins, zone rurale en expansion',
    problematique: 'Fosses septiques dans les zones rurales, réseau récent mais calcaire',
    contexte: 'Commune semi-rurale en pleine expansion, plaine de La Crau',
  },
  'brignoles': {
    quartiers: ['Le Centre Ancien', 'Les Music', 'La Celle', 'Zone Nicopolis', 'Les Music'],
    axes: ['Rue des Lanciers', 'Avenue Dreo'],
    habitat: 'Vieux centre provençal dense, lotissements modernes autour',
    problematique: 'Centre ancien avec canalisations très vétustes, épisodes pluvieux violents',
    contexte: 'Sous-préfecture du Var Vert, centre Provence Verte',
  },
  'sanary-sur-mer': {
    quartiers: ['Le Port', 'Portissol', 'Beaucours', 'La Gorguette', 'Lançon'],
    axes: ['Boulevard Courbet', 'Route de Bandol'],
    habitat: 'Village provençal, villas en bord de mer',
    problematique: 'Réseau ancien dans le vieux port, afflux touristique estival',
    contexte: 'Village pittoresque, port de pêche, forte saisonnalité',
  },
};

const defaultProblematiques = [
  "Calcaire important dans l'eau du Var, entartrage fréquent des canalisations",
  'Épisodes méditerranéens avec pluies violentes surchargeant les réseaux',
  "Réseau d'assainissement ancien nécessitant un entretien régulier",
  'Fosses septiques individuelles dans les zones non raccordées au tout-à-l\'égout',
];

export function getCityLocalData(slug: string): CityLocalData {
  if (cityData[slug]) return cityData[slug];

  return {
    quartiers: ['Le Centre', 'Le Village'],
    axes: ['Route Départementale'],
    habitat: 'Habitat varié, villas et petits immeubles',
    problematique: defaultProblematiques[Math.abs(hashCode(slug)) % defaultProblematiques.length],
    contexte: 'Commune du Var',
  };
}

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}
