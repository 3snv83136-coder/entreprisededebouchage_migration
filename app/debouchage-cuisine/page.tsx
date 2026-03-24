import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-cuisine';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    question: `Les graisses de cuisine sont-elles vraiment si dangereuses pour les canalisations ?`,
    answer: `Oui, c'est la première cause de bouchon en cuisine. Les graisses chaudes semblent liquides au moment du rinçage, mais elles se solidifient en refroidissant et tapissent progressivement les parois internes. En hiver, ce phénomène est encore plus rapide dans le Var où les canalisations encastrées subissent les écarts de température. Un dépôt graisseux réduit le diamètre utile de la canalisation jusqu'à l'obturation complète.`,
  },
  {
    question: `Quel est le coût d'un débouchage cuisine ?`,
    answer: `Nous intervenons à partir de 99 € pour un débouchage cuisine dans le Var. Ce tarif couvre le déplacement, le diagnostic, le débouchage par furetage ou hydrocurage selon l'importance du bouchon, et le test d'écoulement final. Résultat garanti ou nouvelle intervention sans supplément.`,
  },
  {
    question: `Sous quel délai intervenez-vous pour un évier de cuisine bouché ?`,
    answer: `Nous intervenons en urgence le jour même dans tout le Var, 7j/7 et 24h/24. Pour un bouchon d'évier cuisine, le délai est généralement de 1 à 3 heures après votre appel selon votre localisation.`,
  },
  {
    question: `Mon lave-vaisselle est raccordé à l'évier — faut-il déboucher les deux en même temps ?`,
    answer: `Dans la grande majorité des installations, le lave-vaisselle se raccorde au siphon de l'évier, et les deux partagent la même évacuation commune. Si vous avez un bouchon dans cette canalisation commune, le lave-vaisselle ne videra pas non plus. Nous traitons systématiquement l'ensemble du réseau pour éviter une récidive rapide.`,
  },
  {
    question: `Comment entretenir les canalisations de cuisine pour éviter les bouchons ?`,
    answer: `Versez un dégraissant biologique mensuel directement dans la bonde de l'évier — les bactéries digèrent les graisses résiduelles sans abîmer les canalisations. Évitez absolument de verser des huiles de cuisson dans l'évier, même avec un filet d'eau chaude. Pour les professionnels de la restauration, l'installation d'un bac dégraisseur homologué est obligatoire et efficace.`,
  },
];

const content = {
  intro: `La cuisine est la principale source de bouchons dans un logement. Graisses de cuisson, huiles alimentaires, résidus organiques et calcaire s'accumulent progressivement dans les canalisations, surtout en hiver lorsque les graisses se solidifient plus vite. Dans le Var, la dureté de l'eau aggrave l'encrassement : le calcaire se mêle aux dépôts graisseux et forme des bouchons très tenaces. L'évier, le lave-vaisselle et leur évacuation commune sont les zones les plus touchées. Mondor Débouchage intervient dans tout le Var à partir de 99 €, résultat garanti. Nos techniciens maîtrisent les techniques spécifiques aux bouchons graisseux — hydrocurage haute pression et produits professionnels de dissolution — là où les produits du commerce échouent.`,
  problems: `Un bouchon de cuisine s'installe rarement d'un coup. Le signal d'alerte est un écoulement de plus en plus lent sous l'évier, puis une eau qui stagne plusieurs minutes avant de disparaître. Vient ensuite l'odeur caractéristique de graisse rance ou de grillon brûlé qui remonte des canalisations. Si votre lave-vaisselle partage la même évacuation et commence à ne plus se vider complètement, le bouchon est déjà bien installé dans la canalisation commune. Plus on attend, plus le bouchon est dur et profond.`,
  intervention: `Pour les bouchons graisseux, l'hydrocurage est la méthode de référence : le jet haute pression à 150 bars décolle les dépôts sur toute la circumférence interne de la canalisation et rétablit le plein diamètre. Pour les bouchons moins avancés, le furetage motorisé suffit. Nous traitons systématiquement le siphon, l'évacuation de l'évier, le raccordement du lave-vaisselle et la canalisation commune jusqu'au regard pour éviter toute récidive rapide.`,
  tarif: `Débouchage cuisine à partir de 99 € dans le Var. Tarif fixe, sans surprise, comprenant le déplacement, le diagnostic, l'intervention et le test final. Résultat garanti — si l'écoulement n'est pas rétabli, nous revenons sans supplément.`,
  steps: [
    {
      name: `Nettoyage et démontage du siphon cuisine`,
      text: `Le technicien commence par démonter le siphon sous l'évier et nettoyer manuellement les dépôts de graisse et de tartre accumulés. Cette étape permet aussi de vérifier l'état du siphon et d'identifier si le bouchon est localisé en amont ou plus loin dans la canalisation.`,
    },
    {
      name: `Dissolution des graisses avec produit professionnel`,
      text: `Un produit professionnel de dissolution des graisses est injecté dans la canalisation. Contrairement aux déboucheurs du commerce, ces solutions concentrées attaquent chimiquement les dépôts graisseux solidifiés sans abîmer les conduits PVC ou fonte. Un temps de contact est respecté pour maximiser l'efficacité.`,
    },
    {
      name: `Furetage ou hydrocurage de l'évacuation`,
      text: `Selon l'importance du bouchon, le technicien utilise le furet motorisé pour percer et extraire le bouchon, ou l'hydrocureur haute pression pour nettoyer intégralement les parois sur toute la longueur de la canalisation jusqu'au raccord collectif. L'hydrocurage est privilégié pour les bouchons graisseux anciens.`,
    },
    {
      name: `Test d'écoulement et rinçage chaud`,
      text: `Une fois la canalisation dégagée, le technicien effectue un test d'écoulement avec un fort débit d'eau chaude pour vérifier que le flux est rétabli sur toute la longueur. Le siphon est remonté, la bonde vérifiée, et le client constate lui-même le résultat avant la fin de l'intervention.`,
    },
  ],
  signes: `Trois signaux ne trompent pas : de l'eau stagnante qui s'accumule sous l'évier ou dans le bac, une odeur de graisse rance ou de grillon brûlé qui remonte de la bonde même lorsque vous n'êtes pas en train de cuisiner, et un lave-vaisselle qui ne se vide pas complètement en fin de cycle — signe que la canalisation commune est obstruée.`,
  conseils: `Ne versez jamais d'huile de cuisson dans l'évier, même en filet avec de l'eau chaude : l'huile refroidit très vite dans la canalisation et se solidifie en bouchon. Utilisez un dégraissant biologique mensuel directement dans la bonde pour digérer les résidus organiques. Si vous gérez un restaurant ou une cuisine professionnelle, l'installation d'un bac dégraisseur (séparateur de graisses) est obligatoire réglementairement et réduit drastiquement les interventions d'urgence.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
