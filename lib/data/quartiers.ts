export interface CityLocalData {
  quartiers: string[];
  axes: string[];
  habitat: string;
  problematique: string;
  contexte: string;
}

const cityData: Record<string, CityLocalData> = {
  'marseille': {
    quartiers: ['Le Vieux-Port', 'La Joliette', 'Le Panier', 'Endoume', 'La Canebière'],
    axes: ['La Canebière', 'Avenue du Prado'],
    habitat: 'Immeubles haussmanniens, cités HLM, bastides provençales',
    problematique: 'Réseau ancien en centre-ville, calcaire important, copropriétés vétustes',
    contexte: 'Préfecture des Bouches-du-Rhône, deuxième ville de France',
  },
  'aix-en-provence': {
    quartiers: ['Cours Mirabeau', 'Mazarin', 'Jas de Bouffan', 'Les Milles', 'Pont de l\'Arc'],
    axes: ['Cours Mirabeau', 'Avenue de l\'Europe'],
    habitat: 'Centre historique, résidences étudiantes, pavillonnaire périphérique',
    problematique: 'Canalisations anciennes en centre, eau très calcaire',
    contexte: 'Ville universitaire, patrimoine historique, forte demande locative',
  },
  'aubagne': {
    quartiers: ['Centre-ville', 'Pin Vert', 'Les Passons', 'Camp Major', 'Beaudinard'],
    axes: ['Avenue Antide Boyer', 'Cours Barthélemy'],
    habitat: 'Centre ancien, lotissements résidentiels, zone commerciale',
    problematique: 'Réseau mixte ancien et récent, terrain argileux en périphérie',
    contexte: 'Base principale de l\'entreprise, porte des calanques',
  },
  'marignane': {
    quartiers: ['Centre-ville', 'Les Florides', 'Saint-Pierre', 'Le Jaï', 'Les Beugons'],
    axes: ['Avenue Jean Mermoz', 'Boulevard Frédéric Mistral'],
    habitat: 'Pavillonnaire, résidences, zone aéroport',
    problematique: 'Terrain calcaire, canalisations des années 70-80',
    contexte: 'Base secondaire, proximité aéroport Marseille-Provence',
  },
  'la-ciotat': {
    quartiers: ['Le Vieux Port', 'Les Calanques', 'Le Liouquet', 'Saint-Jean', 'La Salis'],
    axes: ['Boulevard Anatole France', 'Avenue du Président Wilson'],
    habitat: 'Centre ancien, résidences littorales, lotissements collinaires',
    problematique: 'Sable et sel dans les canalisations, afflux estival',
    contexte: 'Station balnéaire, anciens chantiers navals, forte saisonnalité',
  },
  'martigues': {
    quartiers: ['Jonquières', 'Ferrières', 'L\'Île', 'Lavéra', 'Carro'],
    axes: ['Avenue Louis Sammut', 'Boulevard du 14 Juillet'],
    habitat: 'Centre historique sur eau, quartiers résidentiels, zones industrielles',
    problematique: 'Proximité eau salée, canalisations anciennes centre-ville',
    contexte: 'Venise provençale, zone industrielle Fos-sur-Mer',
  },
  'salon-de-provence': {
    quartiers: ['Centre historique', 'Les Canourgues', 'Bel Air', 'Viougues', 'La Crau'],
    axes: ['Cours Gimon', 'Boulevard Nostradamus'],
    habitat: 'Centre médiéval, résidences militaires, pavillonnaire',
    problematique: 'Eau très calcaire, réseau ancien en centre',
    contexte: 'Base aérienne, ville historique de Nostradamus',
  },
  'istres': {
    quartiers: ['Centre-ville', 'Rassuen', 'Entressen', 'Le Prépaou', 'Trigance'],
    axes: ['Avenue Hélène Boucher', 'Boulevard de la République'],
    habitat: 'Grands ensembles, pavillonnaire, zones industrielles',
    problematique: 'Terrain calcaire et argileux, réseau parfois mal dimensionné',
    contexte: 'Étang de Berre, base aérienne, ville en croissance',
  },
  'vitrolles': {
    quartiers: ['Les Pins', 'Le Liourat', 'Les Pinchinades', 'Centre-ville', 'Griffon'],
    axes: ['Avenue de Marseille', 'Avenue du Griffon'],
    habitat: 'Grands ensembles, zones commerciales, pavillonnaire',
    problematique: 'Copropriétés années 70, colonnes montantes vétustes',
    contexte: 'Zone aéroport, centre commercial, renouvellement urbain',
  },
  'arles': {
    quartiers: ['Centre historique', 'Trinquetaille', 'Barriol', 'Griffeuille', 'Pont de Crau'],
    axes: ['Boulevard des Lices', 'Avenue Sadi Carnot'],
    habitat: 'Centre romain classé UNESCO, HLM périphérie, mas en Camargue',
    problematique: 'Canalisations très anciennes en centre UNESCO, terrain marécageux',
    contexte: 'Plus grande commune de France en superficie, patrimoine UNESCO',
  },
};

const defaultProblematiques = [
  "Calcaire important dans l'eau des Bouches-du-Rhône, entartrage fréquent des canalisations",
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
    contexte: 'Commune des Bouches-du-Rhône',
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
