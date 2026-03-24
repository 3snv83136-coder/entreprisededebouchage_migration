import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-fosse-septique';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    "question": "À quelle fréquence faut-il vidanger une fosse septique ?",
    "answer": "En moyenne tous les 3 à 4 ans pour une famille de 4 personnes. Cela dépend du volume de la fosse et du nombre d'occupants."
  },
  {
    "question": "Qui contacter pour une fosse septique qui déborde ?",
    "answer": "Appelez-nous en urgence. Un débordement de fosse septique est un risque sanitaire qui nécessite une intervention rapide."
  },
  {
    "question": "La vidange de fosse septique est-elle obligatoire ?",
    "answer": "Oui, la réglementation impose un entretien régulier. Le SPANC (Service Public d'Assainissement Non Collectif) peut effectuer des contrôles."
  }
];

const content = {
  intro: `Le debouchage et la vidange de fosse septique nécessitent un savoir-faire spécifique et un véhicule équipé d'une citerne et d'une pompe. Notre équipe intervient dans tout le Var pour le debouchage, la vidange et l'entretien de votre fosse septique ou fosse toutes eaux. Une fosse mal entretenue peut provoquer des remontées d'odeurs, un débordement ou une pollution du sol. Nous vous accompagnons avec un service complet : diagnostic, vidange, curage et conseil d'entretien.`,
  problems: `Les signes d'une fosse septique qui nécessite une intervention : mauvaises odeurs persistantes autour de la fosse, écoulement lent dans toute la maison, eau qui remonte dans les sanitaires, herbe anormalement verte au-dessus de la fosse, ou fosse qui déborde.`,
  intervention: `Notre intervention comprend : inspection visuelle de la fosse, pompage du contenu avec notre camion citerne, curage des canalisations d'entrée et de sortie, vérification du bon fonctionnement du système de prétraitement, et recommandations d'entretien.`,
  tarif: `La vidange et le debouchage de fosse septique nécessitent un véhicule spécialisé (camion pompe). Le tarif dépend du volume de la fosse et de la distance. C'est une intervention plus conséquente mais indispensable tous les 3 à 4 ans.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
