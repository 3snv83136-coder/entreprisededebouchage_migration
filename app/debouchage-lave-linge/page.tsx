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
    "question": "Comment accéder au filtre de mon lave-linge ?",
    "answer": "Le filtre est généralement situé en bas à droite de la machine, derrière une trappe. Placez une serpillière et un récipient avant d'ouvrir, car de l'eau va s'écouler."
  },
  {
    "question": "Peut-on déboucher un lave-linge soi-même ?",
    "answer": "Le filtre oui, c'est un entretien courant. Mais si le problème vient de la canalisation ou de la pompe, il vaut mieux faire appel à un professionnel."
  },
  {
    "question": "À quelle fréquence nettoyer le filtre du lave-linge ?",
    "answer": "Tous les 2 à 3 mois. C'est simple et rapide, et ça évite la plupart des problèmes de vidange."
  }
];

const content = {
  intro: `Un lave-linge qui ne vidange pas correctement peut être causé par un bouchon dans le filtre, la pompe ou la canalisation d'évacuation. Nos techniciens diagnostiquent rapidement l'origine du problème et interviennent pour rétablir le bon fonctionnement de votre machine. Service disponible 24h/7j dans le Var.`,
  problems: `Les signes d'un problème de vidange de lave-linge : code erreur affiché, eau stagnante dans le tambour, odeur de moisissure, linge mal essoré. Les causes les plus fréquentes sont un filtre bouché par des peluches et fibres, un objet coincé dans la pompe (pièce de monnaie, bouton), ou un bouchon dans la canalisation d'évacuation.`,
  intervention: `Nous commençons par vérifier le filtre de pompe et la pompe de vidange du lave-linge. Si le problème est dans la canalisation, nous nettoyons le siphon et passons le furet. Intervention rapide de 30 à 45 minutes.`,
  tarif: `Le débouchage de lave-linge est une intervention simple et rapide, parmi les plus accessibles de nos prestations.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
