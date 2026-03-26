import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-lave-vaisselle';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    question: `Mon lave-vaisselle affiche E24 ou E20 — est-ce forcément un bouchon ?`,
    answer: `Ces codes erreur signalent un défaut de vidange : l'eau ne s'évacue pas dans le délai prévu par le programme. La cause la plus fréquente est un bouchon dans le flexible d'évacuation ou dans la canalisation de raccordement. Avant d'appeler, vérifiez le filtre de fond de cuve — s'il est propre et que le code persiste, le bouchon est en aval dans la tuyauterie.`,
  },
  {
    question: `Faut-il nettoyer le filtre du lave-vaisselle régulièrement ?`,
    answer: `Oui, idéalement toutes les semaines si vous utilisez votre lave-vaisselle quotidiennement. Le filtre retient les résidus alimentaires qui, s'ils s'accumulent, débordent vers la pompe de vidange et le flexible d'évacuation. Un nettoyage hebdomadaire simple sous l'eau chaude suffit à éviter la plupart des problèmes de vidange.`,
  },
  {
    question: `La pompe de vidange de mon lave-vaisselle est-elle réparable sur place ?`,
    answer: `Si la pompe est simplement obstruée par un corps étranger (fragment d'os, bout de verre, noyau de fruit), nous pouvons la débloquer sur place rapidement. Si la pompe est mécaniquement défaillante, l'intervention relève de la réparation électroménager. Nous vous le signalons clairement avant toute opération.`,
  },
  {
    question: `Quel est le tarif pour déboucher un lave-vaisselle dans le Var ?`,
    answer: `Le débouchage du circuit de vidange d'un lave-vaisselle est facturé à partir de 99 € dans le Var. Ce tarif couvre le déplacement, la vérification du filtre et de la pompe, le débouchage du flexible et de la canalisation de raccordement, et le test de cycle complet avant départ.`,
  },
  {
    question: `Intervenez-vous le jour même pour un lave-vaisselle en panne de vidange ?`,
    answer: `Oui, nous intervenons le jour même dans tout le Var, 7j/7. Pour un lave-vaisselle qui ne vidange pas, le délai est généralement de 1 à 3 heures après votre appel. Le problème est résolu en une seule visite dans la très grande majorité des cas.`,
  },
];

const content = {
  intro: `Un lave-vaisselle qui ne vidange plus est souvent signalé par un code erreur E24 ou E20 sur les appareils modernes. Derrière ce code, il y a presque toujours le même mécanisme : des résidus alimentaires et des graisses ont progressivement encrassé le filtre de fond de cuve, puis la pompe de vidange, et enfin le flexible d'évacuation. Dans le Var, le calcaire aggrave le phénomène en réduisant le diamètre interne du flexible. Mondor Débouchage intervient dans tout le Var à partir de 99 € pour rétablir la vidange complète de votre lave-vaisselle — filtre, pompe et canalisation de raccordement — et réalise un test de cycle complet avant de partir pour vous garantir un résultat durable.`,
  problems: `Le problème de vidange d'un lave-vaisselle a presque toujours une origine mécanique ou hydraulique identifiable : filtre de fond de cuve saturé de résidus alimentaires, pompe de vidange partiellement bloquée par un corps étranger (fragment d'os, bout d'étiquette plastique), flexible d'évacuation coudé ou colmaté par des dépôts graisseux et calcaires, ou bouchon dans la canalisation commune partagée avec l'évier. Le code erreur vidange est le premier signal ; l'eau stagnante en fond de cuve et les mauvaises odeurs à l'ouverture confirment que le problème est installé.`,
  intervention: `Le technicien commence par retirer et nettoyer manuellement le filtre de fond de cuve, puis inspecte et dégage la pompe de vidange. Si le problème persiste, le flexible d'évacuation est déconnecté, inspecté et débouché. La canalisation de raccordement (souvent partagée avec le siphon de l'évier) est furetée si nécessaire. Un test de cycle de vidange complet valide le résultat avant la fin de l'intervention.`,
  tarif: `Débouchage lave-vaisselle à partir de 99 € dans le Var, déplacement inclus. Tarif fixe communiqué avant intervention, sans frais cachés. Test de cycle complet effectué sur place avant départ.`,
  steps: [
    {
      name: `Vérification et nettoyage du filtre fond de cuve`,
      text: `Le filtre cylindrique situé au fond de la cuve est retiré et nettoyé sous eau chaude. Les mailles sont inspectées pour détecter un éventuel colmatage complet ou un endommagement. Cette première étape résout parfois à elle seule le problème de vidange si le filtre est simplement saturé.`,
    },
    {
      name: `Inspection et déblocage de la pompe de vidange`,
      text: `La pompe de vidange est accessible sous le filtre. Le technicien retire les corps étrangers coincés dans l'hélice (fragments osseux, bouts de verre, débris alimentaires durcis) et vérifie que la roue tourne librement. Si la pompe est électriquement défaillante, le client en est informé immédiatement.`,
    },
    {
      name: `Débouchage du flexible d'évacuation`,
      text: `Le flexible d'évacuation reliant le lave-vaisselle au siphon de l'évier est déconnecté et inspecté. Les dépôts graisseux et calcaires qui réduisent son diamètre interne sont éliminés. Si le bouchon est dans la canalisation commune, un furet est passé jusqu'au dégagement complet.`,
    },
    {
      name: `Test cycle de vidange complet`,
      text: `Une fois l'ensemble du circuit nettoyé, un cycle de vidange est lancé et suivi jusqu'à la fin pour s'assurer que l'eau s'évacue complètement, que le code erreur ne réapparaît pas et qu'aucun bruit anormal ne subsiste. Le technicien ne quitte pas les lieux sans que le résultat soit validé.`,
    },
  ],
  signes: `Quatre signaux indiquent un problème de vidange sur un lave-vaisselle : de l'eau qui reste au fond de la cuve en fin de programme, un code erreur vidange (E24, E20 selon la marque) affiché sur le tableau de bord, des mauvaises odeurs nauséabondes à chaque ouverture de porte, et des bruits de pompe anormaux — claquements, sifflements ou absence totale de son de pompe en fin de cycle.`,
  conseils: `Nettoyez le filtre de fond de cuve toutes les semaines : l'opération prend 2 minutes et évite la majorité des problèmes de vidange. Utilisez du sel régénérant en quantité suffisante pour protéger la résine adoucissante et limiter le dépôt calcaire dans le circuit. Lancez un cycle à vide à 60 °C une fois par mois — sans vaisselle ni pastille — pour dissoudre les résidus graisseux accumulés dans le bras de lavage, le filtre et le flexible d'évacuation.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
