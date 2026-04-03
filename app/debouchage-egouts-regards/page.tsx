import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-egouts-regards';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    question: "Quel est le coût d&apos;un débouchage d&apos;égout ou de regard ?",
    answer: "Le tarif dépend de la longueur de réseau à traiter et de la nature de l&apos;obstruction. Un curage de regard simple démarre à partir de 180 € TTC. Un hydrocurage de réseau extérieur sur 20 mètres est généralement entre 280 € et 450 € TTC. Nous établissons un devis gratuit et fixe par téléphone avant toute intervention."
  },
  {
    question: "Intervenez-vous en urgence pour un refoulement d&apos;égout ?",
    answer: "Oui. Un refoulement d&apos;eaux usées dans une cave, un sous-sol ou un regard constitue une urgence sanitaire. Nous intervenons rapidement dans tout les Bouches-du-Rhône, sept jours sur sept, y compris les week-ends et jours fériés."
  },
  {
    question: "Établissez-vous un rapport pour le SPANC ?",
    answer: "Oui. À l&apos;issue de l&apos;intervention, nous remettons un rapport d&apos;intervention détaillé conforme aux exigences du Service Public d&apos;Assainissement Non Collectif. Ce document précise l&apos;état du réseau, la nature du bouchon et les travaux réalisés."
  },
  {
    question: "Qui est responsable de l&apos;entretien du réseau entre ma maison et le regard de branchement ?",
    answer: "La partie privée du réseau — de votre habitation jusqu&apos;au regard de raccordement sur le domaine public — est entièrement à votre charge. La partie publique relève de la commune. Nous intervenons sur la partie privée et pouvons vous conseiller si la cause du bouchon se situe en aval du regard."
  },
  {
    question: "Combien de temps faut-il prévoir pour un curage de réseau extérieur ?",
    answer: "Pour un réseau standard de maison individuelle (moins de 30 mètres), l&apos;intervention dure entre 1h30 et 3 heures. Les réseaux plus complexes (copropriétés, restaurants, réseaux ramifiés) peuvent nécessiter une demi-journée. Nous estimons la durée lors du devis téléphonique."
  }
];

const content = {
  intro: `Les réseaux d&apos;assainissement extérieurs sont soumis à rude épreuve dans les Bouches-du-Rhône : eau calcaire, sols argileux, végétation dense, et épisodes méditerranéens qui surchargent les collecteurs. Entreprise de Débouchage intervient sur l&apos;intégralité des réseaux privés extérieurs — égouts, regards de visite, boîtes de branchement, collecteurs et fosses — avec un camion hydrocureur haute pression spécialisé dans le traitement des conduites de grand diamètre. Un regard colmaté ou un égout bouché peut provoquer des remontées d&apos;eaux usées dans une cave, un sous-sol ou une terrasse : il s&apos;agit d&apos;une urgence sanitaire qui ne supporte pas l&apos;attente. Notre équipe intervient rapidement dans tout les Bouches-du-Rhône. À l&apos;issue de chaque intervention, nous remettons un rapport d&apos;intervention complet, utilisable dans le cadre d&apos;un contrôle SPANC ou d&apos;une déclaration d&apos;assurance.`,
  problems: `Les égouts et regards se colmatent pour des raisons variées. Dans les maisons avec arbres et haies, les racines s&apos;infiltrent par les joints et fractures des conduites enterrées et forment progressivement un bouchon dense. Dans les immeubles et restaurants, les graisses cuites et les résidus alimentaires se déposent sur les parois, surtout lorsque l&apos;eau est calcaire. Les lingettes — même étiquetées biodégradables — s&apos;accumulent dans les coudes et les regards. Après un fort épisode pluvieux (fréquent en automne dans les Bouches-du-Rhône), les regards peuvent être saturés de terres, de feuilles et de débris. Enfin, les conduites anciennes peuvent présenter des effondrements partiels ou des contre-pentes qui bloquent l&apos;écoulement gravitaire.`,
  intervention: `L&apos;intervention commence par l&apos;ouverture et l&apos;inspection visuelle de chaque regard accessible sur le réseau. Si nécessaire, la caméra endoscopique est introduite pour localiser avec précision l&apos;obstruction et évaluer l&apos;état structural des conduites. Le camion hydrocureur prend ensuite le relais : le jet haute pression décolle les dépôts, déracine les intrusions végétales et homogénéise l&apos;écoulement sur l&apos;ensemble du tronçon traité. Chaque regard et boîte de branchement est curé individuellement, puis les débris extraits sont évacués. Un test d&apos;écoulement final valide le résultat. Nous remettons un rapport d&apos;intervention complet, incluant photos, schéma de réseau et recommandations.`,
  steps: [
    {
      name: "Diagnostic du réseau extérieur",
      text: "Le technicien ouvre les regards accessibles et réalise une inspection visuelle du réseau. Il identifie les zones de rétention, les regards colmatés et évalue si une inspection caméra est nécessaire pour aller plus loin."
    },
    {
      name: "Localisation du bouchon (caméra ou sondage)",
      text: "La caméra endoscopique est introduite dans la conduite pour localiser précisément l&apos;obstruction, mesurer son étendue et identifier sa nature : racines, dépôts, effondrement ou corps étranger. Cette étape oriente le choix des équipements."
    },
    {
      name: "Hydrocurage haute pression du réseau",
      text: "Le camion hydrocureur projette un jet haute pression dans la conduite. Le jet rotatif décolle les dépôts de calcaire et de graisse, sectionne les racines infiltrées et libère les obstructions sur toute la longueur du tronçon traité."
    },
    {
      name: "Curage des regards et boîtes de branchement",
      text: "Chaque regard de visite et boîte de branchement est curé individuellement. Les boues, débris et résidus extraits sont collectés et évacués. Les parois des regards sont nettoyées au jet pour supprimer les dépôts résiduels."
    },
    {
      name: "Test d&apos;écoulement & rapport SPANC si requis",
      text: "Un test d&apos;écoulement complet valide l&apos;intervention sur l&apos;ensemble du réseau. Nous remettons un rapport d&apos;intervention détaillé avec photos et état du réseau, conforme aux exigences SPANC si votre installation relève de l&apos;assainissement non collectif."
    }
  ],
  signes: `Plusieurs signaux précoces indiquent qu&apos;un réseau extérieur est en train de se colmater. Des remontées d&apos;eau apparaissent dans un regard qui déborde lors d&apos;une pluie ordinaire. Une odeur sulfureuse (œuf pourri) se dégage près d&apos;un regard ou d&apos;une zone du jardin, signe de fermentation anaérobie dans le réseau. Le sol autour d&apos;une conduite enterrée est anormalement humide ou affaissé, ce qui peut indiquer une fuite ou un effondrement partiel. En cave ou en sous-sol, un refoulement d&apos;eaux usées — même ponctuel — lors d&apos;une forte pluie est un signal d&apos;alarme à ne pas ignorer.`,
  conseils: `L&apos;entretien régulier d&apos;un réseau extérieur est beaucoup moins coûteux qu&apos;une intervention d&apos;urgence. Ne jetez jamais d&apos;huiles de cuisson, de lingettes ou de produits d&apos;hygiène dans les WC ou les éviers : ils finissent systématiquement dans le réseau extérieur. Planifiez un curage préventif du réseau tous les 3 à 5 ans, ou tous les 2 ans si la maison est entourée d&apos;arbres. Après chaque épisode méditerranéen (pluies intenses en automne dans les Bouches-du-Rhône), vérifiez visuellement vos regards : un seul colmaté par des feuilles ou des terres peut bloquer tout le réseau en aval. Enfin, maintenez les abords des regards dégagés pour faciliter les interventions.`,
  tarif: `Le curage d&apos;un regard simple est facturé à partir de 180 € TTC, déplacement inclus. Un hydrocurage de réseau extérieur est estimé entre 280 € et 450 € TTC selon la longueur à traiter. L&apos;inspection caméra est incluse dans l&apos;intervention complète ou disponible séparément à 110 € TTC. Le rapport d&apos;intervention SPANC est fourni sans supplément. Nous communiquons un devis fixe par téléphone avant d&apos;intervenir — aucun coût additionnel ne peut être appliqué sans votre accord explicite.`
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
