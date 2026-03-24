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
    "question": "Peut-on verser de l'huile dans l'évier ?",
    "answer": "Non, jamais. L'huile se fige dans les canalisations et forme des bouchons très difficiles à éliminer. Récupérez-la dans un récipient et déposez-la en déchetterie."
  },
  {
    "question": "Le lave-vaisselle peut-il boucher la canalisation ?",
    "answer": "Oui, les résidus alimentaires non rincés et les graisses évacuées par le lave-vaisselle peuvent s'accumuler dans la canalisation commune avec l'évier."
  },
  {
    "question": "Faut-il un entretien régulier des canalisations de cuisine ?",
    "answer": "Oui, nous recommandons un curage préventif annuel pour les cuisines des particuliers, et trimestriel pour les restaurants et collectivités."
  }
];

const content = {
  intro: `La cuisine est la pièce la plus sujette aux bouchons : graisses de cuisson, résidus alimentaires, marc de café et huiles s'accumulent dans les canalisations. Notre service de debouchage cuisine couvre l'évier, le lave-vaisselle et l'ensemble du réseau d'évacuation de votre cuisine. Nous intervenons dans tout le Var, 24h/7j, avec des techniques adaptées aux bouchons graisseux qui résistent aux produits chimiques du commerce.`,
  problems: `Les bouchons de cuisine sont principalement causés par les graisses qui se figent dans les canalisations, les résidus alimentaires qui passent à travers la bonde, et le calcaire qui réduit progressivement le diamètre des conduites. Un évier qui s'écoule lentement est le premier signal d'alerte.`,
  intervention: `Pour les bouchons de cuisine, nous privilégions l'hydrocurage qui est la méthode la plus efficace contre les graisses. Le jet haute pression décolle les dépôts sur les parois internes et rétablit le plein diamètre de la canalisation. Pour les cas simples, le furet suffit.`,
  tarif: `Le debouchage de cuisine est une intervention courante. Le coût dépend de la méthode utilisée : furet pour les bouchons légers, hydrocurage pour les bouchons graisseux tenaces. Devis gratuit par téléphone.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
