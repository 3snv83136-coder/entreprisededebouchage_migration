import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-evier-lavabo';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    "question": "Le vinaigre et le bicarbonate suffisent-ils pour déboucher un évier ?",
    "answer": "Pour un léger ralentissement oui, mais pour un vrai bouchon non. Ces solutions maison ne font que déplacer le problème. Un furet professionnel est nécessaire."
  },
  {
    "question": "Mon évier de cuisine sent mauvais, est-ce un bouchon ?",
    "answer": "Souvent oui. Les graisses accumulées dans le siphon et les canalisations fermentent et produisent des odeurs. Un nettoyage en profondeur résout le problème."
  },
  {
    "question": "Faut-il remplacer le siphon si l'évier est bouché ?",
    "answer": "Rarement. Dans 95% des cas, un nettoyage suffit. Le remplacement n'est envisagé que si le siphon est fissuré ou trop entartré."
  },
  {
    "question": "Peut-on déboucher un évier soi-même ?",
    "answer": "Pour un bouchon superficiel dans le siphon, il est possible de démonter le siphon et de le nettoyer soi-même. En revanche, si le bouchon est plus profond dans la canalisation, les ventouses et produits du commerce sont insuffisants. Un furet motorisé ou un hydrocurage professionnel est alors indispensable pour ne pas aggraver la situation."
  },
  {
    "question": "Pourquoi l'évier sent mauvais même quand il évacue ?",
    "answer": "Une mauvaise odeur persistante malgré un écoulement normal indique généralement un dépôt de graisses ou de matières organiques collées aux parois du siphon ou de la canalisation. Ces résidus fermentent et dégagent des odeurs sulfureuses. Un nettoyage en profondeur du siphon et un hydrocurage de la canalisation éliminent définitivement le problème."
  }
];

const content = {
  intro: `Dans le Var, les éviers de cuisine et lavabos de salle de bain font face à une double agression : le calcaire naturellement présent dans l'eau du département et l'accumulation quotidienne de graisses de cuisson, résidus alimentaires, savon et cheveux. Ces dépôts s'installent d'abord dans le siphon — pièce démontable sous l'évier — puis progressent dans la canalisation d'évacuation. Selon la profondeur du bouchon, l'intervention varie : nettoyage et remontage du siphon pour les cas simples, furet motorisé pour atteindre un bouchon à mi-parcours, hydrocurage haute pression pour décoller les dépôts calcaires et graisseux incrustés en profondeur. Intervention à 99€, résultat garanti.`,
  problems: `Un évier qui s'écoule lentement est le premier signe d'un bouchon en formation. Si vous constatez de l'eau stagnante, des mauvaises odeurs ou des gargouillis, il est temps d'intervenir. Les graisses de cuisine sont la première cause de bouchon d'évier, suivies par les cheveux et le savon pour les lavabos de salle de bain.`,
  intervention: `Pour un évier bouché, nous commençons par le siphon : démontage, nettoyage et remontage. Si le bouchon est plus profond, nous utilisons un furet motorisé pour atteindre l'obstruction dans la canalisation. Pour les cas les plus tenaces, l'hydrocurage haute pression décolle les dépôts de graisse et de calcaire accumulés sur les parois.`,
  tarif: `Le débouchage d'évier et lavabo fait partie de nos interventions les plus accessibles. Le tarif varie selon que le bouchon est dans le siphon (intervention rapide) ou plus profond dans la canalisation.`,
  steps: [
    {
      name: "Démontage et nettoyage du siphon",
      text: "Le technicien commence par placer un seau sous le siphon avant de le dévisser. Le siphon est nettoyé intégralement : toutes les graisses, calcaire et résidus collés sont retirés mécaniquement. Cette étape résout à elle seule la majorité des bouchons d'évier et de lavabo."
    },
    {
      name: "Débouchage du raccord d'évacuation",
      text: "Si le bouchon ne se situe pas dans le siphon mais dans le raccord d'évacuation mural (à 20-50 cm de profondeur), le technicien utilise un outil spécifique pour nettoyer ce segment sans démonter la plomberie. Les dépôts de calcaire et de graisse incrustés sur les parois sont décollés."
    },
    {
      name: "Furetage ou hydrocurage si nécessaire",
      text: "Pour les bouchons situés plus loin dans la canalisation commune, deux options selon la situation : le furet motorisé perce mécaniquement le bouchon, l'hydrocurage haute pression (150 bars) projette un jet d'eau qui décolle et évacue tous les dépôts sur toute la longueur de la canalisation. Technique recommandée en cas de graisses très incrustées ou de calcaire avancé."
    },
    {
      name: "Test d'écoulement et remontage",
      text: "Avant de remonter le siphon, le technicien verse plusieurs litres d'eau pour vérifier que l'écoulement est parfait et qu'il n'y a plus de ralentissement. Le siphon est remonté avec les joints vérifiés, et un dernier test confirme l'absence de fuite. Le résultat est garanti."
    }
  ],
  signes: `Trois signaux qui indiquent que votre évier ou lavabo a besoin d'une intervention professionnelle : l'eau met plus de 30 secondes à s'évacuer complètement après utilisation, une odeur désagréable persiste dans votre cuisine ou salle de bain même après un nettoyage classique, ou vous constatez que des résidus noirs ou gras remontent à la surface de l'eau stagnante. Ce dernier signe est particulièrement révélateur d'un dépôt de graisse fermentée dans le siphon ou la canalisation.`,
  conseils: `Pour éviter les bouchons récurrents sur votre évier ou lavabo, trois gestes simples et efficaces : installez une grille de protection sur la bonde pour retenir les résidus solides avant qu'ils n'entrent dans le siphon, effectuez un détartrage mensuel avec de l'acide citrique dilué dans l'eau chaude (particulièrement utile dans le Var où l'eau est très calcaire), et évitez absolument de verser des huiles ou graisses de cuisson dans l'évier — même diluées à l'eau chaude, elles se solidifient en refroidissant dans la canalisation et forment des bouchons tenaces.`
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
