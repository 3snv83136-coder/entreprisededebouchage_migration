import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-ballon-deau-chaude-chauffe-eau';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    question: `À quelle fréquence faut-il détartrer un ballon d'eau chaude dans le Var ?`,
    answer: `Dans le Var, la dureté de l'eau atteint 35°f — parmi les plus élevées de France. Nous recommandons un détartrage annuel pour maintenir le rendement du ballon et éviter l'entartrage de la résistance. Sans entretien, un dépôt de tartre de 3 mm sur la résistance augmente la consommation électrique de 20 % et réduit la durée de vie du ballon de moitié.`,
  },
  {
    question: `Pourquoi mon eau chaude est-elle tiède même avec le thermostat au maximum ?`,
    answer: `Une eau qui n'atteint plus la température réglée malgré un thermostat au maximum indique presque toujours une résistance entartrée. La couche de calcaire agit comme un isolant thermique : la résistance chauffe mais la chaleur ne se transfère plus efficacement à l'eau. Le détartrage rétablit rapidement les performances normales.`,
  },
  {
    question: `Mon groupe de sécurité fuit en permanence — est-ce grave ?`,
    answer: `Une fuite permanente du groupe de sécurité (soupape de sécurité) peut indiquer deux choses : soit la pression dans le ballon est trop élevée en raison d'un entartrage du circuit, soit le groupe de sécurité lui-même est encrassé et ne se ferme plus correctement. Dans les deux cas, il faut intervenir rapidement — un groupe défaillant ne protège plus le ballon contre les surpressions.`,
  },
  {
    question: `Un adoucisseur d'eau suffit-il à protéger le ballon dans le Var ?`,
    answer: `Un adoucisseur sur l'arrivée d'eau froide du ballon réduit significativement l'entartrage. Cependant, l'installation et la maintenance d'un adoucisseur représentent un investissement. Pour les particuliers, un filtre anticalcaire à polyphosphates sur l'arrivée d'eau froide est une alternative économique efficace qui ralentit l'entartrage sans nécessiter de sel régénérant.`,
  },
  {
    question: `Quel est le tarif pour le détartrage et débouchage d'un ballon d'eau chaude ?`,
    answer: `Nous intervenons à partir de 110 € pour le détartrage et la remise en état du circuit de sécurité d'un ballon d'eau chaude dans le Var. Depuis 19 ans, nos techniciens traitent tous les types de ballons — électriques verticaux et horizontaux, thermodynamiques, chauffe-eau instantanés au gaz — avec les mêmes garanties de résultat.`,
  },
];

const content = {
  intro: `Dans le Var, la dureté de l'eau atteint 35°f — un niveau parmi les plus élevés de France. Cette eau très calcaire entartre progressivement la résistance électrique, le groupe de sécurité et la tuyauterie de votre ballon d'eau chaude ou chauffe-eau. Résultat : eau tiède, consommation électrique en hausse, bruits de claquement à la chauffe et fuite du groupe de sécurité. Mondor Débouchage intervient depuis 19 ans dans tout le Var pour le détartrage complet, le rinçage et l'entretien du groupe de sécurité. Nos interventions débutent à partir de 110 €, déplacement inclus, avec un test de pression et de température réalisé sur place avant départ pour garantir le bon fonctionnement de votre installation.`,
  problems: `Un ballon d'eau chaude entartré présente des symptômes progressifs et reconnaissables. La pression de l'eau chaude aux robinets baisse progressivement car le dépôt de calcaire réduit le diamètre interne des tuyaux de sortie. L'eau n'atteint plus la température souhaitée malgré un thermostat réglé au maximum : la résistance encroûtée de calcaire ne transfère plus efficacement sa chaleur à l'eau. Des bruits de claquement ou de sifflement apparaissent pendant les phases de chauffe — c'est le calcaire qui craque sous l'effet thermique. Le groupe de sécurité commence à goutter en permanence, signe que la pression interne est anormale ou que la soupape est encrassée.`,
  intervention: `Notre intervention suit un protocole complet et sécurisé : coupure de l'alimentation électrique et de l'arrivée d'eau froide, vidange partielle du ballon, détartrage chimique de la résistance et des parois internes, nettoyage et test du groupe de sécurité, vérification de l'anode magnésium, rinçage complet et remise en eau avec test de pression et de température. Durée moyenne : 1 à 2 heures selon le degré d'entartrage et le type de ballon.`,
  tarif: `Détartrage et remise en état de ballon d'eau chaude à partir de 110 € dans le Var. Tarif fixe comprenant le déplacement, l'ensemble de l'intervention et le test de pression et de température final. 19 ans d'expérience sur tous types de ballons électriques, thermodynamiques et chauffe-eau gaz.`,
  steps: [
    {
      name: `Coupure eau froide et vidange partielle du ballon`,
      text: `Le technicien commence par couper l'alimentation électrique du ballon au disjoncteur, puis ferme le robinet d'arrivée d'eau froide. Une vidange partielle est réalisée via le groupe de sécurité pour abaisser la pression interne avant toute ouverture. Cette étape est indispensable pour sécuriser l'intervention et faciliter l'accès à la résistance.`,
    },
    {
      name: `Détartrage chimique de la résistance et des parois`,
      text: `Un produit détartrant professionnel est introduit dans la cuve pour dissoudre les dépôts calcaires sur la résistance blindée et les parois internes. La concentration et le temps de contact sont adaptés au degré d'entartrage constaté. Cette étape rétablit le rendement thermique de la résistance et libère le volume utile de la cuve.`,
    },
    {
      name: `Nettoyage du groupe de sécurité et de l'évacuation`,
      text: `Le groupe de sécurité (soupape, clapet anti-retour, purgeur) est démonté, nettoyé et testé. Les dépôts calcaires qui empêchent une fermeture étanche de la soupape sont éliminés. Le tuyau d'évacuation du groupe, souvent obstrué par des dépôts de calcaire et de rouille, est débouché et vérifié pour garantir un écoulement libre en cas de surpression.`,
    },
    {
      name: `Remise en eau et test de pression et de température`,
      text: `Le ballon est rempli progressivement, l'alimentation électrique rétablie, et la montée en température surveillée jusqu'au premier enclenchement du thermostat. La pression est vérifiée aux points de sortie d'eau chaude. Le technicien contrôle l'absence de fuite sur le groupe de sécurité et la cohérence entre la température de consigne et la température réelle délivrée.`,
    },
  ],
  signes: `Quatre signaux indiquent un ballon d'eau chaude entartré ou un circuit obstrué : une pression d'eau chaude faible aux robinets alors que la pression d'eau froide est normale, une eau tiède même avec le thermostat au réglage maximum, des bruits de claquement ou de crépitement pendant les phases de chauffe (dilatation du calcaire), et une fuite goutte-à-goutte permanente au niveau du groupe de sécurité — signe que la soupape ne se referme plus correctement.`,
  conseils: `Dans le Var, le détartrage annuel de votre ballon d'eau chaude est un investissement qui se rentabilise rapidement sur la facture électrique. Installez un filtre anticalcaire à polyphosphates sur l'arrivée d'eau froide du ballon — c'est la protection la plus économique contre l'entartrage. Faites vérifier le groupe de sécurité chaque année : la réglementation l'impose pour les installations sous pression, et un groupe encrassé ne protège plus votre ballon contre les surpressions.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
