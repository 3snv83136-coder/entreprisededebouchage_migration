import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-fosse-septique';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    "question": "À quelle fréquence faut-il vidanger une fosse septique dans les Bouches-du-Rhône ?",
    "answer": "La loi impose une vidange tous les 4 ans au maximum, quelle que soit la taille de la fosse. Pour une famille de 4 personnes avec une fosse de 3 000 litres, nous recommandons de ne pas dépasser 3 ans entre deux vidanges. Le SPANC (Service Public d'Assainissement Non Collectif) peut contrôler votre installation et vous mettre en demeure en cas de dépassement."
  },
  {
    "question": "Qu'est-ce que le SPANC et pourquoi faut-il son rapport ?",
    "answer": "Le SPANC est le service de contrôle des installations d'assainissement non collectif, rattaché à votre commune ou à votre communauté de communes dans les Bouches-du-Rhône. Il contrôle la conformité de votre fosse et peut exiger des travaux de mise en conformité. Lors de la vente d'un bien, un rapport SPANC datant de moins de 3 ans est obligatoire. Nous vous remettons un compte-rendu d'intervention à transmettre à votre SPANC après chaque vidange."
  },
  {
    "question": "Quels sont les signes qu'une fosse septique est saturée ?",
    "answer": "Plusieurs indices ne trompent pas : des odeurs nauséabondes persistantes dans le jardin autour de la fosse, un sol spongieux ou des taches humides à la surface du terrain au-dessus de la fosse, une herbe anormalement verte et luxuriante sur cette zone, et des écoulements lents sur tous les sanitaires de la maison simultanément. Ces signes indiquent que la fosse déborde dans le sol — il faut intervenir en urgence."
  },
  {
    "question": "Quels produits sont à éviter avec une fosse septique ?",
    "answer": "L'ennemi numéro un de la fosse septique est la javel en grande quantité : elle détruit les bactéries anaérobies qui digèrent les matières organiques, rendant la fosse inopérante. Évitez également les désinfectants forts, les antibiotiques, les huiles minérales et les solvants. Préférez des produits ménagers éco-labellisés et utilisez un activateur biologique mensuel pour maintenir la flore bactérienne."
  },
  {
    "question": "Quel délai pour une intervention sur fosse septique dans les Bouches-du-Rhône ?",
    "answer": "Pour une vidange planifiée, nous intervenons généralement sous 48 à 72 heures selon votre secteur géographique dans les Bouches-du-Rhône. En cas de débordement ou de situation d'urgence sanitaire, nous mobilisons un camion hydrocureur en priorité, souvent le jour même ou le lendemain matin. Appelez-nous pour connaître la disponibilité exacte sur votre commune."
  }
];

const content = {
  intro: `Dans les Bouches-du-Rhône, une grande partie des habitations rurales — notamment dans les secteurs de l'Étang de Berre, la Sainte-Baume, les Alpilles et la Camargue — ne sont pas raccordées au tout-à-l'égout. Elles dépendent d'une fosse septique ou d'une fosse toutes eaux dont l'entretien est encadré par la loi : la vidange est obligatoire tous les 4 ans au maximum selon la réglementation SPANC (Service Public d'Assainissement Non Collectif). Une fosse non vidangée à temps déborde dans le sol, pollue la nappe phréatique et peut engendrer une mise en demeure par votre mairie. Notre camion hydrocureur équipé d'une pompe à vide intervient sur l'ensemble des 119 communes du département pour la vidange complète, le curage haute pression des parois et la remise en état de votre installation. Nous vous remettons un rapport d'intervention à transmettre à votre service SPANC. Forts de 19 ans d'expérience dans les Bouches-du-Rhône, nous connaissons les spécificités des installations locales.`,

  problems: `Une fosse septique en fin de cycle ou saturée émet des signaux clairs qu'il ne faut pas ignorer. Des odeurs persistantes de matières en décomposition dans le jardin, autour de la trappe d'accès ou dans certaines pièces de la maison, sont le premier indicateur. Un sol spongieux ou des taches d'humidité à la surface du terrain au-dessus de la fosse montrent que les effluents s'infiltrent dans le sol environnant. La végétation anormalement verte et haute au-dessus de la zone de la fosse confirme ce phénomène de fertilisation forcée par débordement. Côté sanitaires, si les toilettes et les douches évacuent lentement sur toute la maison simultanément (et non pas sur un seul point), c'est la fosse qui est saturée et non une canalisation isolée. Un débordement de fosse est une urgence sanitaire.`,

  intervention: `Notre intervention sur fosse septique suit un protocole rigoureux pour garantir une vidange complète et sécurisée. Le technicien commence par évaluer le volume de la fosse, son ancienneté et son état général à partir de la trappe d'accès, puis pompe l'intégralité du contenu avec le camion citerne hydrocureur. Une fois la fosse vidée, le curage haute pression des parois internes décolle les boues incrustées et les dépôts qui limitent la capacité utile. Le technicien inspecte ensuite l'état structurel de la fosse — fissures, déformation du béton, colmatage des canalisations d'entrée et de sortie — et signale tout défaut pouvant nécessiter une réparation. En fin d'intervention, un rapport écrit est remis, mentionnant le volume pompé, l'état de la fosse et les recommandations pour le prochain entretien, document que vous pouvez transmettre directement à votre SPANC.`,

  tarif: `La vidange de fosse septique est facturée à partir de 249€ selon le volume de la fosse (en m³) et la distance depuis notre dépôt. Ce tarif inclut le déplacement, la vidange complète, le curage des parois et la remise du rapport d'intervention. Le rapport SPANC est fourni sans supplément. Un devis gratuit est établi par téléphone avant l'intervention sur la base du volume déclaré de votre fosse. Aucun frais caché n'est ajouté sur place. Appelez-nous pour obtenir votre tarif personnalisé selon votre commune.`,

  steps: [
    {
      name: "Évaluation de la fosse",
      text: "Le technicien ouvre la trappe d'accès et évalue visuellement le niveau de remplissage, le volume de la fosse (en m³), son ancienneté et son type (fosse septique classique, fosse toutes eaux, micro-station). Cette étape conditionne le dimensionnement de la pompe et la durée d'intervention."
    },
    {
      name: "Pompage et vidange complète",
      text: "Le flexible de la pompe à vide du camion hydrocureur est introduit dans la fosse. Le contenu (eaux usées, boues de fond et flottants en surface) est aspiré dans la citerne du véhicule jusqu'à vidange complète. La totalité du volume est évacuée vers une station de traitement agréée — aucun rejet sur site."
    },
    {
      name: "Curage haute pression des parois",
      text: "Une fois la fosse vidée, le jet haute pression (jusqu'à 200 bars) décolle les boues incrustées sur les parois, le fond et les chicanes internes. Ce curage restaure la capacité utile de la fosse et élimine les dépôts qui bloquent les canalisations d'entrée et de sortie."
    },
    {
      name: "Inspection de l'état général",
      text: "Le technicien inspecte visuellement l'intérieur de la fosse : fissures dans le béton, infiltrations d'eau claire (signe d'une fissure alimentée par la nappe), état du filtre ou du préfiltre, colmatage du drain d'épandage. Chaque anomalie est notée dans le rapport et un conseil de réparation est formulé si nécessaire."
    },
    {
      name: "Rapport d'intervention SPANC remis",
      text: "Un compte-rendu écrit est remis au client à la fin de l'intervention. Il mentionne la date, le volume pompé, l'état général de l'installation et les éventuelles anomalies constatées. Ce document vous permet de répondre aux exigences du SPANC et constitue une preuve d'entretien régulier en cas de vente du bien."
    }
  ],

  signes: `Les signaux d'alerte d'une fosse à vidanger ne se limitent pas aux odeurs. Un sol spongieux ou des zones humides permanentes au-dessus de la fosse ou du champ d'épandage montrent que les effluents surchargent le sol. Une herbe anormalement verte et haute sur cette zone précise, en toutes saisons, est un indicateur classique de débordement lent. À l'intérieur, des toilettes qui évacuent lentement sur l'ensemble de la maison (et pas un seul WC), des gargouillis dans plusieurs évacuations simultanément et des odeurs de gaz persistants dans les WC indiquent une fosse saturée. Dès que deux de ces signes sont réunis, appelez-nous sans attendre.`,

  conseils: `La durée de vie et l'efficacité d'une fosse septique dépendent directement des produits qui y transitent. La javel est l'ennemi numéro un : utilisée en grande quantité, elle détruit les bactéries anaérobies qui décomposent les matières organiques, rendant la fosse inefficace. Utilisez-la avec parcimonie ou privilégiez les produits ménagers éco-labellisés. Un activateur biologique mensuel (granulés de bactéries disponibles en jardinerie) maintient la flore microbienne active entre deux vidanges. Ne jetez jamais de lingettes, cotons, médicaments, huiles ou solvants dans les WC. Planifiez la vidange tous les 3 à 4 ans sans attendre les signes de saturation — c'est moins coûteux qu'une réparation d'urgence.`
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
