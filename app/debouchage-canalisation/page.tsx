import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-canalisation';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    "question": "Combien de temps dure un débouchage de canalisation ?",
    "answer": "En moyenne 45 minutes à 1h30 selon la complexité. Les cas les plus simples sont résolus en 30 minutes."
  },
  {
    "question": "L'hydrocurage peut-il endommager mes canalisations ?",
    "answer": "Non, la pression est adaptée au type de canalisation (PVC, fonte, grès). Nos techniciens sont formés pour ajuster la pression selon le matériau."
  },
  {
    "question": "Faut-il couper l'eau pendant l'intervention ?",
    "answer": "Pas nécessairement. Nous coupons l'eau uniquement si le bouchon provoque un risque de débordement immédiat."
  }
];

const content = {
  intro: `Le débouchage de canalisation est notre spécialité principale. Que ce soit une canalisation intérieure ou extérieure, nos techniciens interviennent dans tout le Var avec du matériel professionnel : furet motorisé, hydrocureur haute pression et caméra d'inspection. Une canalisation bouchée peut provoquer des remontées d'eau, des mauvaises odeurs et des dégâts importants si elle n'est pas traitée rapidement. Notre équipe intervient en moins d'une heure pour diagnostiquer et résoudre le problème en une seule visite. Avec 19 ans d'expérience, nous connaissons parfaitement les réseaux du Var et adaptons notre méthode à chaque situation.`,
  problems: `Les canalisations bouchées peuvent avoir plusieurs origines : accumulation de calcaire, dépôts de graisse, racines d'arbres infiltrées, objets coincés ou affaissement de la conduite. Chaque cas nécessite un diagnostic précis avant intervention. Nous utilisons systématiquement une caméra d'inspection pour localiser l'obstruction et choisir la méthode la plus efficace.`,
  intervention: `Notre intervention commence par un diagnostic caméra pour localiser précisément le bouchon. Selon la nature de l'obstruction, nous utilisons le furet motorisé pour les bouchons organiques ou l'hydrocurage haute pression pour les dépôts de calcaire et graisse. L'intervention dure en moyenne 45 minutes à 1h30. Un rapport d'intervention vous est remis à la fin.`,
  tarif: `Le tarif d'un débouchage de canalisation varie selon la profondeur de l'obstruction et la méthode utilisée. Un débouchage simple au furet est moins coûteux qu'un hydrocurage haute pression. Nous vous communiquons le prix exact par téléphone avant tout déplacement.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
