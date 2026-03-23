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
    "question": "À quelle fréquence faut-il détartrer un ballon d'eau chaude dans le Var ?",
    "answer": "Tous les 2 à 3 ans dans le Var en raison de la dureté de l'eau. Sans détartrage, la durée de vie du ballon est réduite de moitié."
  },
  {
    "question": "Le détartrage du ballon fait-il baisser ma facture d'électricité ?",
    "answer": "Oui, un ballon entartré consomme jusqu'à 20% d'énergie en plus. Le détartrage est rentabilisé en quelques mois."
  },
  {
    "question": "Faut-il couper le courant pendant l'intervention ?",
    "answer": "Oui, nous coupons l'alimentation électrique du ballon avant toute intervention pour des raisons de sécurité."
  }
];

const content = {
  intro: `Le calcaire est l'ennemi principal de votre ballon d'eau chaude ou chauffe-eau. Dans le Var, l'eau est particulièrement calcaire, ce qui accélère l'entartrage. Nos techniciens interviennent pour le détartrage, le débouchage de l'évacuation et la vérification du groupe de sécurité. Un ballon entartré consomme plus d'énergie et produit moins d'eau chaude — l'intervention est vite rentabilisée.`,
  problems: `Les signes d'un ballon d'eau chaude entartré ou bouché : eau moins chaude qu'avant, temps de chauffe plus long, bruit de claquement dans le ballon, goutte-à-goutte au niveau du groupe de sécurité, pression d'eau chaude faible.`,
  intervention: `Notre intervention comprend : coupure de l'alimentation, vidange du ballon, détartrage de la cuve et de la résistance, nettoyage de l'évacuation du groupe de sécurité, vérification de l'anode et remise en service. Durée : 1 à 2 heures.`,
  tarif: `Le détartrage et débouchage de ballon d'eau chaude est une intervention intermédiaire. Le tarif dépend du type de ballon (vertical, horizontal, électrique, thermodynamique) et de son accessibilité.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
