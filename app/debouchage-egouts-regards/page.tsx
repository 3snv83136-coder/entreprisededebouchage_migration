import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-egouts-regards';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    "question": "Qui est responsable du débouchage d'égout ?",
    "answer": "La partie privée (entre votre habitation et le regard de raccordement) est à votre charge. La partie publique relève de la commune. Nous intervenons sur la partie privée."
  },
  {
    "question": "Les racines d'arbres peuvent-elles boucher un égout ?",
    "answer": "Oui, c'est même l'une des causes les plus fréquentes. Les racines s'infiltrent par les joints et forment un bouchon organique dense."
  },
  {
    "question": "Faut-il un permis pour intervenir sur un égout ?",
    "answer": "Non, pas pour la partie privée de votre réseau. Si l'intervention concerne la voie publique, nous gérons les démarches."
  }
];

const content = {
  intro: `Le débouchage d'égouts et de regards nécessite un matériel professionnel lourd : hydrocureur haute pression monté sur véhicule, furets grande longueur et caméra d'inspection. Nos équipes interviennent dans tout le Var sur les réseaux extérieurs, les regards, les fosses et les collecteurs. Un égout bouché peut provoquer des remontées d'eaux usées dans votre habitation ou votre local — il s'agit d'une urgence sanitaire qui nécessite une intervention immédiate.`,
  problems: `Les égouts se bouchent pour plusieurs raisons : accumulation de graisse dans les restaurants et copropriétés, racines d'arbres qui pénètrent dans les joints, effondrement partiel de la conduite, ou accumulation de lingettes et débris. Les regards colmatés empêchent l'évacuation des eaux pluviales et peuvent provoquer des inondations.`,
  intervention: `Nous intervenons avec notre camion hydrocureur équipé d'un système haute pression capable de traiter les conduites de grand diamètre. L'intervention comprend : ouverture des regards, curage haute pression de la canalisation, extraction des débris, inspection caméra de contrôle et rapport d'intervention détaillé.`,
  tarif: `Le débouchage d'égout est une intervention plus complexe qui nécessite un véhicule spécialisé. Le tarif dépend de la longueur de canalisation à traiter et du type d'obstruction. Nous établissons un devis gratuit avant toute intervention.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
