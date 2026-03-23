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
    "question": "Mon lave-vaisselle affiche un code erreur vidange, est-ce un bouchon ?",
    "answer": "Très probablement. Le code erreur vidange indique que l'eau ne s'évacue pas correctement. Vérifiez d'abord le filtre, puis appelez-nous si le problème persiste."
  },
  {
    "question": "Le lave-vaisselle partage-t-il la même évacuation que l'évier ?",
    "answer": "Oui, dans la plupart des installations, le lave-vaisselle est raccordé au siphon de l'évier. Un bouchon dans l'un affecte souvent l'autre."
  },
  {
    "question": "Faut-il rincer les assiettes avant de les mettre au lave-vaisselle ?",
    "answer": "Pas nécessaire avec les lave-vaisselles modernes, mais retirez les gros morceaux de nourriture pour éviter d'encrasser le filtre et la canalisation."
  }
];

const content = {
  intro: `Votre lave-vaisselle ne vidange plus, affiche un code erreur ou laisse de l'eau stagnante au fond ? Le problème vient souvent d'un bouchon dans l'évacuation ou le siphon de raccordement. Nos techniciens interviennent pour déboucher la canalisation, nettoyer le filtre et vérifier le bon fonctionnement de la pompe de vidange. Intervention rapide dans tout le Var, 24h/7j.`,
  problems: `Les problèmes de vidange de lave-vaisselle ont plusieurs causes : filtre encrassé, bouchon dans la canalisation de raccordement, siphon colmaté par les graisses, ou pompe de vidange défaillante. Les résidus alimentaires non rincés et les graisses sont les premiers responsables.`,
  intervention: `Nous vérifions d'abord le filtre et la pompe du lave-vaisselle. Si le problème vient de la canalisation, nous démontons le raccordement, nettoyons le siphon et passons le furet dans la canalisation commune avec l'évier. L'intervention est rapide : 30 à 45 minutes en moyenne.`,
  tarif: `Le débouchage de lave-vaisselle est une intervention simple et rapide. Le tarif est parmi les plus accessibles de nos prestations.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
