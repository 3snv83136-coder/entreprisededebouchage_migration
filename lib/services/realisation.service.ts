import { BASE_URL } from '@/lib/config';

export function generateFaq(type: string, ville: string): Array<{ question: string; reponse: string }> {
  const typeMin = type.toLowerCase();
  return [
    {
      question: `Quel est le prix d'un ${typeMin} à ${ville} ?`,
      reponse: `Le tarif pour un ${typeMin} à ${ville} débute à 110 € pour une intervention simple. Le prix définitif dépend de l'accessibilité et de la complexité. Devis gratuit par téléphone.`,
    },
    {
      question: `Combien de temps dure un ${typeMin} ?`,
      reponse: `Une intervention de ${typeMin} dure généralement entre 30 minutes et 2 heures selon l'obstruction. Nous intervenons rapidement pour minimiser la gêne.`,
    },
    {
      question: `Êtes-vous disponibles le week-end à ${ville} ?`,
      reponse: `Oui, nous intervenons 24h/24 et 7j/7 à ${ville} et dans tout les Bouches-du-Rhône, y compris les jours fériés et week-ends.`,
    },
    {
      question: `Garantissez-vous votre intervention de ${typeMin} ?`,
      reponse: `Chaque intervention est garantie. Si le problème réapparaît dans les 30 jours, nous revenons sans frais supplémentaires.`,
    },
    {
      question: `Quels équipements utilisez-vous pour le ${typeMin} ?`,
      reponse: `Nous utilisons du matériel professionnel : hydrocureur haute pression, caméra d'inspection, furet électrique. Nos techniciens sont formés et équipés pour tout type d'obstruction.`,
    },
  ];
}

export function generateJsonLd(params: {
  type: string;
  ville: string;
  slug: string;
  mois: string;
  annee: string;
  resultat: string;
  temoignage?: string;
  faq: Array<{ question: string; reponse: string }>;
  description_generee?: string;
  meta_description?: string;
}): object {
  const { type, ville, slug, mois, annee, resultat, temoignage, faq, description_generee, meta_description } = params;
  const url = `${BASE_URL}/realisations/${slug}/`;
  const headline = `${type} à ${ville} — ${mois} ${annee}`;
  const description = description_generee || meta_description || resultat;

  const graph: object[] = [
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline,
      description,
      url,
      ...(temoignage && {
        review: {
          '@type': 'Review',
          reviewBody: temoignage,
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        },
      }),
    },
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: type,
      areaServed: {
        '@type': 'City',
        name: ville,
        addressCountry: 'FR',
      },
      provider: {
        '@type': 'LocalBusiness',
        name: 'Entreprise de Debouchage',
        url: BASE_URL,
      },
    },
  ];

  if (faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.reponse,
        },
      })),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function generateTitre(type: string, ville: string, mois: string, annee: string): string {
  return `${type} à ${ville} — Intervention ${mois} ${annee}`;
}

export function generateDescription(params: {
  type: string;
  ville: string;
  mois: string;
  annee: string;
  duree?: string;
  resultat: string;
}): string {
  const { type, ville, mois, annee, duree, resultat } = params;
  const dureeStr = duree ? ` en ${duree}` : '';
  return `Intervention de ${type.toLowerCase()} réalisée à ${ville}${dureeStr} — ${mois} ${annee}. ${resultat.slice(0, 120)}${resultat.length > 120 ? '…' : ''}`;
}
