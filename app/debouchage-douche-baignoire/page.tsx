import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-douche-baignoire';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    "question": "Comment éviter les bouchons de douche ?",
    "answer": "Installez une grille attrape-cheveux sur la bonde. C'est simple, pas cher et ça évite 80% des bouchons. Nettoyez-la chaque semaine."
  },
  {
    "question": "Mon bac de douche déborde, est-ce urgent ?",
    "answer": "Si l'eau ne s'écoule plus du tout, oui. L'eau stagnante peut s'infiltrer sous le bac et causer des dégâts. Appelez-nous rapidement."
  },
  {
    "question": "Intervenez-vous sur les douches à l'italienne ?",
    "answer": "Oui, nous intervenons sur tous types de douches, y compris les douches à l'italienne avec caniveau ou bonde de sol."
  },
  {
    "question": "Le calcaire peut-il bloquer une douche ou baignoire dans les Bouches-du-Rhône ?",
    "answer": "Absolument. L'eau des Bouches-du-Rhône affiche une dureté de 25 à 35°f (degrés français) selon les secteurs, ce qui en fait une eau très calcaire. Le tartre se dépose sur les parois du siphon de sol et dans les canalisations, réduisant progressivement le diamètre de passage. Combiné aux cheveux et au savon, il forme des bouchons particulièrement denses qui nécessitent un détartrage professionnel."
  },
  {
    "question": "Quelle est la fréquence idéale d'entretien pour une douche ?",
    "answer": "Dans les Bouches-du-Rhône, nous recommandons de nettoyer la grille de bonde chaque semaine et de détartrer le siphon de sol tous les 3 mois avec du vinaigre blanc bouillant. Ce geste préventif simple évite 90% des bouchons et prolonge la durée de vie de vos canalisations. Un hydrocurage professionnel tous les 2-3 ans est également conseillé."
  }
];

const content = {
  intro: `Douches et baignoires des Bouches-du-Rhône sont confrontées à un ennemi redoutable : la combinaison cheveux, savon et calcaire. Avec une dureté de l'eau atteignant 25 à 35°f dans le département selon les secteurs, le tartre se dépose rapidement sur les parois du siphon de sol et dans les canalisations d'évacuation. Ajoutez à cela les cheveux qui s'enchevêtrent et le savon qui les agglomère en masse compacte, et vous obtenez un bouchon dont ni la ventouse ni les produits du commerce ne peuvent venir à bout. Nos techniciens interviennent avec du matériel professionnel adapté : extraction mécanique des cheveux et résidus, détartrage du siphon, hydrocurage haute pression si le bouchon est profond. Intervention à partir de 110€, résultat garanti.`,
  problems: `Les signes d'un bouchon de douche ou baignoire : eau qui stagne pendant la douche, écoulement de plus en plus lent, mauvaises odeurs, gargouillis dans la bonde. Les cheveux longs combinés au savon forment un bouchon particulièrement tenace qui ne peut pas être résolu avec une ventouse classique.`,
  intervention: `Nous intervenons en plusieurs étapes : retrait de la grille ou bonde, extraction manuelle des résidus visibles, passage du furet pour les bouchons profonds, et nettoyage de la canalisation. Pour les baignoires anciennes avec des canalisations en fonte, nous adaptons notre technique pour éviter tout dommage.`,
  tarif: `Le débouchage de douche et baignoire est une intervention courante et accessible. Le tarif dépend de l'accessibilité de la bonde et de la profondeur du bouchon.`,
  steps: [
    {
      name: "Retrait et nettoyage de la grille de bonde",
      text: "Le technicien retire la grille de bonde ou le cache de siphon de sol pour accéder directement à l'accumulation de résidus. La grille est nettoyée intégralement : calcaire, savon solidifié et débris sont retirés. Ce premier accès permet déjà d'évaluer la profondeur du bouchon et de choisir la technique adaptée."
    },
    {
      name: "Extraction mécanique des cheveux et résidus",
      text: "À l'aide d'un outil de débouchage spécifique (crochet de débouchage ou furet souple), le technicien extrait mécaniquement la masse de cheveux et de savon accumulée dans le siphon de sol ou sous la bonde. Cette étape seule suffit dans la grande majorité des cas, car c'est là que se forme le bouchon principal."
    },
    {
      name: "Détartrage du siphon de sol",
      text: "Dans les Bouches-du-Rhône, l'eau très calcaire (TH 25-35°f) dépose une couche de tartre sur les parois internes du siphon qui réduit progressivement son diamètre. Le technicien procède au détartrage mécanique ou chimique du siphon pour retrouver le plein débit d'origine. Cette étape est particulièrement importante pour prévenir les récidives rapides."
    },
    {
      name: "Hydrocurage si bouchon profond",
      text: "Si le bouchon se situe dans la canalisation au-delà du siphon, ou si des dépôts persistent sur les parois, le technicien utilise l'hydrocurage haute pression. Un jet d'eau à 150 bars est injecté dans la canalisation : il décolle et emporte tous les résidus calcaires et savonneux jusqu'au réseau collectif. L'écoulement est ensuite testé avec plusieurs litres d'eau pour confirmer le résultat."
    }
  ],
  signes: `Trois signaux révélateurs d'un bouchon de douche ou baignoire nécessitant une intervention professionnelle : l'eau stagne dans le bac de douche pendant plus d'une minute après avoir fermé le robinet, vous entendez un sifflement ou un gargouillis à l'évacuation lorsque l'eau s'écoule (signe d'un passage partiel dans une canalisation partiellement obstruée), une odeur d'humidité persistante se dégage du siphon de sol même en dehors des douches, indiquant la présence de matières organiques en décomposition.`,
  conseils: `Pour protéger votre douche ou baignoire contre les bouchons récurrents, adoptez trois habitudes simples : posez un filtre à cheveux sur la bonde — c'est la mesure la plus efficace, elle intercepte 80% des cheveux avant qu'ils n'atteignent le siphon, à nettoyer chaque semaine ; détartrez le siphon de sol tous les 3 mois en versant du vinaigre blanc bouillant directement dans la bonde, laissez agir 15 minutes puis rincez à l'eau chaude ; enfin, un traitement anti-calcaire hebdomadaire léger (vinaigre blanc dilué) ralentit significativement les dépôts dans un département aussi calcaire que les Bouches-du-Rhône.`
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
