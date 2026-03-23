import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-wc-toilettes';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    "question": "Mon WC déborde, que faire en attendant le technicien ?",
    "answer": "Coupez l'arrivée d'eau (robinet d'arrêt derrière le WC ou vanne générale), ne tirez plus la chasse et appelez-nous immédiatement."
  },
  {
    "question": "Peut-on déboucher un WC sans le démonter ?",
    "answer": "Oui, dans 90% des cas nous débouchons le WC sans démontage grâce à nos furets professionnels."
  },
  {
    "question": "Les lingettes peuvent-elles boucher un WC ?",
    "answer": "Oui, les lingettes (même dites 'biodégradables') sont la cause n°1 des bouchons de WC. Elles ne se dissolvent pas comme le papier toilette."
  }
];

const content = {
  intro: `Un WC bouché est une urgence du quotidien qui nécessite une intervention rapide. Nos techniciens interviennent 24h/7j dans le Var pour déboucher vos toilettes avec du matériel professionnel. Que le bouchon soit dû à un excès de papier, un objet coincé ou un problème de canalisation en aval, nous trouvons la solution en une seule visite. Nous intervenons sans démontage superflu et garantissons un résultat propre et durable. Plus de 19 ans d'expérience nous permettent de traiter rapidement tous les cas de figure.`,
  problems: `Les WC bouchés peuvent avoir plusieurs causes : excès de papier toilette, lingettes jetées dans la cuvette, jouet d'enfant coincé, calcaire accumulé dans le siphon ou bouchon plus profond dans la colonne d'évacuation. Un WC qui déborde peut rapidement causer des dégâts d'eau importants — n'attendez pas pour nous appeler.`,
  intervention: `Nous commençons par identifier la cause du bouchon. Pour un bouchon simple, le furet manuel ou motorisé suffit. Pour un bouchon profond, nous utilisons un furet électrique à tambour. Si le problème vient de la colonne d'évacuation, nous intervenons avec un hydrocureur. L'intervention dure en moyenne 30 minutes à 1 heure.`,
  tarif: `Le débouchage de WC est l'une de nos interventions les plus courantes et les plus abordables. Le tarif dépend de la nature du bouchon : un bouchon simple est traité rapidement, un bouchon profond nécessite plus de temps et de matériel.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
