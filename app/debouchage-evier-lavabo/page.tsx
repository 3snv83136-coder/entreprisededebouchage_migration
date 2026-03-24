import { Metadata } from 'next';
import { getServiceBySlug } from '@/lib/data/services';
import { generateMetadataForService } from '@/lib/seo/metadata';
import ServicePageContent from '@/components/page-service/ServicePageContent';

const SERVICE_SLUG = 'debouchage-evier-lavabo';

export async function generateMetadata(): Promise<Metadata> {
  const service = getServiceBySlug(SERVICE_SLUG);
  if (!service) return {};
  return generateMetadataForService(service);
}

const faqs = [
  {
    "question": "Le vinaigre et le bicarbonate suffisent-ils pour déboucher un évier ?",
    "answer": "Pour un léger ralentissement oui, mais pour un vrai bouchon non. Ces solutions maison ne font que déplacer le problème. Un furet professionnel est nécessaire."
  },
  {
    "question": "Mon évier de cuisine sent mauvais, est-ce un bouchon ?",
    "answer": "Souvent oui. Les graisses accumulées dans le siphon et les canalisations fermentent et produisent des odeurs. Un nettoyage en profondeur résout le problème."
  },
  {
    "question": "Faut-il remplacer le siphon si l'évier est bouché ?",
    "answer": "Rarement. Dans 95% des cas, un nettoyage suffit. Le remplacement n'est envisagé que si le siphon est fissuré ou trop entartré."
  }
];

const content = {
  intro: `L'évier ou le lavabo bouché est un problème fréquent dans les cuisines et salles de bain. Les dépôts de graisse, les résidus alimentaires, le savon et le calcaire s'accumulent progressivement dans le siphon et les canalisations. Nos techniciens interviennent rapidement pour nettoyer en profondeur vos évacuations et rétablir un écoulement normal. Nous utilisons des techniques adaptées à chaque situation : démontage et nettoyage du siphon, furet motorisé ou hydrocurage pour les bouchons profonds.`,
  problems: `Un évier qui s'écoule lentement est le premier signe d'un bouchon en formation. Si vous constatez de l'eau stagnante, des mauvaises odeurs ou des gargouillis, il est temps d'intervenir. Les graisses de cuisine sont la première cause de bouchon d'évier, suivies par les cheveux et le savon pour les lavabos de salle de bain.`,
  intervention: `Pour un évier bouché, nous commençons par le siphon : démontage, nettoyage et remontage. Si le bouchon est plus profond, nous utilisons un furet motorisé pour atteindre l'obstruction dans la canalisation. Pour les cas les plus tenaces, l'hydrocurage haute pression décolle les dépôts de graisse et de calcaire accumulés sur les parois.`,
  tarif: `Le debouchage d'évier et lavabo fait partie de nos interventions les plus accessibles. Le tarif varie selon que le bouchon est dans le siphon (intervention rapide) ou plus profond dans la canalisation.`,
};

export default function Page() {
  const service = getServiceBySlug(SERVICE_SLUG)!;
  return <ServicePageContent service={service} faqs={faqs} content={content} />;
}
