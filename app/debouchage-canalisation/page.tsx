import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-canalisation';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    question: "Combien de temps dure un débouchage de canalisation ?",
    answer: "En moyenne 45 minutes à 1h30 selon la complexité. Les cas les plus simples (bouchon organique localisé) sont résolus en 30 minutes. Un effondrement partiel ou une infiltration de racines peuvent nécessiter jusqu'à 2 heures."
  },
  {
    question: "L'hydrocurage peut-il endommager mes canalisations ?",
    answer: "Non. La pression est systématiquement adaptée au matériau : plus douce sur le PVC, plus élevée sur la fonte ou le grès. Nos techniciens sont formés à ajuster le jet selon le diagnostic caméra effectué en amont."
  },
  {
    question: "Faut-il couper l'eau pendant l'intervention ?",
    answer: "Pas nécessairement. Nous coupons l'eau uniquement si le bouchon provoque un risque de débordement immédiat ou si nous devons intervenir sur un tronçon sous pression."
  },
  {
    question: "L'eau très calcaire du Var accélère-t-elle le colmatage des canalisations ?",
    answer: "Oui. La dureté de l'eau dans le Var atteint en moyenne 35°f (degrés français), ce qui est élevé. Le calcaire se dépose progressivement sur les parois des canalisations, réduit le diamètre utile et aggrave tous les autres dépôts (graisses, savons). Un hydrocurage préventif tous les 2 ans est recommandé dans notre secteur."
  },
  {
    question: "Les racines d'arbres peuvent-elles vraiment boucher une canalisation enterrée ?",
    answer: "Oui, c'est l'une des causes les plus fréquentes sur les maisons avec jardin. Les racines s'introduisent par les joints de dilatation ou les micro-fissures, puis forment un réseau dense qui retient les graisses et les débris. La caméra endoscopique permet de visualiser précisément l'intrusion avant d'intervenir au furet rotatif ou à l'hydrocureur."
  }
];

const content = {
  intro: `Avec 19 ans d'expérience sur le terrain dans le Var, Mondor Débouchage intervient sur tous les types de canalisations : PVC, fonte, grès et béton, en intérieur comme en extérieur. Les réseaux du Var sont soumis à des contraintes particulières : une eau très chargée en calcaire (titre hydrotimétrique moyen de 35°f), des sols argileux propices aux infiltrations de racines, et un bâti ancien dans lequel les conduites vieillissent et s'effondrent. Nos techniciens réalisent systématiquement un diagnostic par caméra endoscopique avant toute intervention, afin d'identifier précisément la cause du bouchon — calcaire, graisses, lingettes, racines ou effondrement partiel. L'hydrocureur haute pression traite la quasi-totalité des obstructions en une seule visite. En cas d'urgence, nous intervenons rapidement, sept jours sur sept.`,
  problems: `Plusieurs signaux indiquent qu'une canalisation est en train de se boucher. En cuisine, les graisses cuites se solidifient sur les parois et piègent les résidus alimentaires ; le calcaire aggrave l'accumulation. Aux WC, les lingettes humides (même estampillées "flushable") forment des bouchons compacts. Côté extérieur, les racines d'arbres et arbustes s'infiltrent par les joints et fractures des conduites enterrées. Dans les maisons de plus de 30 ans, un affaissement ou un effondrement partiel de conduite peut bloquer tout le réseau. Les symptômes à surveiller : eau qui s'évacue lentement, gargouillis dans les siphons, mauvaises odeurs persistantes, reflux dans l'évier ou le bac de douche, et bouchon qui revient malgré un débouchage récent.`,
  intervention: `À l'arrivée sur site, le technicien commence par une inspection visuelle des regards et des siphons accessibles. Il introduit ensuite la caméra endoscopique dans la canalisation pour localiser le bouchon, évaluer l'état des parois et identifier la nature de l'obstruction. En fonction du diagnostic, il choisit la méthode adaptée : hydrocurage haute pression pour les dépôts de calcaire et de graisse, furet motorisé pour les bouchons organiques denses, ou combinaison des deux pour les cas complexes. Après le traitement, un test d'écoulement complet est réalisé. Le technicien remet un rapport d'intervention détaillé mentionnant la cause, la méthode utilisée et, si nécessaire, les travaux de réhabilitation à envisager.`,
  steps: [
    {
      name: "Appel & devis gratuit",
      text: "Appelez-nous pour décrire la situation. Nous évaluons la complexité par téléphone et vous communiquons un prix fixe avant tout déplacement. Pas de surprise sur la facture."
    },
    {
      name: "Arrivée rapide du technicien",
      text: "Notre équipe intervient rapidement dans tout le Var pour les urgences. Le technicien arrive avec le matériel complet : caméra endoscopique, hydrocureur haute pression et furet motorisé."
    },
    {
      name: "Diagnostic caméra endoscopique",
      text: "La caméra est introduite dans la canalisation pour localiser avec précision le bouchon, mesurer le degré d&apos;obstruction et identifier le matériau de la conduite. Ce diagnostic oriente le choix de la méthode et évite toute intervention à l&apos;aveugle."
    },
    {
      name: "Hydrocurage ou furetage selon l&apos;obstruction",
      text: "Pour les dépôts de calcaire et de graisse, le jet haute pression de l&apos;hydrocureur décolle et évacue les accumulations. Pour les bouchons organiques denses ou les racines, le furet motorisé perce et extrait l&apos;obstruction. Les deux techniques peuvent être combinées."
    },
    {
      name: "Test d&apos;écoulement & rapport d&apos;intervention",
      text: "Un test d&apos;écoulement complet valide le résultat. Vous recevez un rapport d&apos;intervention écrit précisant la cause, la méthode utilisée et, si l&apos;état des canalisations le justifie, les recommandations de réhabilitation."
    }
  ],
  signes: `Avant que le bouchon ne se forme complètement, plusieurs signaux précoces méritent attention. L&apos;eau met plus de temps qu&apos;habituellement à s&apos;évacuer dans l&apos;évier, le bac de douche ou la baignoire. Un gargouillis apparaît dans le siphon après chaque vidange. Une légère odeur d&apos;égout se dégage de façon intermittente. Dans les maisons avec jardin, une zone de sol anormalement humide près d&apos;une canalisation enterrée peut indiquer une fuite liée à une infiltration de racines. Intervenir à ce stade précoce coûte toujours moins cher qu&apos;attendre un bouchon complet avec reflux.`,
  conseils: `Quelques habitudes simples prolongent la durée de vie des canalisations, surtout dans le Var où l&apos;eau calcaire accélère le colmatage. Ne versez jamais d&apos;huiles de cuisson dans l&apos;évier : stockez-les dans un contenant hermétique pour les déposer en déchetterie. Utilisez un détartrant liquide compatible canalisations une fois par mois pour limiter les dépôts. Évitez les lingettes dans les WC, même celles dites biodégradables. Pour les maisons avec jardin, planifiez un hydrocurage préventif du réseau extérieur tous les deux ans : dans le Var, l&apos;eau calcaire et les racines forment une combinaison particulièrement agressive pour les conduites.`,
  tarif: `Le débouchage au furet motorisé est facturé à partir de 99 € TTC, déplacement inclus. L&apos;hydrocurage haute pression, recommandé pour les dépôts de calcaire et les graisses, est à partir de 199 € TTC. L&apos;inspection par caméra endoscopique est disponible seule à 110 € TTC ou incluse dans l&apos;intervention complète. Le déplacement est toujours inclus dans le tarif annoncé. Nous communiquons un prix fixe par téléphone avant d&apos;intervenir : aucun supplément ne peut être ajouté sans votre accord préalable. Devis gratuit sur simple appel.`
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
