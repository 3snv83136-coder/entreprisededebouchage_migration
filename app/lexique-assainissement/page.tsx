import type { Metadata } from 'next';
import Link from 'next/link';
import { BASE_URL, PHONE, PHONE_RAW, COMPANY_NAME } from '@/lib/config';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Lexique Assainissement — Glossaire technique débouchage Bouches-du-Rhône',
  description:
    'Lexique complet des termes techniques en assainissement et débouchage : hydrocurage, furet, fosse septique, SPANC, siphon, regard… Définitions claires par un pro des Bouches-du-Rhône.',
  alternates: { canonical: `${BASE_URL}/lexique-assainissement/` },
  openGraph: {
    title: 'Lexique Assainissement — Glossaire technique débouchage Bouches-du-Rhône',
    url: `${BASE_URL}/lexique-assainissement/`,
    type: 'website',
  },
};

interface Term {
  terme: string;
  definition: string;
  lienService?: string;
  lienLabel?: string;
}

const TERMES: Term[] = [
  // A
  {
    terme: 'Assainissement',
    definition:
      'Ensemble des opérations techniques visant à collecter, transporter, traiter et éliminer les eaux usées domestiques ou industrielles. L\'assainissement peut être collectif (raccordé au réseau public) ou non collectif (fosse septique, micro-station). Dans les Bouches-du-Rhône (13), environ 20 % des habitations sont en assainissement non collectif, sous contrôle du SPANC.',
    lienService: '/debouchage-egouts-regards/',
    lienLabel: 'Débouchage égouts et regards',
  },
  // B
  {
    terme: 'Bouchon',
    definition:
      'Obstruction partielle ou totale dans une canalisation qui empêche ou ralentit l\'écoulement des effluents. Un bouchon peut être organique (cheveux, graisses, résidus alimentaires), calcaire (dépôts minéraux), mécanique (corps étranger) ou racinaire (intrusion de racines d\'arbres). Dans les Bouches-du-Rhône, les bouchons calcaires sont particulièrement fréquents en raison de la dureté élevée de l\'eau (TH 25-35°f).',
  },
  {
    terme: 'Bac à graisses',
    definition:
      'Dispositif de pré-traitement obligatoire pour les cuisines professionnelles (restaurants, cantines). Il retient les huiles et graisses alimentaires avant qu\'elles n\'atteignent le réseau d\'assainissement. Un bac à graisses mal entretenu est la première cause de bouchons dans les canalisations de cuisines.',
    lienService: '/debouchage-cuisine/',
    lienLabel: 'Débouchage cuisine',
  },
  // C
  {
    terme: 'Canalisation',
    definition:
      'Conduite destinée à l\'évacuation des eaux usées ou pluviales. Les matériaux varient selon l\'époque de construction : PVC (le plus courant depuis les années 1970), fonte (anciennes installations), grès (très ancien), béton (réseaux extérieurs). Le diamètre va de 32 mm (lavabo) à 200 mm et plus pour les collecteurs enterrés.',
    lienService: '/debouchage-canalisation/',
    lienLabel: 'Débouchage canalisation',
  },
  {
    terme: 'Caméra d\'inspection',
    definition:
      'Outil de diagnostic consistant à introduire une caméra miniature (sur câble ou sur roues motorisées) à l\'intérieur d\'une canalisation pour en inspecter l\'état. Permet de localiser précisément un bouchon, une fissure, un affaissement ou une intrusion racinaire sans travaux de terrassement. La vidéo est enregistrée et peut servir de preuve pour un dossier assurance.',
    lienService: '/debouchage-canalisation/',
    lienLabel: 'Inspection caméra',
  },
  {
    terme: 'Collecteur',
    definition:
      'Canalisation principale qui reçoit les effluents de plusieurs branchements particuliers pour les acheminer vers la station d\'épuration. Le collecteur appartient au réseau public et relève de la commune. Les particuliers y raccordent leur installation privée via un branchement.',
  },
  {
    terme: 'Curage',
    definition:
      'Opération de nettoyage préventif d\'un réseau de canalisations, même sans bouchon déclaré. Contrairement au débouchage (curatif), le curage est une maintenance régulière visant à éviter les obstructions. Réalisé à l\'hydrocureur ou au furet motorisé. Recommandé tous les 2 à 5 ans selon l\'usage et la nature de l\'eau.',
    lienService: '/debouchage-canalisation/',
    lienLabel: 'Curage de canalisations',
  },
  // D
  {
    terme: 'Débouchage',
    definition:
      'Opération curative visant à supprimer une obstruction dans une canalisation et à rétablir un écoulement normal. Le débouchage peut être manuel (ventouse, furet), mécanique (furet motorisé) ou hydraulique (hydrocurage haute pression). À distinguer du curage (préventif) et de la réparation de canalisation (structural).',
    lienService: '/debouchage-canalisation/',
    lienLabel: 'Débouchage canalisation',
  },
  {
    terme: 'Débit',
    definition:
      'Volume d\'eau écoulé par unité de temps dans une canalisation, exprimé en litres par seconde (l/s) ou en mètres cubes par heure (m³/h). Un débit faible ou nul est le signe d\'un bouchon. Le technicien teste le débit avant et après intervention pour valider l\'efficacité du débouchage.',
  },
  {
    terme: 'Dépôt calcaire',
    definition:
      'Accumulation de carbonate de calcium (CaCO₃) sur les parois intérieures d\'une canalisation, consécutive à la précipitation des sels minéraux contenus dans l\'eau dure. Dans les Bouches-du-Rhône (13), l\'eau affiche un TH de 25 à 35°f, parmi les plus élevés de France. Les dépôts calcaires réduisent progressivement le diamètre intérieur des conduites jusqu\'à les obstruer.',
  },
  {
    terme: 'Désobstruer',
    definition:
      'Synonyme de déboucher. Terme technique préféré dans les rapports d\'intervention professionnels. Autres synonymes : désengorger, curer, hydrocurer.',
  },
  // E
  {
    terme: 'Eaux pluviales (EP)',
    definition:
      'Eaux provenant des précipitations (pluie, neige fondue) collectées sur les toitures, terrasses et surfaces imperméabilisées. Elles circulent dans un réseau distinct du réseau d\'eaux usées (système séparatif). Certaines communes des Bouches-du-Rhône ont un réseau unitaire où EU et EP se mélangent.',
  },
  {
    terme: 'Eaux usées (EU)',
    definition:
      'Eaux ayant été utilisées pour des activités domestiques (cuisine, salle de bain, WC) ou industrielles. Elles contiennent des matières organiques, des graisses, des détergents et des micro-organismes pathogènes. Elles doivent être traitées avant rejet dans le milieu naturel, soit par la station d\'épuration (collectif) soit par la fosse septique (non collectif).',
  },
  {
    terme: 'Effluents',
    definition:
      'Terme générique désignant les eaux usées et autres liquides évacués par les installations sanitaires. Inclut les eaux vannes (WC), les eaux ménagères (cuisine, salle de bain) et les eaux industrielles.',
  },
  {
    terme: 'Égout',
    definition:
      'Terme courant désignant le réseau public de collecte des eaux usées. Techniquement, l\'égout comprend les canalisations, les regards de visite et les ouvrages annexes (déversoirs, stations de pompage) qui acheminent les effluents vers la station d\'épuration.',
    lienService: '/debouchage-egouts-regards/',
    lienLabel: 'Débouchage égouts',
  },
  // F
  {
    terme: 'Fosse septique',
    definition:
      'Dispositif d\'assainissement non collectif (ANC) qui reçoit, stocke et pré-traite les eaux usées domestiques par décantation et fermentation anaérobie. La fosse septique doit être vidangée par un prestataire agréé tous les 4 ans en moyenne. Elle est contrôlée par le SPANC. Une fosse pleine ou mal entretenue peut provoquer des débordements ou des odeurs.',
    lienService: '/debouchage-fosse-septique/',
    lienLabel: 'Débouchage fosse septique',
  },
  {
    terme: 'Furet',
    definition:
      'Outil de débouchage mécanique constitué d\'un câble hélicoïdal flexible, manuel ou motorisé, que l\'on introduit dans la canalisation pour fracturer ou extraire le bouchon. Le furet manuel atteint 3 à 5 mètres. Le furet motorisé (électrique ou thermique) peut traiter des canalisations jusqu\'à 30 mètres de longueur avec des diamètres de 32 à 150 mm.',
    lienService: '/debouchage-canalisation/',
    lienLabel: 'Débouchage au furet',
  },
  // G
  {
    terme: 'Garde d\'eau',
    definition:
      'Volume d\'eau permanent retenu dans un siphon, formant un joint hydraulique qui empêche les gaz des canalisations (H₂S, méthane) de remonter dans le logement. Si la garde d\'eau s\'évapore (logement inoccupé) ou est aspirée (dépression), des odeurs d\'égout apparaissent. Remède : verser de l\'eau dans les siphons inutilisés.',
  },
  // H
  {
    terme: 'Hydrocurage',
    definition:
      'Technique de débouchage et de nettoyage par projection d\'eau à haute pression (100 à 250 bars) dans une canalisation. L\'hydrocureur utilise un flexible souple muni d\'une buse rotative ou directionnelle qui propulse l\'eau vers l\'avant (pour avancer le flexible) et vers l\'arrière (pour nettoyer les parois). C\'est la méthode la plus efficace pour les bouchons calcaires, graisseux et racinaires.',
    lienService: '/debouchage-canalisation/',
    lienLabel: 'Hydrocurage haute pression',
  },
  // I
  {
    terme: 'Inspection vidéo',
    definition:
      'Voir "Caméra d\'inspection". Synonymes utilisés par les professionnels : passage caméra, diagnostic endoscopique, inspection endoscopique.',
  },
  // M
  {
    terme: 'Micro-station d\'épuration',
    definition:
      'Dispositif d\'assainissement non collectif compact, alternative à la fosse septique traditionnelle. Elle traite les eaux usées par voie biologique (boues activées ou culture fixée). Plus efficace que la fosse classique, elle nécessite une maintenance semestrielle. Autorisée par le SPANC sur justification.',
  },
  // P
  {
    terme: 'Pression hydrostatique',
    definition:
      'Pression exercée par une colonne d\'eau sur les parois d\'une canalisation. En cas de bouchon total, la pression hydrostatique peut causer des fuites au niveau des joints. C\'est pourquoi un bouchon dans les WC ou l\'évier doit être traité rapidement.',
  },
  // R
  {
    terme: 'Regard',
    definition:
      'Ouvrage de visite cylindrique ou rectangulaire permettant d\'accéder au réseau de canalisations enterrées pour l\'entretien et le débouchage. Le regard est coiffé d\'un couvercle (fonte ou béton) et peut descendre à 50 cm ou plusieurs mètres de profondeur selon la configuration du réseau. On distingue le regard de branchement (sur le réseau privé) et le regard de visite (sur le réseau public).',
    lienService: '/debouchage-egouts-regards/',
    lienLabel: 'Débouchage regards',
  },
  {
    terme: 'Refoulement',
    definition:
      'Remontée des eaux usées par les évacuations (WC, douche, évier) en raison d\'un bouchon en aval qui empêche l\'écoulement. Le refoulement est le signe d\'un bouchon dans le collecteur principal ou dans le branchement extérieur. Il nécessite une intervention professionnelle urgente.',
  },
  {
    terme: 'Réseau séparatif',
    definition:
      'Organisation du réseau d\'assainissement public en deux canalisations distinctes : une pour les eaux usées (EU) et une pour les eaux pluviales (EP). Contrairement au réseau unitaire (EU+EP mélangés), le réseau séparatif limite les risques de surcharge et de pollution en cas de forte pluie. La plupart des communes des Bouches-du-Rhône ont un réseau séparatif.',
  },
  // S
  {
    terme: 'Siphon',
    definition:
      'Raccord en forme de U ou S placé sous les appareils sanitaires (lavabo, évier, douche, baignoire, WC). Le siphon retient une garde d\'eau qui bloque les remontées de gaz, et constitue le premier point de dépôt des matières. La grande majorité des bouchons courants (cheveux, graisses, savon) se forment dans le siphon ou juste en aval.',
    lienService: '/debouchage-evier-lavabo/',
    lienLabel: 'Débouchage évier et lavabo',
  },
  {
    terme: 'SPANC',
    definition:
      'Service Public d\'Assainissement Non Collectif. Organisme communal ou intercommunal chargé du contrôle des installations d\'assainissement autonome (fosses septiques, micro-stations). Le SPANC effectue des diagnostics périodiques (tous les 10 ans en général) et peut ordonner des travaux de mise en conformité. Dans les Bouches-du-Rhône, la compétence SPANC est assurée par les communautés de communes ou la Métropole Aix-Marseille-Provence.',
  },
  // T
  {
    terme: 'Tartre',
    definition:
      'Dépôt minéral dur (principalement carbonate de calcium) qui se forme sur les parois intérieures des canalisations, des chauffe-eau et des appareils électroménagers. Voir "Dépôt calcaire". L\'entartrage est particulièrement sévère dans les Bouches-du-Rhône (13) en raison de la dureté naturelle de l\'eau.',
  },
  {
    terme: 'Titre hydrotimétrique (TH)',
    definition:
      'Mesure de la dureté de l\'eau, exprimée en degrés français (°f). Une eau douce est inférieure à 15°f, une eau dure dépasse 25°f. L\'eau des Bouches-du-Rhône affiche un TH de 25 à 35°f selon les secteurs, ce qui en fait l\'une des plus dures de France. Cette dureté accélère l\'entartrage et durcit les bouchons organiques.',
  },
  // V
  {
    terme: 'Ventouse',
    definition:
      'Outil de débouchage manuel constitué d\'une coupelle en caoutchouc (hémisphérique) fixée sur un manche. Utilisée sur les WC (ventouse à cloche) ou les éviers (ventouse à membrane plate), elle crée une dépression par alternance de poussées et de tractions pour déloger le bouchon dans le siphon ou le coude. Efficace uniquement sur les bouchons peu profonds et mécaniques.',
  },
  {
    terme: 'Vidange fosse septique',
    definition:
      'Opération de curage d\'une fosse septique consistant à aspirer les boues accumulées à l\'aide d\'un camion vidangeur. La fréquence recommandée est de 4 ans maximum, ou dès que les boues atteignent 50% du volume utile. Un prestataire agréé remet un bon de vidange, document obligatoire pour le SPANC.',
    lienService: '/debouchage-fosse-septique/',
    lienLabel: 'Fosse septique',
  },
];

// Regrouper par lettre initiale
const grouped = TERMES.reduce<Record<string, Term[]>>((acc, term) => {
  const letter = term.terme[0].toUpperCase();
  if (!acc[letter]) acc[letter] = [];
  acc[letter].push(term);
  return acc;
}, {});

const letters = Object.keys(grouped).sort();

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name: 'Lexique Assainissement — Glossaire technique',
  description:
    'Glossaire complet des termes techniques en assainissement, débouchage et plomberie, rédigé par des professionnels des Bouches-du-Rhône (13).',
  url: `${BASE_URL}/lexique-assainissement/`,
  publisher: {
    '@type': 'Plumber',
    name: COMPANY_NAME,
    url: BASE_URL,
  },
  hasDefinedTerm: TERMES.map((t) => ({
    '@type': 'DefinedTerm',
    name: t.terme,
    description: t.definition,
    inDefinedTermSet: `${BASE_URL}/lexique-assainissement/`,
  })),
};

const breadcrumbLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${BASE_URL}/` },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Lexique Assainissement',
      item: `${BASE_URL}/lexique-assainissement/`,
    },
  ],
};

export default function LexiquePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className={styles.page}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <nav className={styles.breadcrumb} aria-label="Fil d'Ariane">
              <Link href="/" className={styles.breadcrumbLink}>Accueil</Link>
              <span aria-hidden="true"> › </span>
              <span>Lexique Assainissement</span>
            </nav>
            <div className={styles.badge}>Glossaire professionnel</div>
            <h1 className={styles.title}>Lexique Assainissement</h1>
            <p className={styles.sub}>
              {TERMES.length} définitions techniques rédigées par nos techniciens — hydrocurage, fosse septique, SPANC,
              siphon, regard et bien d&apos;autres.
            </p>
          </div>
        </section>

        {/* Navigation alphabétique */}
        <section className={styles.alphaNav}>
          <div className="container">
            <div className={styles.alphaList}>
              {letters.map((l) => (
                <a key={l} href={`#lettre-${l}`} className={styles.alphaItem}>
                  {l}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Contenu */}
        <section className={styles.content}>
          <div className="container">
            <div className={styles.grid}>
              {letters.map((letter) => (
                <div key={letter} id={`lettre-${letter}`} className={styles.group}>
                  <div className={styles.groupLetter}>{letter}</div>
                  {grouped[letter].map((term) => (
                    <article key={term.terme} className={styles.termCard} id={term.terme.toLowerCase().replace(/\s+/g, '-').replace(/['']/g, '')}>
                      <h2 className={styles.termName}>{term.terme}</h2>
                      <p className={styles.termDef}>{term.definition}</p>
                      {term.lienService && (
                        <Link href={term.lienService} className={styles.termLink}>
                          → {term.lienLabel}
                        </Link>
                      )}
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className="container">
            <div className={styles.ctaBox}>
              <p className={styles.ctaTitle}>Un problème de canalisation dans les Bouches-du-Rhône ?</p>
              <p className={styles.ctaDesc}>
                Notre technicien intervient 24h/7j sur Marseille, Aubagne et tout le département des Bouches-du-Rhône (13).
                Devis gratuit avant déplacement.
              </p>
              <a href={`tel:${PHONE_RAW}`} className="btn-primary">
                Appeler maintenant
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
