import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-salle-de-bain';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    "question": "Peut-on traiter tous les sanitaires de la salle de bain en une visite ?",
    "answer": "Oui, c'est même recommandé. Si un sanitaire est bouché, les autres sont souvent en voie de l'être. Un traitement complet est plus efficace et économique."
  },
  {
    "question": "Le calcaire peut-il boucher une canalisation de salle de bain ?",
    "answer": "Oui, surtout dans le Var où l'eau est très calcaire. Le tartre réduit progressivement le diamètre des canalisations jusqu'à les obstruer."
  },
  {
    "question": "Faut-il un adoucisseur d'eau pour éviter les bouchons ?",
    "answer": "C'est recommandé dans le Var. Un adoucisseur réduit le calcaire et prolonge la durée de vie de vos canalisations."
  },
  {
    "question": "Est-il plus économique de faire intervenir sur toute la salle de bain plutôt qu'équipement par équipement ?",
    "answer": "Oui, clairement. Une visite unique pour traiter douche, baignoire et lavabo en même temps est bien moins coûteuse que trois interventions séparées. Le déplacement et le diagnostic ne sont facturés qu'une fois, et le technicien optimise son intervention globale. Appelez-nous pour obtenir un tarif précis avant toute intervention."
  },
  {
    "question": "Comment savoir si le bouchon est local ou en aval dans la canalisation commune ?",
    "answer": "C'est simple : si un seul équipement évacue mal (par exemple uniquement la douche), le bouchon est local, dans son siphon ou sa canalisation directe. En revanche, si plusieurs équipements évacuent mal en même temps — douche lente ET lavabo lent — le bouchon se trouve dans la canalisation commune en aval, là où toutes les évacuations se rejoignent. Notre diagnostic initial détermine précisément la localisation avant toute intervention."
  }
];

const content = {
  intro: `Une salle de bain regroupe plusieurs sources de bouchons distinctes : la douche et la baignoire accumulent cheveux et savon, le lavabo reçoit dentifrice, savon liquide et résidus de rasage, et l'évacuation au sol collecte le tout. Dans le Var, l'eau calcaire (TH élevé) aggrave chacun de ces points en déposant du tartre sur les parois des siphons et canalisations. Plutôt que de gérer ces problèmes un par un, notre service de débouchage salle de bain prend en charge l'ensemble du réseau en une seule visite : diagnostic complet de tous les équipements, débouchage prioritaire de l'obstruction principale, traitement de tous les siphons et raccords. Avec 19 ans d&apos;expérience dans le Var, nous intervenons vite et garantissons le résultat.`,
  problems: `Les bouchons de salle de bain sont causés par l'accumulation de cheveux mélangés au savon, formant un bouchon compact et collant. Le calcaire, très présent dans l'eau du Var, aggrave le problème en réduisant le diamètre des canalisations. Si plusieurs sanitaires de la salle de bain s'écoulent mal en même temps, le bouchon est probablement dans la canalisation commune.`,
  intervention: `Nous traitons l'ensemble de la salle de bain en une seule visite. Pour chaque sanitaire, nous vérifions le siphon, passons le furet dans la canalisation et utilisons l'hydrocurage si nécessaire. Nous nettoyons également les bondes et grilles pour prévenir les prochains bouchons.`,
  tarif: `Le débouchage de salle de bain peut concerner un seul sanitaire ou l'ensemble de la pièce. Le tarif est adapté en conséquence. Nous vous donnons un prix fixe avant toute intervention.`,
  steps: [
    {
      name: "Inspection globale de tous les équipements (douche, baignoire, lavabo)",
      text: "Le technicien commence par tester l'écoulement de chaque équipement de la salle de bain : douche, baignoire, lavabo, évacuation au sol. Ce diagnostic global permet de distinguer les bouchons locaux (un seul équipement concerné) des bouchons en aval dans la canalisation commune (plusieurs équipements simultanément ralentis). La localisation précise du ou des bouchons détermine le plan d'intervention."
    },
    {
      name: "Débouchage prioritaire (équipement le plus obstrué)",
      text: "Le technicien traite en premier l'équipement le plus obstrué ou celui dont le bouchon bloque l'ensemble du réseau. Selon la nature du bouchon — cheveux dans la bonde de douche, graisse dans le lavabo, calcaire dans la canalisation commune — la technique adaptée est choisie : extraction mécanique, furet motorisé ou hydrocurage haute pression."
    },
    {
      name: "Traitement de tous les siphons et raccords",
      text: "Une fois le bouchon principal résolu, le technicien inspecte et nettoie tous les siphons de la salle de bain, même ceux qui évacuent encore correctement. Cette étape préventive est essentielle : un siphon partiellement encrassé deviendra bouché dans les semaines suivantes. Les joints sont vérifiés et les grilles nettoyées intégralement."
    },
    {
      name: "Test global et conseils d'entretien",
      text: "Avant de partir, le technicien effectue un test complet de tous les équipements : plusieurs litres d'eau sont versés simultanément pour vérifier que l'ensemble du réseau évacue normalement et sans gargouillis. Des conseils personnalisés d'entretien sont fournis selon la configuration de votre salle de bain et la qualité de l'eau dans votre secteur du Var."
    }
  ],
  signes: `Deux situations bien distinctes à reconnaître pour appeler au bon moment : si plusieurs équipements évacuent mal simultanément — douche lente et lavabo lent en même temps — le bouchon se trouve dans la canalisation commune en aval, là où toutes les évacuations convergent avant de rejoindre le réseau collectif ; c'est une situation qui nécessite une intervention globale. En revanche, si un seul équipement évacue mal pendant que les autres fonctionnent normalement, le bouchon est local, limité au siphon ou à la canalisation directe de cet équipement. Dans les deux cas, une intervention rapide évite que le bouchon partiel ne devienne un blocage total.`,
  conseils: `Pour maintenir votre salle de bain en bon état durablement, adoptez un entretien mensuel global : versez un détartrant naturel (acide citrique ou vinaigre blanc dilué) dans chacune des évacuations — douche, baignoire, lavabo — et laissez agir 20 minutes avant de rincer à l'eau chaude. Ce geste mensuel ralentit significativement les dépôts calcaires dans le Var. Posez également un filtre sur toutes les évacuations : grille attrape-cheveux sur la bonde de douche et de baignoire, tamis fin sur le lavabo. Nettoyez ces filtres chaque semaine. Ces deux habitudes réduisent de 80 à 90% le risque de bouchon récurrent.`
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
