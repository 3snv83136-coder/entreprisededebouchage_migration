import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-wc-toilettes';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    "question": "Mon WC déborde, que faire en attendant le technicien ?",
    "answer": "Coupez l'arrivée d'eau (robinet d'arrêt derrière le WC ou vanne générale), ne tirez plus la chasse et appelez-nous immédiatement. Posez des serviettes ou une bassine sous la cuvette pour limiter les dégâts en attendant notre arrivée."
  },
  {
    "question": "Peut-on déboucher un WC sans le démonter ?",
    "answer": "Oui, dans 90% des cas nous débouchons le WC sans démontage grâce à nos furets professionnels manuels et motorisés. Le démontage n'est nécessaire que lorsqu'un objet dur (jouet, brosse, téléphone) est fermement coincé dans le siphon."
  },
  {
    "question": "Les lingettes peuvent-elles boucher un WC ?",
    "answer": "Oui, les lingettes — même estampillées 'biodégradables' ou 'jetables aux toilettes' — sont la cause n°1 des bouchons de WC. Contrairement au papier toilette, elles ne se dissolvent pas dans l'eau et s'accumulent en formant des bouchons compacts dans le siphon et la colonne."
  },
  {
    "question": "Que faire si le WC déborde la nuit ?",
    "answer": "Fermez immédiatement le robinet d'arrêt situé derrière la cuvette pour stopper l'arrivée d'eau, puis appelez notre numéro d'urgence disponible 24h/24 et 7j/7. N'essayez pas de forcer avec une ventouse si l'eau continue de monter, vous risqueriez d'aggraver le débordement."
  },
  {
    "question": "Les lingettes biodégradables sont-elles sans risque pour les WC ?",
    "answer": "Non. La mention 'biodégradable' indique que le produit se dégrade à terme dans l'environnement, pas qu'il se dissout dans les canalisations comme le papier toilette. En pratique, les lingettes biodégradables mettent plusieurs semaines à se décomposer et s'accumulent dans le siphon bien avant. Seul le papier toilette standard est sans risque pour vos WC."
  }
];

const content = {
  intro: `Un WC bouché dans les Bouches-du-Rhône, c'est une urgence qui ne peut pas attendre. Que vous soyez à Marseille, Aubagne, Aix-en-Provence ou dans l'arrière-pays, nos techniciens interviennent 24h/24 et 7j/7 pour déboucher vos toilettes en une seule visite. Les causes les plus fréquentes sont les lingettes accumulées dans le siphon, les objets tombés accidentellement (jouets, brosses à dents, téléphones), l'excès de papier toilette ou le calcaire qui rétrécit progressivement le passage dans le siphon céramique. Grâce à notre furet motorisé professionnel, nous résolvons 90% des bouchons sans démontage de la cuvette. Le résultat est garanti dès la première intervention. Forts de 19 ans d'expérience dans les Bouches-du-Rhône, nous savons qu'un bouchon traité rapidement évite un débordement coûteux et des dégâts d'eau sur votre plancher ou au plafond du voisin du dessous.`,

  problems: `Les toilettes bouchées se manifestent de plusieurs façons : l'eau monte lentement dans la cuvette après la chasse et redescend difficilement, ou pire, le WC déborde franchement. Vous pouvez également entendre des gargouillis dans la colonne après chaque chasse d'eau — signe que l'air ne circule plus correctement dans la colonne, souvent parce qu'un bouchon partiel ralentit l'évacuation en aval. Des odeurs remontant de la colonne (œuf pourri, égout) indiquent que le bouchon est profond et que les matières stagnent. Enfin, le papier toilette qui ne part pas du tout à la chasse est le signe d'un siphon quasi-obstrué. Dans tous ces cas, il faut intervenir rapidement pour éviter un débordement et la propagation d'eaux usées.`,

  intervention: `Notre technicien commence par fermer le robinet d'arrêt derrière le WC pour stopper toute arrivée d'eau et prévenir un débordement pendant le travail. Il inspecte ensuite visuellement le siphon et évalue la nature du bouchon : organique (papier, lingettes) ou corps étranger dur. Pour un bouchon simple, le furet manuel suffit à crocheter et extraire la masse obstruante. Pour un bouchon plus résistant ou plus profond dans la colonne d'évacuation, nous utilisons le furet motorisé à tambour qui fragmente et entraîne le bouchon vers le réseau. Si le bouchon est localisé profondément dans la colonne collective ou la canalisation principale, l'hydrocurage haute pression est mis en œuvre : un jet d'eau à forte pression décolle les dépôts sur toute la longueur. En fin d'intervention, nous testons la chasse trois fois consécutives pour valider que l'évacuation est complète et uniforme. Le résultat est garanti.`,

  tarif: `Le débouchage de WC est facturé à partir de 110€, déplacement inclus dans les Bouches-du-Rhône. Ce tarif couvre un bouchon standard traitable au furet. Pour un bouchon profond nécessitant l'hydrocurage, un devis est établi sur place avant toute intervention supplémentaire — vous gardez le contrôle du coût. Le déplacement est offert et il n'y a aucun frais caché. Intervention garantie résultat : si le bouchon revient dans les jours suivant notre passage pour la même cause, nous revenons sans supplément. Appelez-nous pour un devis gratuit avant l'intervention.`,

  steps: [
    {
      name: "Couper l'arrivée d'eau",
      text: "Le robinet d'arrêt situé derrière le WC (ou la vanne générale si le robinet est absent) est fermé en premier. Cette étape est non négociable : elle évite tout débordement supplémentaire pendant que le technicien travaille sur le siphon."
    },
    {
      name: "Diagnostic du type de bouchon",
      text: "Le technicien inspecte visuellement la cuvette et le siphon, écoute les gargouillis de la colonne et questionne sur les matières jetées récemment. Il détermine si le bouchon est dans le siphon de la cuvette, dans le premier mètre de canalisation ou plus profondément dans la colonne collective — ce qui conditionne le choix de l'outil."
    },
    {
      name: "Débouchage au furet",
      text: "Un furet manuel est introduit dans le siphon pour crocheter les lingettes ou le papier aggloméré. Si la résistance est trop forte ou le bouchon trop loin, le furet motorisé électrique prend le relais : il tourne à vitesse contrôlée, fragmente le bouchon et l'entraîne vers le réseau d'évacuation. Aucun démontage de la cuvette n'est nécessaire dans 90% des cas."
    },
    {
      name: "Hydrocurage si bouchon profond",
      text: "Lorsque le bouchon est localisé dans la colonne d'évacuation (à plusieurs mètres du WC) ou que des dépôts calcaires ont rétréci le passage sur une longue section, le technicien connecte le flexible d'hydrocurage. Un jet haute pression (jusqu'à 200 bars) décolle les incrustations sur toute la longueur et rince la canalisation vers le réseau collectif."
    },
    {
      name: "Test et validation",
      text: "L'arrivée d'eau est rouverte et la chasse est tirée trois fois consécutives à débit normal. Le technicien contrôle visuellement que l'eau s'évacue rapidement sans bruit anormal et sans remontée. Il vérifie également l'absence de fuites au raccordement du WC. La garantie résultat est confirmée avant de partir."
    }
  ],

  signes: `Plusieurs signaux doivent vous alerter avant que le WC ne déborde complètement. L'eau qui monte dans la cuvette après la chasse puis redescend lentement (plus de 30 secondes) indique un siphon partiellement obstrué. Un bruit de gargouillis dans la colonne juste après la chasse signale un problème d'évacuation en aval. Le papier toilette qui ne part pas ou qui reste en surface après la chasse est un signal clair. Enfin, des odeurs d'œuf pourri ou d'égout qui remontent par intermittence dans les WC ou dans la salle de bains trahissent une stagnation de matières dans la colonne — n'attendez plus pour appeler.`,

  conseils: `Pour éviter les récidives, la règle est simple : seul le papier toilette va dans les WC. Jamais de lingettes, même estampillées 'biodégradables' ou 'jetables aux WC' : elles ne se dissolvent pas dans les canalisations. Jamais de cotons, tampons, couches ou mouchoirs. Jamais d'huile de cuisson ni de graisses qui refroidissent et colmatent le siphon. Un détartrage annuel du siphon avec de l'acide citrique dilué (150g dans 1 litre d'eau chaude, verser dans la cuvette, laisser agir 1h) suffit à maintenir un passage propre dans les zones calcaires des Bouches-du-Rhône. En cas de doute, appelez-nous pour un diagnostic préventif.`
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
