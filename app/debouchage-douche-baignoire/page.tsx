import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-douche-baignoire';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    "question": "Comment éviter les bouchons de douche ?",
    "answer": "Installez une grille attrape-cheveux sur la bonde. C'est simple, pas cher et ça évite 80% des bouchons. Nettoyez-la chaque semaine."
  },
  {
    "question": "Mon bac de douche déborde, est-ce urgent ?",
    "answer": "Si l'eau ne s'écoule plus du tout, oui. L'eau stagnante peut s'infiltrer sous le bac et causer des dégâts. Appelez-nous rapidement."
  },
  {
    "question": "Intervenez-vous sur les douches à l'italienne ?",
    "answer": "Oui, nous intervenons sur tous types de douches, y compris les douches à l'italienne avec caniveau ou bonde de sol."
  }
];

const content = {
  intro: `Les cheveux, le savon et le calcaire sont les ennemis de vos évacuations de douche et baignoire. Au fil du temps, ces résidus forment un bouchon compact qui ralentit puis bloque l'écoulement de l'eau. Nos techniciens interviennent avec le matériel adapté pour extraire le bouchon et nettoyer la canalisation en profondeur, garantissant un écoulement durable. Nous intervenons 24h/7j dans tout le Var.`,
  problems: `Les signes d'un bouchon de douche ou baignoire : eau qui stagne pendant la douche, écoulement de plus en plus lent, mauvaises odeurs, gargouillis dans la bonde. Les cheveux longs combinés au savon forment un bouchon particulièrement tenace qui ne peut pas être résolu avec une ventouse classique.`,
  intervention: `Nous intervenons en plusieurs étapes : retrait de la grille ou bonde, extraction manuelle des résidus visibles, passage du furet pour les bouchons profonds, et nettoyage de la canalisation. Pour les baignoires anciennes avec des canalisations en fonte, nous adaptons notre technique pour éviter tout dommage.`,
  tarif: `Le debouchage de douche et baignoire est une intervention courante et accessible. Le tarif dépend de l'accessibilité de la bonde et de la profondeur du bouchon.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
