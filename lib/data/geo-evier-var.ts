import { FaqItem } from '@/lib/types';

export interface GeoEvierVarPageDef {
  slug: string;
  breadcrumbLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: { title: string; body: string }[];
  faqs: FaqItem[];
  focusKeyword: string;
  /** Slug ville (villes.csv) pour GEO / liens vers page ville */
  villeSlug?: string;
}

const BASE = `Intervention dans tout l&apos;ouest du Var : Toulon, La Seyne-sur-Mer, Hyères, La Garde, Six-Fours-les-Plages, Sanary, Ollioules, Le Pradet, Carqueiranne, La Londe-les-Maures et communes limitrophes.`;

export const GEO_EVIER_VAR_PAGES: GeoEvierVarPageDef[] = [
  {
    slug: 'toulon-urgence',
    breadcrumbLabel: 'Urgence évier Toulon',
    metaTitle: 'Debouchage évier Toulon urgence — intervention rapide',
    metaDescription:
      'Évier bouché à Toulon ? Urgence 24h/7j, déplacement rapide, devis gratuit. Siphon, graisse, canalisation cuisine. Agréé assurances.',
    h1: 'Debouchage d’évier d’urgence à Toulon',
    intro: `Un évier qui ne se vide plus ou qui déborde est une vraie urgence sanitaire : odeurs, risque de fuite, impossibilité d’utiliser la cuisine. À Toulon (83000) et dans l’agglomération, nous priorisons ces appels et nous déplaçons en général rapidement. ${BASE}`,
    sections: [
      {
        title: 'Pourquoi traiter une urgence évier sans attendre',
        body: `Plus vous attendez, plus les graisses et résidus se figent dans le siphon et la canalisation. Un simple ralentissement peut virer en refoulement complet. Nos techniciens interviennent avec furet, pompe et matériel adapté aux immeubles toulonnais (vieux centre, Mourillon, Pont du Las, zones pavillonnaires).`,
      },
      {
        title: 'Ce que nous faisons sur place',
        body: `Diagnostic du bouchon (siphon, canalisation murale, raccord lave-vaisselle), démontage et nettoyage du siphon si besoin, passage de furet ou hydrocurage ciblé. Prix annoncé avant intervention, garantie sur le debouchage réalisé.`,
      },
    ],
    faqs: [
      {
        question: 'Intervenez-vous le dimanche pour un évier bouché à Toulon ?',
        answer: 'Oui, 7j/7 y compris jours fériés. Le numéro d’urgence est le même ; nous vous indiquons le délai estimé dès l’appel.',
      },
      {
        question: 'Combien coûte une urgence debouchage évier à Toulon ?',
        answer: 'Le tarif dépend de la complexité (siphon seul vs canalisation longue). Nous vous donnons un devis gratuit par téléphone et confirmons le montant avant de commencer.',
      },
      {
        question: 'Intervenez-vous dans tous les quartiers de Toulon ?',
        answer: 'Oui : centre-ville, Mourillon, Serinette, Pont du Las, La Rode, les Routes, Saint-Jean du Var, Claret, autant de secteurs où nous intervenons régulièrement.',
      },
    ],
    focusKeyword: 'debouchage évier toulon urgence',
    villeSlug: 'toulon',
  },
  {
    slug: 'toulon-24h',
    breadcrumbLabel: 'Évier Toulon 24h/7j',
    metaTitle: 'Debouchage évier Toulon 24h/7j — technicien de garde',
    metaDescription:
      'Service de debouchage d’évier à Toulon 24h/7j. Réponse rapide, devis gratuit, intervention jour et nuit dans le Var.',
    h1: 'Debouchage d’évier à Toulon — disponible 24h/7j',
    intro: `Les bouchons d’évier ne tombent pas toujours aux heures ouvrables. Nous maintenons une astreinte pour Toulon et l’agglomération : vous joignez toujours un interlocuteur et une équipe peut être envoyée selon l’urgence. ${BASE}`,
    sections: [
      {
        title: 'Astreinte nuit et week-end',
        body: `Week-ends, nuits et jours fériés : le principe reste identique — diagnostic clair, intervention propre, facturation transparente. Idéal si vous gérez une location saisonnière ou un commerce sur Toulon.`,
      },
      {
        title: 'Lien avec le lave-vaisselle et la bonde',
        body: `Souvent le lave-vaisselle et l’évier partagent la même évacuation. Nous vérifions les deux pour éviter un retour du bouchon quelques jours après l’intervention.`,
      },
    ],
    faqs: [
      {
        question: 'Le tarif est-il plus élevé la nuit à Toulon ?',
        answer: 'Les majorations éventuelles sont annoncées avant envoi sur place. Demandez un devis par téléphone pour connaître le montant applicable à votre créneau.',
      },
      {
        question: 'Puis-je avoir une intervention le jour même ?',
        answer: 'Dans la majorité des cas oui, sous quelques heures selon la charge et votre secteur à Toulon.',
      },
      {
        question: 'Intervenez-vous aussi pour un évier de buanderie ?',
        answer: 'Oui, le principe d’évacuation est le même ; nous adaptons le matériel au diamètre et à l’accessibilité.',
      },
    ],
    focusKeyword: 'debouchage évier toulon 24h',
    villeSlug: 'toulon',
  },
  {
    slug: 'toulon-siphon-bouche',
    breadcrumbLabel: 'Siphon évier bouché Toulon',
    metaTitle: 'Siphon d’évier bouché à Toulon — démontage et debouchage',
    metaDescription:
      'Siphon bouché sous l’évier à Toulon ? Démontage, nettoyage, contrôle de la canalisation. Intervention rapide, devis gratuit.',
    h1: 'Siphon d’évier bouché à Toulon',
    intro: `Le siphon (ou « culot ») retient les odeurs et intercepte les solides. Lorsqu’il est saturé de graisse et de résidus, l’eau monte dans l’évier. C’est l’intervention la plus fréquente à Toulon : souvent résolue en démontant et nettoyant le siphon, parfois en prolongeant le furet dans la canalisation. ${BASE}`,
    sections: [
      {
        title: 'Signes d’un siphon saturé',
        body: `Écoulement lent, gargouillis, odeur de canalisation dès que vous videz l’évier. Avant d’utiliser des produits agressifs qui peuvent abîmer les joints, faites appel à un professionnel.`,
      },
      {
        title: 'Après le debouchage',
        body: `Nous vous expliquons les bonnes habitudes : éviter de verser l’huile chaude dans l’évier, utiliser une bonde-panier, rincer régulièrement à l’eau chaude modérée.`,
      },
    ],
    faqs: [
      {
        question: 'Faut-il toujours remplacer le siphon ?',
        answer: 'Non. S’il n’est pas fissuré et que les joints sont encore étanches, un nettoyage suffit souvent.',
      },
      {
        question: 'Et si le bouchon est après le siphon ?',
        answer: 'Nous passons alors un furet motorisé dans la canalisation murale jusqu’au collecteur selon l’accessibilité.',
      },
      {
        question: 'Intervenez-vous sur évier inox et résine ?',
        answer: 'Oui, nous protégeons le plan de travail et les raccords pendant l’intervention.',
      },
    ],
    focusKeyword: 'siphon évier bouché toulon',
    villeSlug: 'toulon',
  },
  {
    slug: 'toulon-83000-centre',
    breadcrumbLabel: 'Évier Toulon 83000',
    metaTitle: 'Debouchage évier 83000 Toulon — centre et quartiers',
    metaDescription:
      'Debouchage d’évier sur Toulon code postal 83000 : centre-ville, Mourillon, quartiers nord et ouest. Devis gratuit, intervention rapide.',
    h1: 'Debouchage d’évier sur Toulon (83000)',
    intro: `Le code postal 83000 couvre Toulon intra-muros et plusieurs quartiers aux réseaux très différents : immeubles anciens du centre, copropriétés récentes, maisons individuelles en périphérie proche. Nous adaptons notre méthode au type de plomberie et au diamètre des canalisations. ${BASE}`,
    sections: [
      {
        title: 'Immeubles collectifs à Toulon',
        body: `Colonnes verticales, coudes serrés : le bouchon peut être local à votre logement ou lié à une canalisation commune. Nous diagnostiquons pour intervenir au bon endroit.`,
      },
      {
        title: 'Maisons et extensions',
        body: `Évacuation longue vers la fosse ou le tout-à-l’égout : l’hydrocurage peut être nécessaire si la graisse a adhéré sur plusieurs mètres.`,
      },
    ],
    faqs: [
      {
        question: 'Intervenez-vous près du port de Toulon ?',
        answer: 'Oui, tout le périmètre 83000 est couvert, y compris les zones littorales et le centre historique.',
      },
      {
        question: 'Avez-vous des délais différents selon le quartier ?',
        answer: 'Le délai dépend surtout de la charge d’astreinte au moment de l’appel ; nous vous donnons une estimation réaliste.',
      },
      {
        question: 'Puis-je regrouper plusieurs sanitaires sur une même visite ?',
        answer: 'Oui si le diagnostic le permet — par exemple évier et lave-vaisselle sur la même évacuation.',
      },
    ],
    focusKeyword: 'debouchage évier 83000 toulon',
    villeSlug: 'toulon',
  },
  {
    slug: 'toulon-graisse-cuisine',
    breadcrumbLabel: 'Graisse évier Toulon',
    metaTitle: 'Évier bouché par la graisse à Toulon — hydrocurage',
    metaDescription:
      'Évier de cuisine bouché par la graisse à Toulon ? Curage, hydrocurage, prévention. Intervention pro dans le Var.',
    h1: 'Évier de cuisine bouché par la graisse à Toulon',
    intro: `La graisse de cuisson refroidie se solidifie dans les canalisations et colle les autres résidus. C’est la première cause de bouchon d’évier en cuisine sur Toulon et en bord de mer où l’on cuisine beaucoup à la maison. ${BASE}`,
    sections: [
      {
        title: 'Pourquoi les produits du commerce échouent',
        body: `Les déboucheurs chimiques dissolvent partiellement la graisse sans la évacuer ; le bouchon revient souvent. Le mécanique (furet) ou l’eau haute pression ciblée est plus durable.`,
      },
      {
        title: 'Prévention sur Toulon',
        body: `Bac à graisse pour les pros ; côté particulier : filtre à bonde, raclage des assiettes à la poubelle, jamais d’huile chaude directement versée dans l’évier.`,
      },
    ],
    faqs: [
      {
        question: 'L’hydrocurage abîme-t-il les vieilles canalisations ?',
        answer: 'Nous adaptons la pression au matériau (PVC, fonte, grès) après observation des raccords.',
      },
      {
        question: 'Combien de temps dure une intervention graisse ?',
        answer: 'Souvent 45 min à 1 h 30 selon la longueur du tronçon à curer.',
      },
      {
        question: 'Puis-je utiliser l’évier tout de suite après ?',
        answer: 'Oui dès que l’écoulement est rétabli et les joints remontés.',
      },
    ],
    focusKeyword: 'évier bouché graisse toulon',
    villeSlug: 'toulon',
  },
  {
    slug: 'toulon-odeur',
    breadcrumbLabel: 'Odeurs évier Toulon',
    metaTitle: 'Odeurs d’égout sous l’évier à Toulon — diagnostic et debouchage',
    metaDescription:
      'Mauvaises odeurs sous l’évier à Toulon ? Canalisation, siphon, regard : diagnostic et traitement. Urgence possible 24h/7j.',
    h1: 'Odeurs sous l’évier à Toulon : causes et solutions',
    intro: `Les odeurs peuvent venir d’un siphon asséché, d’un bouchon partiel qui retient des eaux grises, ou d’un problème de ventilation de la canalisation. À Toulon, l’humidité côtière peut aussi aggraver les biofilms dans les conduites. Nous identifions la cause avant d’agir. ${BASE}`,
    sections: [
      {
        title: 'Siphon sec ou mal rempli',
        body: `Peu fréquent si l’évier est utilisé quotidiennement ; plus courant sur une cuisine secondaire ou après des travaux.`,
      },
      {
        title: 'Remontées depuis le collecteur',
        body: `Si l’odeur persiste après nettoyage du siphon, le problème peut être en aval — nous contrôlons avec le matériel adapté.`,
      },
    ],
    faqs: [
      {
        question: 'Les odeurs peuvent-elles venir du lave-vaisselle ?',
        answer: 'Oui si le raccord ou le filtre sont encrassés ; nous vérifions la ligne d’évacuation commune avec l’évier.',
      },
      {
        question: 'Faut-il une caméra à chaque fois ?',
        answer: 'Pas systématiquement ; la caméra est utile si le bouchon est profond ou récurrent.',
      },
      {
        question: 'Intervention possible le jour même à Toulon ?',
        answer: 'Oui dans la plupart des cas, selon astreinte.',
      },
    ],
    focusKeyword: 'odeur évier toulon',
    villeSlug: 'toulon',
  },
  {
    slug: 'toulon-intervention-rapide',
    breadcrumbLabel: 'Intervention rapide Toulon',
    metaTitle: 'Debouchage évier Toulon rapide — sous 1 h en général',
    metaDescription:
      'Besoin d’un debouchage d’évier rapide à Toulon ? Équipes mobiles, prise en charge express, devis par téléphone.',
    h1: 'Intervention rapide pour évier bouché à Toulon',
    intro: `Vous préparez un repas, vous recevez de la famille ou vous gérez un commerce : chaque minute compte. Nous positionnons des équipes pour des interventions rapides sur Toulon et l’aire urbaine lorsque la situation l’exige. ${BASE}`,
    sections: [
      {
        title: 'Ce qui accélère l’intervention',
        body: `Indiquez votre adresse précise, l’étage si immeuble, et si l’eau déborde encore ou non. Cela nous permet d’arriver avec le bon matériel.`,
      },
      {
        title: 'Après le debouchage',
        body: `Nous testons l’écoulement, vérifions l’absence de fuite au niveau du siphon remonté, et vous laissons une facture claire.`,
      },
    ],
    faqs: [
      {
        question: 'Puis-je être prioritaire si j’ai un nourrisson à domicile ?',
        answer: 'Signalez-le : nous faisons le maximum pour réduire le délai quand l’hygiène est compromise.',
      },
      {
        question: 'Intervenez-vous pour les professionnels (restaurants) ?',
        answer: 'Oui, avec des moyens adaptés aux gros débits et aux horaires contraints.',
      },
      {
        question: 'Quel délai depuis La Seyne ou Hyères ?',
        answer: 'Généralement comparable : nous tournons sur tout l’ouest du Var.',
      },
    ],
    focusKeyword: 'debouchage évier toulon rapide',
    villeSlug: 'toulon',
  },
  {
    slug: 'toulon-nuit-week-end',
    breadcrumbLabel: 'Évier Toulon nuit & week-end',
    metaTitle: 'Debouchage évier Toulon nuit et week-end — astreinte',
    metaDescription:
      'Évier bouché la nuit ou le week-end à Toulon ? Astreinte téléphonique et déplacements. Devis gratuit.',
    h1: 'Debouchage d’évier la nuit et le week-end à Toulon',
    intro: `Les créneaux hors horaires sont souvent ceux où l’on découvre le problème : retour tardif, préparation du dimanche, location courte durée. Nous assurons une continuité de service pour Toulon et les communes voisines. ${BASE}`,
    sections: [
      {
        title: 'Logement locatif et saisonnier',
        body: `Sur Toulon et le littoral, les locations Airbnb et meublés de tourisme génèrent des pics d’appels le week-end — nous connaissons les contraintes d’accès et de parking.`,
      },
      {
        title: 'Sécurité',
        body: `En cas de débordement proche de prises électribas, coupez le disjoncteur concerné en attendant l’arrivée du technicien.`,
      },
    ],
    faqs: [
      {
        question: 'Puis-je payer par carte sur place ?',
        answer: 'Demandez les moyens de paiement acceptés lors de l’appel ; le règlement est précisé avant intervention.',
      },
      {
        question: 'Intervenez-vous le 1er janvier ?',
        answer: 'Oui, 7j/7 toute l’année.',
      },
      {
        question: 'Faut-il être présent dans le logement ?',
        answer: 'Oui ou une personne majeure habilitée à ouvrir et valider le devis.',
      },
    ],
    focusKeyword: 'debouchage évier toulon week-end',
    villeSlug: 'toulon',
  },
  {
    slug: 'toulon-immeuble-collectif',
    breadcrumbLabel: 'Évier immeuble Toulon',
    metaTitle: 'Évier bouché en copropriété à Toulon — debouchage collectif',
    metaDescription:
      'Évier bouché en appartement à Toulon ? Canalisation privative vs partie commune : diagnostic, responsabilités, intervention rapide.',
    h1: 'Évier bouché en copropriété à Toulon',
    intro: `En immeuble, le bouchon peut être sur votre branche privative ou, plus rarement, lié à une colonne ou un regard commun. Nous déterminons l’origine pour facturer le bon interlocuteur (occupant vs syndic). ${BASE}`,
    sections: [
      {
        title: 'Partie privative',
        body: `Siphon, tronçon sous évier jusqu’au regard de colonne : c’est le cas le plus fréquent ; l’intervention est à la charge du locataire ou du propriétaire selon le bail.`,
      },
      {
        title: 'Syndic et parties communes',
        body: `Si le problème est identifié en colonne ou regard commun, nous pouvons fournir un rapport pour le syndic.`,
      },
    ],
    faqs: [
      {
        question: 'Dois-je prévenir le syndic avant ?',
        answer: 'Pour une canalisation privative, non en urgence ; pour des parties communes, le syndic doit être informé selon le règlement de copropriété.',
      },
      {
        question: 'Intervenez-vous avec le gardien ?',
        answer: 'Oui si nécessaire pour accéder aux locaux techniques ou regards.',
      },
      {
        question: 'Avez-vous l’habitude des grandes résidences toulonnaises ?',
        answer: 'Oui, nous intervenons régulièrement sur des copropriétés du centre et des quartiers périphériques.',
      },
    ],
    focusKeyword: 'debouchage évier appartement toulon',
    villeSlug: 'toulon',
  },
  {
    slug: 'toulon-devis-gratuit',
    breadcrumbLabel: 'Devis évier Toulon',
    metaTitle: 'Devis gratuit debouchage évier Toulon — sans engagement',
    metaDescription:
      'Devis gratuit par téléphone pour un debouchage d’évier à Toulon. Prix annoncé avant intervention, pas de surprise.',
    h1: 'Devis gratuit pour debouchage d’évier à Toulon',
    intro: `La transparence tarifaire est essentielle : vous décrivez le symptôme (écoulement lent, refoulement, odeur), nous vous indiquons une fourchette ou un forfait selon les cas. Aucun engagement avant validation. ${BASE}`,
    sections: [
      {
        title: 'Ce qui influence le prix',
        body: `Accessibilité du siphon, nécessité de découper un faux plafond, longueur du furet, hydrocurage : chaque paramètre est expliqué.`,
      },
      {
        title: 'Agréé assurances',
        body: `En cas de sinistre couvert, nous pouvons fournir les éléments pour votre dossier (compte rendu d’intervention).`,
      },
    ],
    faqs: [
      {
        question: 'Le déplacement est-il facturé ?',
        answer: 'Les conditions sont précisées au téléphone ; souvent le déplacement est inclus dans la zone Toulon agglomération.',
      },
      {
        question: 'Puis-je refuser après le devis sur place ?',
        answer: 'Oui si le diagnostic sur place révèle des travaux différents ; aucun travail ne commence sans votre accord.',
      },
      {
        question: 'Émettez-vous une facture détaillée ?',
        answer: 'Oui, avec la description de la prestation.',
      },
    ],
    focusKeyword: 'devis debouchage évier toulon',
    villeSlug: 'toulon',
  },
  {
    slug: 'la-seyne-sur-mer',
    breadcrumbLabel: 'Évier La Seyne-sur-Mer',
    metaTitle: 'Debouchage évier La Seyne-sur-Mer (83500) — 24h/7j',
    metaDescription:
      'Évier bouché à La Seyne-sur-Mer ? Debouchage rapide, siphon, cuisine, lave-vaisselle. Devis gratuit, intervention Var.',
    h1: 'Debouchage d’évier à La Seyne-sur-Mer',
    intro: `Deuxième ville du département par la population, La Seyne-sur-Mer cumule habitat dense au bord de la rade et quartiers plus récents. Les bouchons d’évier y sont fréquents (graisses, calcaire, usage intensif). Nous intervenons à La Seyne comme sur Toulon, avec des délais comparables. ${BASE}`,
    sections: [
      {
        title: 'Réseaux et topographie',
        body: `La pente et la distance jusqu’au collecteur peuvent influencer l’écoulement ; nous adaptons le matériel (furet longue portée, caméra si besoin).`,
      },
      {
        title: 'Lien utile',
        body: `Pour une vue d’ensemble des prestations : voir aussi notre page dédiée debouchage évier & lavabo sur La Seyne.`,
      },
    ],
    faqs: [
      {
        question: 'Délai depuis le centre de La Seyne ?',
        answer: 'En général rapide, l’équipe tourne entre Toulon, La Seyne et les communes limitrophes.',
      },
      {
        question: 'Intervenez-vous aux Moulins et à Balaguier ?',
        answer: 'Oui, toute la commune 83500 est couverte.',
      },
      {
        question: 'Tarif différent de Toulon ?',
        answer: 'Les tarifs sont cohérents sur l’agglomération ; le devis tient compte de la complexité, pas du code postal seul.',
      },
    ],
    focusKeyword: 'debouchage évier la seyne sur mer',
    villeSlug: 'la-seyne-sur-mer',
  },
  {
    slug: 'hyeres',
    breadcrumbLabel: 'Évier Hyères',
    metaTitle: 'Debouchage évier Hyères (83400) — cuisine & siphon',
    metaDescription:
      'Évier bouché à Hyères ? Intervention 24h/7j, debouchage siphon et canalisation cuisine. Devis gratuit dans le Var.',
    h1: 'Debouchage d’évier à Hyères',
    intro: `Hyères mêle centre historique, quartiers résidentiels et zones touristiques. Les cuisines très sollicitées en saison génèrent beaucoup d’appels pour éviers bouchés. Nous couvrons Hyères et les secteurs de Giens, La Capte, Les Salins selon délais d’astreinte. ${BASE}`,
    sections: [
      {
        title: 'Calcaire et sel marin',
        body: `L’air salin et l’eau calcaire accélèrent les dépôts dans les canalisations ; un entretien régulier du siphon limite les surprises.`,
      },
      {
        title: 'Résidences secondaires',
        body: `Éviers peu utilisés plusieurs mois : le siphon peut sécher ; un simple remplissage contrôlé peut suffire avant intervention lourde.`,
      },
    ],
    faqs: [
      {
        question: 'Intervenez-vous sur la presqu’île de Giens ?',
        answer: 'Oui, sous réserve de délai selon la tournée du jour.',
      },
      {
        question: 'Puis-je avoir une intervention le samedi en saison ?',
        answer: 'Oui, 7j/7 ; les délais peuvent être un peu plus longs en forte affluence estivale.',
      },
      {
        question: 'Évier bouché = fosse septique ?',
        answer: 'Pas nécessairement ; le diagnostic distingue évacuation cuisine et assainissement non collectif.',
      },
    ],
    focusKeyword: 'debouchage évier hyères',
    villeSlug: 'hyeres',
  },
  {
    slug: 'la-garde',
    breadcrumbLabel: 'Évier La Garde',
    metaTitle: 'Debouchage évier La Garde (83130) — proche Toulon',
    metaDescription:
      'Évier bouché à La Garde ? Technicien près de Toulon, debouchage rapide, devis gratuit. Var 83.',
    h1: 'Debouchage d’évier à La Garde',
    intro: `La Garde est une commune résidentielle très liée à l’agglomération toulonnaise : beaucoup de maisons avec cuisine ouverte sur terrasse et extensions. Les bouchons d’évier liés aux graisses et au calcaire y sont classiques. ${BASE}`,
    sections: [
      {
        title: 'Accès pavillons',
        body: `Souvent un accès direct sous l’évier ; les interventions sont en général rapides si le réseau est en bon état.`,
      },
      {
        title: 'Liaison Toulon — La Garde',
        body: `Nos équipes passent quotidiennement entre Toulon, La Garde et La Valette-du-Var.`,
      },
    ],
    faqs: [
      {
        question: 'Délai moyen depuis l’appel ?',
        answer: 'Souvent rapidement en journée selon la charge.',
      },
      {
        question: 'Intervenez-vous près de la zone commerciale ?',
        answer: 'Oui, habitations et locaux proches.',
      },
      {
        question: 'Puis-je demander un créneau ?',
        answer: 'Oui selon disponibilité ; les urgences passent en priorité.',
      },
    ],
    focusKeyword: 'debouchage évier la garde',
    villeSlug: 'la-garde',
  },
  {
    slug: 'six-fours-les-plages',
    breadcrumbLabel: 'Évier Six-Fours',
    metaTitle: 'Debouchage évier Six-Fours-les-Plages (83140)',
    metaDescription:
      'Évier bouché à Six-Fours-les-Plages ? Debouchage siphon et canalisation, 24h/7j. Devis gratuit Var.',
    h1: 'Debouchage d’évier à Six-Fours-les-Plages',
    intro: `Commune littorale étendue avec de nombreux quartiers résidentiels : les évacuations de cuisine subissent sable, cheveux de visiteurs et graisses estivales. Nous intervenons sur Six-Fours pour tous types de bouchons d’évier. ${BASE}`,
    sections: [
      {
        title: 'Saisonnalité',
        body: `En été, la fréquentation augmente les interventions ; anticipez un peu de délai ou appelez tôt en journée.`,
      },
      {
        title: 'Résidences avec piscine',
        body: `Attention aux rinçages de produits non adaptés qui finissent parfois à proximité des évacuations cuisine — privilégiez les circuits prévus.`,
      },
    ],
    faqs: [
      {
        question: 'Couvrez-vous Le Brusc et la Coudoulière ?',
        answer: 'Oui, l’ensemble de la commune 83140.',
      },
      {
        question: 'Week-end chargé : comment faire ?',
        answer: 'Appelez dès les premiers signes de lenteur pour éviter le passage en urgence absolue.',
      },
      {
        question: 'Intervention le jour même ?',
        answer: 'Souvent oui hors pic exceptionnel.',
      },
    ],
    focusKeyword: 'debouchage évier six fours les plages',
    villeSlug: 'six-fours-les-plages',
  },
  {
    slug: 'sanary-sur-mer',
    breadcrumbLabel: 'Évier Sanary',
    metaTitle: 'Debouchage évier Sanary-sur-Mer (83110)',
    metaDescription:
      'Évier bouché à Sanary-sur-Mer ? Debouchage professionnel, siphon, cuisine. Intervention rapide dans le Var.',
    h1: 'Debouchage d’évier à Sanary-sur-Mer',
    intro: `Port et centre provençal attirent une restauration active ; côté particuliers, les éviers bouchés par graisses et résidus sont fréquents. Nous intervenons à Sanary avec la même exigence de propreté et de transparence tarifaire. ${BASE}`,
    sections: [
      {
        title: 'Petites ruelles et accès',
        body: `Nous prévoyons le matériel transportable à la main si le stationnement est éloigné.`,
      },
      {
        title: 'Lien Toulon — Sanary',
        body: `Distance courte : délais d’intervention généralement très corrects.`,
      },
    ],
    faqs: [
      {
        question: 'Restaurants et bars : comptes spécifiques ?',
        answer: 'Les professionnels ont des besoins en récurrence ; demandez une explication des forfaits ou contrats selon volume.',
      },
      {
        question: 'Intervenez-vous à Portissol ?',
        answer: 'Oui, tous quartiers de Sanary.',
      },
      {
        question: 'Produits bio pour déboucher : efficaces ?',
        answer: 'Souvent insuffisants sur graisses solidifiées ; le mécanique reste la référence.',
      },
    ],
    focusKeyword: 'debouchage évier sanary sur mer',
    villeSlug: 'sanary-sur-mer',
  },
  {
    slug: 'la-valette-du-var',
    breadcrumbLabel: 'Évier La Valette',
    metaTitle: 'Debouchage évier La Valette-du-Var (83160)',
    metaDescription:
      'Évier bouché à La Valette-du-Var ? Proche Toulon, intervention rapide, devis gratuit. Debouchage évier & lavabo.',
    h1: 'Debouchage d’évier à La Valette-du-Var',
    intro: `Ville dynamique en continuité urbaine avec Toulon : nombreux pavillons et copropriétés. Les éviers bouchés y sont traités comme sur Toulon, avec des délais souvent très courts grâce à la proximité géographique. ${BASE}`,
    sections: [
      {
        title: 'Quartiers en pente',
        body: `L’écoulement gravitaire peut masquer un bouchon partiel ; le diagnostic au débit réel reste important.`,
      },
      {
        title: 'Transports',
        body: `Accès rapide depuis le réseau routier principal pour nos véhicules équipés.`,
      },
    ],
    faqs: [
      {
        question: 'Tarif identique à Toulon ?',
        answer: 'Oui, même logique de devis selon complexité.',
      },
      {
        question: 'Intervention en soirée ?',
        answer: 'Oui, astreinte 24h/7j.',
      },
      {
        question: 'Lave-vaisselle relié à l’évier : même intervention ?',
        answer: 'Oui, nous vérifions la ligne commune.',
      },
    ],
    focusKeyword: 'debouchage évier la valette du var',
    villeSlug: 'la-valette-du-var',
  },
  {
    slug: 'ollioules',
    breadcrumbLabel: 'Évier Ollioules',
    metaTitle: 'Debouchage évier Ollioules (83190) — Var',
    metaDescription:
      'Évier bouché à Ollioules entre Toulon et Sanary ? Debouchage siphon, canalisation, 24h/7j. Devis gratuit.',
    h1: 'Debouchage d’évier à Ollioules',
    intro: `Ollioules relie littoral et collines : villas et immeubles présentent des configurations variées. Les bouchons d’évier par graisses et calcaire sont fréquents ; nous intervenons sur toute la commune. ${BASE}`,
    sections: [
      {
        title: 'Village ancien et lotissements',
        body: `Les réseaux peuvent différer fortement selon l’âge du bâtiment ; nous adaptons le diagnostic.`,
      },
      {
        title: 'Accès depuis la RD',
        body: `Déplacements rapides depuis Toulon ou Sanary pour nos équipes.`,
      },
    ],
    faqs: [
      {
        question: 'Délai depuis Ollioules centre ?',
        answer: 'Souvent très court en journée.',
      },
      {
        question: 'Intervenez-vous à Cauvin ?',
        answer: 'Oui, l’ensemble de la commune.',
      },
      {
        question: 'Évier + machine à laver sur même évacuation ?',
        answer: 'Nous testons les deux appareils après intervention.',
      },
    ],
    focusKeyword: 'debouchage évier ollioules',
    villeSlug: 'ollioules',
  },
  {
    slug: 'le-pradet',
    breadcrumbLabel: 'Évier Le Pradet',
    metaTitle: 'Debouchage évier Le Pradet (83220)',
    metaDescription:
      'Évier bouché au Pradet ? Intervention debouchage cuisine, siphon, canalisation. Var 83, devis gratuit.',
    h1: 'Debouchage d’évier au Pradet',
    intro: `Commune résidentielle entre mer et collines, Le Pradet compte de nombreuses maisons individuelles. Les éviers bouchés y sont traités avec le même protocole que sur l’agglomération toulonnaise. ${BASE}`,
    sections: [
      {
        title: 'Secteur calme',
        body: `Stationnement et accès maison en général simples pour une intervention efficace.`,
      },
      {
        title: 'Proximité La Garde et Toulon',
        body: `Délais d’arrivée en général avantageux.`,
      },
    ],
    faqs: [
      {
        question: 'Couvrez-vous toute la commune ?',
        answer: 'Oui, 83220 en entier.',
      },
      {
        question: 'Week-end : délai ?',
        answer: 'Astreinte identique aux autres jours.',
      },
      {
        question: 'Besoin d’un rapport pour assurance ?',
        answer: 'Précisez-le avant l’intervention.',
      },
    ],
    focusKeyword: 'debouchage évier le pradet',
    villeSlug: 'le-pradet',
  },
  {
    slug: 'carqueiranne',
    breadcrumbLabel: 'Évier Carqueiranne',
    metaTitle: 'Debouchage évier Carqueiranne (83320)',
    metaDescription:
      'Évier bouché à Carqueiranne ? Debouchage professionnel près de Toulon et Hyères. 24h/7j, devis gratuit.',
    h1: 'Debouchage d’évier à Carqueiranne',
    intro: `Entre Toulon et Hyères, Carqueiranne offre un habitat mixte avec forte composante littorale. Salinité et calcaire favorisent les dépôts dans les canalisations de cuisine. ${BASE}`,
    sections: [
      {
        title: 'Quartiers côtiers',
        body: `Ventilation et humidité peuvent influencer les odeurs ; nous distinguons bouchon et problème de ventilation.`,
      },
      {
        title: 'Déplacements',
        body: `Nous tournons entre Carqueiranne, La Garde et le littoral hyérois.`,
      },
    ],
    faqs: [
      {
        question: 'Intervenez-vous à Les Sablettes ?',
        answer: 'Oui.',
      },
      {
        question: 'Délai depuis Carqueiranne ?',
        answer: 'Variable selon astreinte ; souvent rapide.',
      },
      {
        question: 'Puis-je combiner avec visite autre sanitaire ?',
        answer: 'Oui sur devis si le diagnostic le permet sur la même visite.',
      },
    ],
    focusKeyword: 'debouchage évier carqueiranne',
    villeSlug: 'carqueiranne',
  },
  {
    slug: 'la-londe-les-maures',
    breadcrumbLabel: 'Évier La Londe',
    metaTitle: 'Debouchage évier La Londe-les-Maures (83250)',
    metaDescription:
      'Évier bouché à La Londe-les-Maures ? Debouchage évier cuisine, siphon, urgence possible. Var.',
    h1: 'Debouchage d’évier à La Londe-les-Maures',
    intro: `Au cœur du vignoble et proche de Hyères, La Londe accueille résidents permanents et saisonniers. Les cuisines très actives en été génèrent des pics de bouchons d’évier. ${BASE}`,
    sections: [
      {
        title: 'Vignoble et tourisme',
        body: `Locations et résidences secondaires : prévoir l’entretien du siphon en début de saison.`,
      },
      {
        title: 'Accès',
        body: `Nous desservons l’ensemble du territoire communal.`,
      },
    ],
    faqs: [
      {
        question: 'Été : délai plus long ?',
        answer: 'Possible en juillet-août ; appelez aux premiers symptômes.',
      },
      {
        question: 'Intervenez-vous près des zones viticoles ?',
        answer: 'Oui.',
      },
      {
        question: 'Devis par téléphone possible ?',
        answer: 'Oui, comme partout sur le Var.',
      },
    ],
    focusKeyword: 'debouchage évier la londe les maures',
    villeSlug: 'la-londe-les-maures',
  },
];

export function getGeoEvierVarPage(slug: string): GeoEvierVarPageDef | undefined {
  return GEO_EVIER_VAR_PAGES.find((p) => p.slug === slug);
}

export function getAllGeoEvierVarSlugs(): string[] {
  return GEO_EVIER_VAR_PAGES.map((p) => p.slug);
}

export function getRelatedGeoEvierVarSlugs(currentSlug: string, count = 6): string[] {
  const all = GEO_EVIER_VAR_PAGES.map((p) => p.slug);
  const idx = all.indexOf(currentSlug);
  if (idx === -1) return [];
  const out: string[] = [];
  for (let offset = 1; out.length < count && offset < all.length; offset++) {
    const j = (idx + offset) % all.length;
    if (all[j] !== currentSlug) out.push(all[j]);
  }
  return out;
}
