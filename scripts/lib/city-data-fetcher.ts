/**
 * Récupère les données locales réelles pour les communes des Bouches-du-Rhône
 * Sources : API Geo gouv.fr, Wikipedia FR, Base Adresse Nationale
 */

export interface CityProfile {
  slug: string;
  name: string;
  code_postal: string;
  population: number;
  code_insee: string;
  coordinates: { lat: number; lon: number };
  quartiers: string[];
  rues: string[];
  wikipedia_extract: string;
  archetype: 'urbain' | 'littoral-touristique' | 'rural-isole' | 'periurbain' | 'historique';
}

interface GeoCommune {
  nom: string;
  code: string;
  codesPostaux: string[];
  population: number;
  centre: { type: string; coordinates: [number, number] };
}

// Slugify helper
function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['']/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Fetch with retry and timeout
async function fetchWithRetry(url: string, retries = 3, timeoutMs = 10000): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), timeoutMs);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (res.ok) return res;
      if (res.status === 429) {
        await new Promise(r => setTimeout(r, 2000 * (i + 1)));
        continue;
      }
      throw new Error(`HTTP ${res.status}`);
    } catch (err) {
      if (i === retries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * (i + 1)));
    }
  }
  throw new Error('Max retries reached');
}

// 1. API Geo gouv.fr — toutes les communes des Bouches-du-Rhône
export async function fetchGeoCommunes(): Promise<GeoCommune[]> {
  const url = 'https://geo.api.gouv.fr/communes?codeDepartement=13&fields=nom,code,codesPostaux,population,centre&format=json';
  const res = await fetchWithRetry(url);
  return res.json() as Promise<GeoCommune[]>;
}

// 2. Wikipedia FR — résumé de la page
export async function fetchWikipediaExtract(cityName: string): Promise<string> {
  // Essayer d'abord avec "(Bouches-du-Rhône)", puis sans
  const variants = [
    `${cityName} (Bouches-du-Rhône)`,
    `${cityName} (commune)`,
    cityName,
  ];

  for (const variant of variants) {
    try {
      const encoded = encodeURIComponent(variant.replace(/ /g, '_'));
      const url = `https://fr.wikipedia.org/api/rest_v1/page/summary/${encoded}`;
      const res = await fetchWithRetry(url, 2, 8000);
      const data = await res.json() as { extract?: string; type?: string };
      if (data.extract && data.type !== 'disambiguation') {
        return data.extract;
      }
    } catch {
      continue;
    }
  }
  return '';
}

// 3. Base Adresse Nationale — noms de rues réels
export async function fetchStreetNames(codeInsee: string): Promise<string[]> {
  try {
    const url = `https://api-adresse.data.gouv.fr/search/?q=avenue+rue+boulevard+chemin&citycode=${codeInsee}&type=street&limit=20`;
    const res = await fetchWithRetry(url, 2, 8000);
    const data = await res.json() as { features: Array<{ properties: { name: string } }> };
    const streets = data.features
      .map(f => f.properties.name)
      .filter(n => n && n.length > 3);
    // Dédupliquer
    return [...new Set(streets)].slice(0, 15);
  } catch {
    return [];
  }
}

// Classification par archétype
function classifyArchetype(
  population: number,
  wikipediaText: string,
  tier1Coords: Array<{ lat: number; lon: number }>,
  coords: { lat: number; lon: number }
): CityProfile['archetype'] {
  const text = wikipediaText.toLowerCase();

  if (population > 20000) return 'urbain';

  // Littoral-touristique : doit avoir des marqueurs forts de côte/plage, pas juste "tourisme"
  const isLittoral = /balnéaire|plage[s]? |port de pêche|front de mer|station balnéaire|côte d['']azur|bord de mer|littoral/.test(text);
  const isStrongTourist = /station touristique|haut lieu du tourisme|afflux touristique|résidences? secondaire/.test(text);
  if (isLittoral || isStrongTourist) return 'littoral-touristique';

  // Historique : village perché, centre médiéval, patrimoine fort
  const isHistorique = /médiéval|village perché|fortifié|château fort|rempart|vieux village|cité médiévale/.test(text);
  if (isHistorique && population < 5000) return 'historique';

  // Periurbain : < 15km d'une ville tier-1, pop > 1000
  const distToTier1 = Math.min(...tier1Coords.map(t => {
    const dlat = (t.lat - coords.lat) * 111;
    const dlon = (t.lon - coords.lon) * 111 * Math.cos(coords.lat * Math.PI / 180);
    return Math.sqrt(dlat * dlat + dlon * dlon);
  }));
  if (distToTier1 < 15 && population > 1000) return 'periurbain';

  if (population < 2000) return 'rural-isole';

  return 'periurbain'; // default for medium towns (2000-20000)
}

// Extraire des quartiers/hameaux depuis Wikipedia
function extractQuartiersFromWikipedia(text: string): string[] {
  // Chercher des noms propres après "quartier", "hameau", "lieu-dit"
  const patterns = [
    /quartiers?\s+(?:de\s+)?([A-ZÀ-Ü][a-zà-ü-]+(?:\s+[A-ZÀ-Ü][a-zà-ü-]+)*)/g,
    /hameau[x]?\s+(?:de\s+)?([A-ZÀ-Ü][a-zà-ü-]+(?:\s+[A-ZÀ-Ü][a-zà-ü-]+)*)/g,
  ];
  const found: string[] = [];
  for (const p of patterns) {
    let m;
    while ((m = p.exec(text)) !== null) {
      if (m[1] && m[1].length > 2) found.push(m[1]);
    }
  }
  return [...new Set(found)].slice(0, 5);
}

// Main: build all city profiles
export async function buildAllCityProfiles(
  villes: Array<{ ville: string; code_postal: string; population: number; slug: string; tier: 1 | 2 }>,
  existingQuartiers: Record<string, string[]>
): Promise<CityProfile[]> {
  console.log('📡 Récupération des communes depuis api.gouv.fr...');
  const geoCommunes = await fetchGeoCommunes();

  // Index par nom normalisé et par code postal
  const geoByName = new Map<string, GeoCommune>();
  const geoByPostal = new Map<string, GeoCommune>();
  for (const c of geoCommunes) {
    geoByName.set(c.nom.toLowerCase(), c);
    for (const cp of c.codesPostaux) {
      geoByPostal.set(cp, c);
    }
  }

  // Identifier les coordonnées tier-1
  const tier1Villes = villes.filter(v => v.tier === 1);
  const tier1Coords: Array<{ lat: number; lon: number }> = [];
  for (const v of tier1Villes) {
    const geo = geoByName.get(v.ville.toLowerCase()) || geoByPostal.get(v.code_postal);
    if (geo?.centre) {
      tier1Coords.push({ lat: geo.centre.coordinates[1], lon: geo.centre.coordinates[0] });
    }
  }

  const profiles: CityProfile[] = [];
  const total = villes.length;

  for (let i = 0; i < total; i++) {
    const v = villes[i];
    console.log(`[${i + 1}/${total}] ${v.ville}...`);

    // Match geo data
    const geo = geoByName.get(v.ville.toLowerCase()) || geoByPostal.get(v.code_postal);
    const codeInsee = geo?.code || '';
    const coords = geo?.centre
      ? { lat: geo.centre.coordinates[1], lon: geo.centre.coordinates[0] }
      : { lat: 43.5, lon: 5.4 }; // centre approximatif des Bouches-du-Rhône

    // Fetch Wikipedia + rues en parallèle
    const [wikiExtract, rues] = await Promise.all([
      fetchWikipediaExtract(v.ville),
      codeInsee ? fetchStreetNames(codeInsee) : Promise.resolve([]),
    ]);

    // Quartiers : utiliser existants du JSON, sinon extraire de Wikipedia
    let quartiers = existingQuartiers[v.slug] || [];
    if (quartiers.length < 2) {
      const wikiQuartiers = extractQuartiersFromWikipedia(wikiExtract);
      quartiers = wikiQuartiers.length > 0 ? wikiQuartiers : ['Le Centre'];
    }

    const archetype = classifyArchetype(v.population, wikiExtract, tier1Coords, coords);

    profiles.push({
      slug: v.slug,
      name: v.ville,
      code_postal: v.code_postal,
      population: v.population,
      code_insee: codeInsee,
      coordinates: coords,
      quartiers,
      rues,
      wikipedia_extract: wikiExtract,
      archetype,
    });

    // Rate limiting doux
    if (i % 10 === 9) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  return profiles;
}
