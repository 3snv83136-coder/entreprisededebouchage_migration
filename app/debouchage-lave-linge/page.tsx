import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-lave-linge';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    question: `Mon lave-linge affiche F21 ou E21 en cours de cycle — que faire ?`,
    answer: `Ce code erreur signale une défaillance de vidange : la pompe n'arrive pas à évacuer l'eau dans le temps imparti. Commencez par vidanger manuellement via le filtre de pompe (trappe en bas à droite de la machine) et nettoyez le filtre. Si le code réapparaît au cycle suivant, le problème est dans la pompe ou dans le flexible d'évacuation — appelez un technicien.`,
  },
  {
    question: `Comment accéder au filtre de pompe d'un lave-linge ?`,
    answer: `Le filtre est situé derrière une petite trappe en bas à droite de la machine. Posez une serpillière et un récipient plat avant d'ouvrir : de l'eau va s'écouler. Dévissez lentement le filtre dans le sens antihoraire. Retirez les peluches, pièces de monnaie et autres débris. Revissez fermement avant de relancer un cycle.`,
  },
  {
    question: `Le calcaire bouche-t-il vraiment la pompe d'un lave-linge ?`,
    answer: `Dans le Var, où l'eau titre autour de 35°f de dureté, oui. Le calcaire se dépose sur les parois de la pompe, réduit le débit de vidange et fragilise la roue. À terme, la pompe force davantage, s'échauffe et finit par lâcher prématurément. Utiliser un anticalcaire à chaque cycle et détartrer régulièrement la machine prolonge sa durée de vie significativement.`,
  },
  {
    question: `Peut-on déboucher soi-même la canalisation d'évacuation d'un lave-linge ?`,
    answer: `Le filtre et le flexible de sortie sont accessibles à un non-professionnel. En revanche, si le bouchon est dans la canalisation murale, il faut un furet ou un hydrocureur — outils professionnels. Tenter de forcer avec un tuyau risque de déboîter le raccord et de provoquer une fuite derrière la machine.`,
  },
  {
    question: `Quel est le tarif pour un débouchage lave-linge dans le Var ?`,
    answer: `Le débouchage du circuit de vidange d'un lave-linge est facturé à partir de 99 € dans le Var. Ce tarif comprend le déplacement, la vidange manuelle, le nettoyage du filtre et de la pompe, le débouchage du flexible et de la canalisation si nécessaire, et le test de cycle d'essorage complet avant départ.`,
  },
];

const content = {
  intro: `Un lave-linge qui s'arrête en plein cycle avec de l'eau en fond de tambour affiche souvent le code erreur F21 ou E21 : la pompe de vidange ne parvient pas à évacuer l'eau à temps. Dans le Var, où la dureté de l'eau avoisine 35°f, le calcaire encroûte progressivement la pompe et réduit le diamètre interne du flexible d'évacuation, aggravant les problèmes de vidange. Le filtre de pompe obstrué par des peluches, des pièces de monnaie ou des fibres synthétiques est la cause la plus fréquente. Mondor Débouchage intervient dans tout le Var à partir de 99 € pour rétablir la vidange complète — filtre, pompe et canalisation — avec un test de cycle d'essorage validé sur place avant départ.`,
  problems: `Les problèmes de vidange d'un lave-linge sont souvent cumulatifs : le filtre de pompe se bouche progressivement par les peluches et fibres, ce qui force la pompe à travailler en surchauffe. Simultanément, le calcaire de l'eau dure varoise encroûte la roue de pompe et le flexible d'évacuation. Le résultat : la machine s'arrête en cours de cycle avec un code erreur pompe, de l'eau restante en fond de tambour, et parfois des claquements caractéristiques indiquant que la roue de pompe racle un corps étranger (pièce de monnaie, bouton, agrafes métalliques).`,
  intervention: `Le technicien commence par une vidange manuelle via le filtre de pompe pour récupérer l'eau restante, puis nettoie et inspecte le filtre. La pompe est inspectée et dégagée si un corps étranger est coincé dans l'hélice. Le flexible d'évacuation est vérifié pour détecter un coudage excessif ou un bouchon interne. Si la canalisation murale est obstruée, un furet motorisé est utilisé. Un test complet du cycle d'essorage valide l'intervention sur place.`,
  tarif: `Débouchage lave-linge à partir de 99 € dans le Var, déplacement inclus. Tarif fixe annoncé avant intervention. Test de cycle d'essorage complet effectué sur place avant départ.`,
  steps: [
    {
      name: `Vidange manuelle par le filtre de vidange`,
      text: `Avant toute intervention, le technicien vide manuellement l'eau stagnante via le filtre de pompe situé en bas de machine. Cette étape évite les déversements et permet un premier diagnostic visuel : couleur de l'eau, présence de corps étrangers visibles dans le filtre, odeur de brûlé signalant une surchauffe de pompe.`,
    },
    {
      name: `Nettoyage du filtre et de la pompe de vidange`,
      text: `Le filtre est retiré, nettoyé sous eau chaude et inspecté pour détecter des obstructions résiduelles. La cavité de pompe est inspectée — les corps étrangers coincés dans l'hélice (pièces, agrafes, fragments plastiques) sont retirés manuellement. La roue de pompe est testée en rotation pour confirmer qu'elle tourne librement sans frottement.`,
    },
    {
      name: `Vérification et débouchage du flexible d'évacuation`,
      text: `Le flexible d'évacuation, souvent soumis à des coudes serrés derrière la machine, est inspecté pour détecter des plis ou des dépôts internes. Les dépôts graisseux et calcaires sont éliminés. Si la canalisation murale de destination est bouchée, un furet motorisé est introduit jusqu'au dégagement complet du flux.`,
    },
    {
      name: `Test cycle essorage complet`,
      text: `Un cycle d'essorage complet est lancé sous surveillance pour vérifier que la vidange s'effectue correctement, que le code erreur ne réapparaît pas et qu'aucun bruit anormal ne persiste. Le technicien reste jusqu'à la fin du cycle avant de valider l'intervention et de partir.`,
    },
  ],
  signes: `Quatre signaux alertent sur un problème de vidange lave-linge : la machine s'arrête en cours de cycle sans terminer le programme, un code erreur pompe apparaît sur le bandeau de commande (F21, E21 ou équivalent selon la marque), de l'eau est visible en fond de tambour après la fin du cycle, et des bruits de claquement ou de raclement se produisent lors des phases de vidange — signe qu'un corps étranger est coincé dans la roue de pompe.`,
  conseils: `Nettoyez le filtre de pompe tous les 3 mois : c'est un geste simple qui prévient 80 % des pannes de vidange. Dans le Var, l'eau est très dure — ajoutez un anticalcaire liquide à chaque cycle pour protéger la pompe et le flexible de l'encrassement calcaire. Lancez un cycle de détartrage à vide à 60 °C ou 90 °C une fois par mois avec un sachet de détartrant ménager pour dissoudre les dépôts accumulés dans tout le circuit de lavage et de vidange.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
