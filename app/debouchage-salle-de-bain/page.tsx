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
  }
];

const content = {
  intro: `La salle de bain concentre plusieurs sources de bouchons : cheveux dans la douche et la baignoire, savon et dentifrice dans le lavabo, et calcaire qui s'accumule partout. Notre service de debouchage salle de bain traite l'ensemble du réseau en une seule visite : douche, baignoire, lavabo et évacuation au sol. Nous intervenons 24h/7j dans le Var avec du matériel professionnel adapté.`,
  problems: `Les bouchons de salle de bain sont causés par l'accumulation de cheveux mélangés au savon, formant un bouchon compact et collant. Le calcaire, très présent dans l'eau du Var, aggrave le problème en réduisant le diamètre des canalisations. Si plusieurs sanitaires de la salle de bain s'écoulent mal en même temps, le bouchon est probablement dans la canalisation commune.`,
  intervention: `Nous traitons l'ensemble de la salle de bain en une seule visite. Pour chaque sanitaire, nous vérifions le siphon, passons le furet dans la canalisation et utilisons l'hydrocurage si nécessaire. Nous nettoyons également les bondes et grilles pour prévenir les prochains bouchons.`,
  tarif: `Le debouchage de salle de bain peut concerner un seul sanitaire ou l'ensemble de la pièce. Le tarif est adapté en conséquence. Nous vous donnons un prix fixe avant toute intervention.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
