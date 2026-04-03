import { FaqItem } from '@/lib/types';

export interface GeoEvier13PageDef {
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

const BASE = `Intervention dans toute l&apos;agglomération Marseille-Aubagne : Marseille, Aubagne, La Ciotat, Marignane, Vitrolles, Aix-en-Provence, Gardanne, Allauch, Gémenos et communes limitrophes.`;

export const GEO_EVIER_13_PAGES: GeoEvier13PageDef[] = [
  {
    slug: 'marseille-urgence',
    breadcrumbLabel: 'Urgence évier Marseille',
    metaTitle: 'Debouchage évier Marseille urgence — intervention rapide',
    metaDescription:
      'Évier bouché à Marseille ? Urgence 24h/7j, déplacement rapide, devis gratuit. Siphon, graisse, canalisation cuisine. Agréé assurances.',
    h1: 'Debouchage d\u2019évier d\u2019urgence à Marseille',
    intro: `Un évier qui ne se vide plus ou qui déborde est une vraie urgence sanitaire : odeurs, risque de fuite, impossibilité d\u2019utiliser la cuisine. À Marseille (13000) et dans l\u2019agglomération, nous priorisons ces appels et nous déplaçons en général rapidement. ${BASE}`,
    sections: [
      {
        title: 'Pourquoi traiter une urgence évier sans attendre',
        body: `Plus vous attendez, plus les graisses et résidus se figent dans le siphon et la canalisation. Un simple ralentissement peut virer en refoulement complet. Nos techniciens interviennent avec furet, pompe et matériel adapté aux immeubles marseillais (Vieux-Port, Castellane, La Joliette, zones pavillonnaires).`,
      },
      {
        title: 'Ce que nous faisons sur place',
        body: `Diagnostic du bouchon (siphon, canalisation murale, raccord lave-vaisselle), démontage et nettoyage du siphon si besoin, passage de furet ou hydrocurage ciblé. Prix annoncé avant intervention, garantie sur le debouchage réalisé.`,
      },
    ],
    faqs: [
      {
        question: 'Intervenez-vous le dimanche pour un évier bouché à Marseille ?',
        answer: 'Oui, 7j/7 y compris jours fériés. Le numéro d\u2019urgence est le même ; nous vous indiquons le délai estimé dès l\u2019appel.',
      },
      {
        question: 'Combien coûte une urgence debouchage évier à Marseille ?',
        answer: 'Le tarif dépend de la complexité (siphon seul vs canalisation longue). Nous vous donnons un devis gratuit par téléphone et confirmons le montant avant de commencer.',
      },
      {
        question: 'Intervenez-vous dans tous les arrondissements de Marseille ?',
        answer: 'Oui : centre-ville, Castellane, La Joliette, Endoume, La Valentine, Saint-Loup, Les Olives, autant de secteurs où nous intervenons régulièrement.',
      },
    ],
    focusKeyword: 'debouchage évier marseille urgence',
    villeSlug: 'marseille',
  },
  {
    slug: 'marseille-24h',
    breadcrumbLabel: 'Évier Marseille 24h/7j',
    metaTitle: 'Debouchage évier Marseille 24h/7j — technicien de garde',
    metaDescription:
      'Service de debouchage d\u2019évier à Marseille 24h/7j. Réponse rapide, devis gratuit, intervention jour et nuit dans les Bouches-du-Rhône.',
    h1: 'Debouchage d\u2019évier à Marseille — disponible 24h/7j',
    intro: `Les bouchons d\u2019évier ne tombent pas toujours aux heures ouvrables. Nous maintenons une astreinte pour Marseille et l\u2019agglomération : vous joignez toujours un interlocuteur et une équipe peut être envoyée selon l\u2019urgence. ${BASE}`,
    sections: [
      {
        title: 'Astreinte nuit et week-end',
        body: `Week-ends, nuits et jours fériés : le principe reste identique — diagnostic clair, intervention propre, facturation transparente. Idéal si vous gérez une location saisonnière ou un commerce sur Marseille.`,
      },
      {
        title: 'Lien avec le lave-vaisselle et la bonde',
        body: `Souvent le lave-vaisselle et l\u2019évier partagent la même évacuation. Nous vérifions les deux pour éviter un retour du bouchon quelques jours après l\u2019intervention.`,
      },
    ],
    faqs: [
      {
        question: 'Le tarif est-il plus élevé la nuit à Marseille ?',
        answer: 'Les majorations éventuelles sont annoncées avant envoi sur place. Demandez un devis par téléphone pour connaître le montant applicable à votre créneau.',
      },
      {
        question: 'Puis-je avoir une intervention le jour même ?',
        answer: 'Dans la majorité des cas oui, sous quelques heures selon la charge et votre secteur à Marseille.',
      },
      {
        question: 'Intervenez-vous aussi pour un évier de buanderie ?',
        answer: 'Oui, le principe d\u2019évacuation est le même ; nous adaptons le matériel au diamètre et à l\u2019accessibilité.',
      },
    ],
    focusKeyword: 'debouchage évier marseille 24h',
    villeSlug: 'marseille',
  },
  {
    slug: 'marseille-siphon-bouche',
    breadcrumbLabel: 'Siphon évier bouché Marseille',
    metaTitle: 'Siphon d\u2019évier bouché à Marseille — démontage et debouchage',
    metaDescription:
      'Siphon bouché sous l\u2019évier à Marseille ? Démontage, nettoyage, contrôle de la canalisation. Intervention rapide, devis gratuit.',
    h1: 'Siphon d\u2019évier bouché à Marseille',
    intro: `Le siphon (ou « culot ») retient les odeurs et intercepte les solides. Lorsqu\u2019il est saturé de graisse et de résidus, l\u2019eau monte dans l\u2019évier. C\u2019est l\u2019intervention la plus fréquente à Marseille : souvent résolue en démontant et nettoyant le siphon, parfois en prolongeant le furet dans la canalisation. ${BASE}`,
    sections: [
      {
        title: 'Signes d\u2019un siphon saturé',
        body: `Écoulement lent, gargouillis, odeur de canalisation dès que vous videz l\u2019évier. Avant d\u2019utiliser des produits agressifs qui peuvent abîmer les joints, faites appel à un professionnel.`,
      },
      {
        title: 'Après le debouchage',
        body: `Nous vous expliquons les bonnes habitudes : éviter de verser l\u2019huile chaude dans l\u2019évier, utiliser une bonde-panier, rincer régulièrement à l\u2019eau chaude modérée.`,
      },
    ],
    faqs: [
      {
        question: 'Faut-il toujours remplacer le siphon ?',
        answer: 'Non. S\u2019il n\u2019est pas fissuré et que les joints sont encore étanches, un nettoyage suffit souvent.',
      },
      {
        question: 'Et si le bouchon est après le siphon ?',
        answer: 'Nous passons alors un furet motorisé dans la canalisation murale jusqu\u2019au collecteur selon l\u2019accessibilité.',
      },
      {
        question: 'Intervenez-vous sur évier inox et résine ?',
        answer: 'Oui, nous protégeons le plan de travail et les raccords pendant l\u2019intervention.',
      },
    ],
    focusKeyword: 'siphon évier bouché marseille',
    villeSlug: 'marseille',
  },
  {
    slug: 'marseille-13000-centre',
    breadcrumbLabel: 'Évier Marseille 13000',
    metaTitle: 'Debouchage évier 13000 Marseille — centre et quartiers',
    metaDescription:
      'Debouchage d\u2019évier sur Marseille code postal 13000 : centre-ville, Vieux-Port, quartiers nord et sud. Devis gratuit, intervention rapide.',
    h1: 'Debouchage d\u2019évier sur Marseille (13000)',
    intro: `Le code postal 13000 couvre Marseille intra-muros et plusieurs quartiers aux réseaux très différents : immeubles anciens du centre, copropriétés récentes, maisons individuelles en périphérie proche. Nous adaptons notre méthode au type de plomberie et au diamètre des canalisations. ${BASE}`,
    sections: [
      {
        title: 'Immeubles collectifs à Marseille',
        body: `Colonnes verticales, coudes serrés : le bouchon peut être local à votre logement ou lié à une canalisation commune. Nous diagnostiquons pour intervenir au bon endroit.`,
      },
      {
        title: 'Maisons et extensions',
        body: `Évacuation longue vers la fosse ou le tout-à-l\u2019égout : l\u2019hydrocurage peut être nécessaire si la graisse a adhéré sur plusieurs mètres.`,
      },
    ],
    faqs: [
      {
        question: 'Intervenez-vous près du Vieux-Port de Marseille ?',
        answer: 'Oui, tout le périmètre 13000 est couvert, y compris les zones littorales et le centre historique.',
      },
      {
        question: 'Avez-vous des délais différents selon le quartier ?',
        answer: 'Le délai dépend surtout de la charge d\u2019astreinte au moment de l\u2019appel ; nous vous donnons une estimation réaliste.',
      },
      {
        question: 'Puis-je regrouper plusieurs sanitaires sur une même visite ?',
        answer: 'Oui si le diagnostic le permet — par exemple évier et lave-vaisselle sur la même évacuation.',
      },
    ],
    focusKeyword: 'debouchage évier 13000 marseille',
    villeSlug: 'marseille',
  },
  {
    slug: 'marseille-graisse-cuisine',
    breadcrumbLabel: 'Graisse évier Marseille',
    metaTitle: 'Évier bouché par la graisse à Marseille — hydrocurage',
    metaDescription:
      'Évier de cuisine bouché par la graisse à Marseille ? Curage, hydrocurage, prévention. Intervention pro dans les Bouches-du-Rhône.',
    h1: 'Évier de cuisine bouché par la graisse à Marseille',
    intro: `La graisse de cuisson refroidie se solidifie dans les canalisations et colle les autres résidus. C\u2019est la première cause de bouchon d\u2019évier en cuisine sur Marseille et en bord de mer où l\u2019on cuisine beaucoup à la maison. ${BASE}`,
    sections: [
      {
        title: 'Pourquoi les produits du commerce échouent',
        body: `Les déboucheurs chimiques dissolvent partiellement la graisse sans la évacuer ; le bouchon revient souvent. Le mécanique (furet) ou l\u2019eau haute pression ciblée est plus durable.`,
      },
      {
        title: 'Prévention sur Marseille',
        body: `Bac à graisse pour les pros ; côté particulier : filtre à bonde, raclage des assiettes à la poubelle, jamais d\u2019huile chaude directement versée dans l\u2019évier.`,
      },
    ],
    faqs: [
      {
        question: 'L\u2019hydrocurage abîme-t-il les vieilles canalisations ?',
        answer: 'Nous adaptons la pression au matériau (PVC, fonte, grès) après observation des raccords.',
      },
      {
        question: 'Combien de temps dure une intervention graisse ?',
        answer: 'Souvent 45 min à 1 h 30 selon la longueur du tronçon à curer.',
      },
      {
        question: 'Puis-je utiliser l\u2019évier tout de suite après ?',
        answer: 'Oui dès que l\u2019écoulement est rétabli et les joints remontés.',
      },
    ],
    focusKeyword: 'évier bouché graisse marseille',
    villeSlug: 'marseille',
  },
  {
    slug: 'marseille-odeur',
    breadcrumbLabel: 'Odeurs évier Marseille',
    metaTitle: 'Odeurs d\u2019égout sous l\u2019évier à Marseille — diagnostic et debouchage',
    metaDescription:
      'Mauvaises odeurs sous l\u2019évier à Marseille ? Canalisation, siphon, regard : diagnostic et traitement. Urgence possible 24h/7j.',
    h1: 'Odeurs sous l\u2019évier à Marseille : causes et solutions',
    intro: `Les odeurs peuvent venir d\u2019un siphon asséché, d\u2019un bouchon partiel qui retient des eaux grises, ou d\u2019un problème de ventilation de la canalisation. À Marseille, l\u2019humidité côtière peut aussi aggraver les biofilms dans les conduites. Nous identifions la cause avant d\u2019agir. ${BASE}`,
    sections: [
      {
        title: 'Siphon sec ou mal rempli',
        body: `Peu fréquent si l\u2019évier est utilisé quotidiennement ; plus courant sur une cuisine secondaire ou après des travaux.`,
      },
      {
        title: 'Remontées depuis le collecteur',
        body: `Si l\u2019odeur persiste après nettoyage du siphon, le problème peut être en aval — nous contrôlons avec le matériel adapté.`,
      },
    ],
    faqs: [
      {
        question: 'Les odeurs peuvent-elles venir du lave-vaisselle ?',
        answer: 'Oui si le raccord ou le filtre sont encrassés ; nous vérifions la ligne d\u2019évacuation commune avec l\u2019évier.',
      },
      {
        question: 'Faut-il une caméra à chaque fois ?',
        answer: 'Pas systématiquement ; la caméra est utile si le bouchon est profond ou récurrent.',
      },
      {
        question: 'Intervention possible le jour même à Marseille ?',
        answer: 'Oui dans la plupart des cas, selon astreinte.',
      },
    ],
    focusKeyword: 'odeur évier marseille',
    villeSlug: 'marseille',
  },
  {
    slug: 'marseille-intervention-rapide',
    breadcrumbLabel: 'Intervention rapide Marseille',
    metaTitle: 'Debouchage évier Marseille rapide — sous 1 h en général',
    metaDescription:
      'Besoin d\u2019un debouchage d\u2019évier rapide à Marseille ? Équipes mobiles, prise en charge express, devis par téléphone.',
    h1: 'Intervention rapide pour évier bouché à Marseille',
    intro: `Vous préparez un repas, vous recevez de la famille ou vous gérez un commerce : chaque minute compte. Nous positionnons des équipes pour des interventions rapides sur Marseille et l\u2019aire urbaine lorsque la situation l\u2019exige. ${BASE}`,
    sections: [
      {
        title: 'Ce qui accélère l\u2019intervention',
        body: `Indiquez votre adresse précise, l\u2019étage si immeuble, et si l\u2019eau déborde encore ou non. Cela nous permet d\u2019arriver avec le bon matériel.`,
      },
      {
        title: 'Après le debouchage',
        body: `Nous testons l\u2019écoulement, vérifions l\u2019absence de fuite au niveau du siphon remonté, et vous laissons une facture claire.`,
      },
    ],
    faqs: [
      {
        question: 'Puis-je être prioritaire si j\u2019ai un nourrisson à domicile ?',
        answer: 'Signalez-le : nous faisons le maximum pour réduire le délai quand l\u2019hygiène est compromise.',
      },
      {
        question: 'Intervenez-vous pour les professionnels (restaurants) ?',
        answer: 'Oui, avec des moyens adaptés aux gros débits et aux horaires contraints.',
      },
      {
        question: 'Quel délai depuis Aubagne ou Marignane ?',
        answer: 'Généralement comparable : nous tournons sur toute l\u2019agglomération Marseille-Aubagne.',
      },
    ],
    focusKeyword: 'debouchage évier marseille rapide',
    villeSlug: 'marseille',
  },
  {
    slug: 'marseille-nuit-week-end',
    breadcrumbLabel: 'Évier Marseille nuit & week-end',
    metaTitle: 'Debouchage évier Marseille nuit et week-end — astreinte',
    metaDescription:
      'Évier bouché la nuit ou le week-end à Marseille ? Astreinte téléphonique et déplacements. Devis gratuit.',
    h1: 'Debouchage d\u2019évier la nuit et le week-end à Marseille',
    intro: `Les créneaux hors horaires sont souvent ceux où l\u2019on découvre le problème : retour tardif, préparation du dimanche, location courte durée. Nous assurons une continuité de service pour Marseille et les communes voisines. ${BASE}`,
    sections: [
      {
        title: 'Logement locatif et saisonnier',
        body: `Sur Marseille et le littoral, les locations Airbnb et meublés de tourisme génèrent des pics d\u2019appels le week-end — nous connaissons les contraintes d\u2019accès et de parking.`,
      },
      {
        title: 'Sécurité',
        body: `En cas de débordement proche de prises électriques, coupez le disjoncteur concerné en attendant l\u2019arrivée du technicien.`,
      },
    ],
    faqs: [
      {
        question: 'Puis-je payer par carte sur place ?',
        answer: 'Demandez les moyens de paiement acceptés lors de l\u2019appel ; le règlement est précisé avant intervention.',
      },
      {
        question: 'Intervenez-vous le 1er janvier ?',
        answer: 'Oui, 7j/7 toute l\u2019année.',
      },
      {
        question: 'Faut-il être présent dans le logement ?',
        answer: 'Oui ou une personne majeure habilitée à ouvrir et valider le devis.',
      },
    ],
    focusKeyword: 'debouchage évier marseille week-end',
    villeSlug: 'marseille',
  },
  {
    slug: 'marseille-immeuble-collectif',
    breadcrumbLabel: 'Évier immeuble Marseille',
    metaTitle: 'Évier bouché en copropriété à Marseille — debouchage collectif',
    metaDescription:
      'Évier bouché en appartement à Marseille ? Canalisation privative vs partie commune : diagnostic, responsabilités, intervention rapide.',
    h1: 'Évier bouché en copropriété à Marseille',
    intro: `En immeuble, le bouchon peut être sur votre branche privative ou, plus rarement, lié à une colonne ou un regard commun. Nous déterminons l\u2019origine pour facturer le bon interlocuteur (occupant vs syndic). ${BASE}`,
    sections: [
      {
        title: 'Partie privative',
        body: `Siphon, tronçon sous évier jusqu\u2019au regard de colonne : c\u2019est le cas le plus fréquent ; l\u2019intervention est à la charge du locataire ou du propriétaire selon le bail.`,
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
        question: 'Avez-vous l\u2019habitude des grandes résidences marseillaises ?',
        answer: 'Oui, nous intervenons régulièrement sur des copropriétés du centre et des quartiers périphériques.',
      },
    ],
    focusKeyword: 'debouchage évier appartement marseille',
    villeSlug: 'marseille',
  },
  {
    slug: 'marseille-devis-gratuit',
    breadcrumbLabel: 'Devis évier Marseille',
    metaTitle: 'Devis gratuit debouchage évier Marseille — sans engagement',
    metaDescription:
      'Devis gratuit par téléphone pour un debouchage d\u2019évier à Marseille. Prix annoncé avant intervention, pas de surprise.',
    h1: 'Devis gratuit pour debouchage d\u2019évier à Marseille',
    intro: `La transparence tarifaire est essentielle : vous décrivez le symptôme (écoulement lent, refoulement, odeur), nous vous indiquons une fourchette ou un forfait selon les cas. Aucun engagement avant validation. ${BASE}`,
    sections: [
      {
        title: 'Ce qui influence le prix',
        body: `Accessibilité du siphon, nécessité de découper un faux plafond, longueur du furet, hydrocurage : chaque paramètre est expliqué.`,
      },
      {
        title: 'Agréé assurances',
        body: `En cas de sinistre couvert, nous pouvons fournir les éléments pour votre dossier (compte rendu d\u2019intervention).`,
      },
    ],
    faqs: [
      {
        question: 'Le déplacement est-il facturé ?',
        answer: 'Les conditions sont précisées au téléphone ; souvent le déplacement est inclus dans la zone Marseille agglomération.',
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
    focusKeyword: 'devis debouchage évier marseille',
    villeSlug: 'marseille',
  },
  {
    slug: 'aubagne',
    breadcrumbLabel: 'Évier Aubagne',
    metaTitle: 'Debouchage évier Aubagne (13400) — 24h/7j',
    metaDescription:
      'Évier bouché à Aubagne ? Debouchage rapide, siphon, cuisine, lave-vaisselle. Devis gratuit, intervention Bouches-du-Rhône.',
    h1: 'Debouchage d\u2019évier à Aubagne',
    intro: `Aubagne est notre base principale : les bouchons d\u2019évier y sont fréquents (graisses, calcaire, usage intensif). Nous intervenons sur Aubagne et toute l\u2019agglomération avec des délais très courts. ${BASE}`,
    sections: [
      {
        title: 'Réseaux et topographie',
        body: `La pente et la distance jusqu\u2019au collecteur peuvent influencer l\u2019écoulement ; nous adaptons le matériel (furet longue portée, caméra si besoin).`,
      },
      {
        title: 'Lien utile',
        body: `Pour une vue d\u2019ensemble des prestations : voir aussi notre page dédiée debouchage évier & lavabo sur Aubagne.`,
      },
    ],
    faqs: [
      {
        question: 'Délai depuis le centre d\u2019Aubagne ?',
        answer: 'En général très rapide, l\u2019équipe est basée sur place.',
      },
      {
        question: 'Intervenez-vous à La Tourtelle et aux Passons ?',
        answer: 'Oui, toute la commune 13400 est couverte.',
      },
      {
        question: 'Tarif différent de Marseille ?',
        answer: 'Les tarifs sont cohérents sur l\u2019agglomération ; le devis tient compte de la complexité, pas du code postal seul.',
      },
    ],
    focusKeyword: 'debouchage évier aubagne',
    villeSlug: 'aubagne',
  },
  {
    slug: 'marignane',
    breadcrumbLabel: 'Évier Marignane',
    metaTitle: 'Debouchage évier Marignane (13700) — cuisine & siphon',
    metaDescription:
      'Évier bouché à Marignane ? Intervention 24h/7j, debouchage siphon et canalisation cuisine. Devis gratuit dans les Bouches-du-Rhône.',
    h1: 'Debouchage d\u2019évier à Marignane',
    intro: `Marignane est notre seconde base d\u2019intervention. Les cuisines très sollicitées génèrent beaucoup d\u2019appels pour éviers bouchés. Nous couvrons Marignane et les secteurs de Vitrolles, Les Pennes-Mirabeau selon délais d\u2019astreinte. ${BASE}`,
    sections: [
      {
        title: 'Calcaire et réseau',
        body: `L\u2019eau calcaire accélère les dépôts dans les canalisations ; un entretien régulier du siphon limite les surprises.`,
      },
      {
        title: 'Proximité aéroport',
        body: `Nombreuses locations courte durée autour de l\u2019aéroport : les siphons peu utilisés peuvent sécher ; un remplissage contrôlé peut suffire avant intervention lourde.`,
      },
    ],
    faqs: [
      {
        question: 'Intervenez-vous près de l\u2019aéroport ?',
        answer: 'Oui, toute la commune de Marignane est couverte.',
      },
      {
        question: 'Puis-je avoir une intervention le samedi ?',
        answer: 'Oui, 7j/7 ; les délais peuvent être un peu plus longs en forte affluence.',
      },
      {
        question: 'Évier bouché = fosse septique ?',
        answer: 'Pas nécessairement ; le diagnostic distingue évacuation cuisine et assainissement non collectif.',
      },
    ],
    focusKeyword: 'debouchage évier marignane',
    villeSlug: 'marignane',
  },
  {
    slug: 'allauch',
    breadcrumbLabel: 'Évier Allauch',
    metaTitle: 'Debouchage évier Allauch (13190) — proche Marseille',
    metaDescription:
      'Évier bouché à Allauch ? Technicien près de Marseille, debouchage rapide, devis gratuit. Bouches-du-Rhône 13.',
    h1: 'Debouchage d\u2019évier à Allauch',
    intro: `Allauch est une commune résidentielle très liée à l\u2019agglomération marseillaise : beaucoup de maisons avec cuisine ouverte sur terrasse et extensions. Les bouchons d\u2019évier liés aux graisses et au calcaire y sont classiques. ${BASE}`,
    sections: [
      {
        title: 'Accès pavillons',
        body: `Souvent un accès direct sous l\u2019évier ; les interventions sont en général rapides si le réseau est en bon état.`,
      },
      {
        title: 'Liaison Marseille — Allauch',
        body: `Nos équipes passent quotidiennement entre Marseille, Allauch et Aubagne.`,
      },
    ],
    faqs: [
      {
        question: 'Délai moyen depuis l\u2019appel ?',
        answer: 'Souvent rapidement en journée selon la charge.',
      },
      {
        question: 'Intervenez-vous au village ?',
        answer: 'Oui, habitations et locaux proches.',
      },
      {
        question: 'Puis-je demander un créneau ?',
        answer: 'Oui selon disponibilité ; les urgences passent en priorité.',
      },
    ],
    focusKeyword: 'debouchage évier allauch',
    villeSlug: 'allauch',
  },
  {
    slug: 'vitrolles',
    breadcrumbLabel: 'Évier Vitrolles',
    metaTitle: 'Debouchage évier Vitrolles (13127)',
    metaDescription:
      'Évier bouché à Vitrolles ? Debouchage siphon et canalisation, 24h/7j. Devis gratuit Bouches-du-Rhône.',
    h1: 'Debouchage d\u2019évier à Vitrolles',
    intro: `Commune dynamique avec de nombreux quartiers résidentiels : les évacuations de cuisine subissent graisses et calcaire. Nous intervenons sur Vitrolles pour tous types de bouchons d\u2019évier. ${BASE}`,
    sections: [
      {
        title: 'Saisonnalité',
        body: `En été, la fréquentation augmente les interventions ; anticipez un peu de délai ou appelez tôt en journée.`,
      },
      {
        title: 'Zones commerciales et résidentielles',
        body: `Nous intervenons aussi bien en zone pavillonnaire qu\u2019en copropriété ou en local commercial.`,
      },
    ],
    faqs: [
      {
        question: 'Couvrez-vous les Pinchinades et le centre-ville ?',
        answer: 'Oui, l\u2019ensemble de la commune 13127.',
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
    focusKeyword: 'debouchage évier vitrolles',
    villeSlug: 'vitrolles',
  },
  {
    slug: 'la-ciotat',
    breadcrumbLabel: 'Évier La Ciotat',
    metaTitle: 'Debouchage évier La Ciotat (13600)',
    metaDescription:
      'Évier bouché à La Ciotat ? Debouchage professionnel, siphon, cuisine. Intervention rapide dans les Bouches-du-Rhône.',
    h1: 'Debouchage d\u2019évier à La Ciotat',
    intro: `Port et centre provençal attirent une restauration active ; côté particuliers, les éviers bouchés par graisses et résidus sont fréquents. Nous intervenons à La Ciotat avec la même exigence de propreté et de transparence tarifaire. ${BASE}`,
    sections: [
      {
        title: 'Petites ruelles et accès',
        body: `Nous prévoyons le matériel transportable à la main si le stationnement est éloigné.`,
      },
      {
        title: 'Lien Aubagne — La Ciotat',
        body: `Distance courte : délais d\u2019intervention généralement très corrects.`,
      },
    ],
    faqs: [
      {
        question: 'Restaurants et bars : comptes spécifiques ?',
        answer: 'Les professionnels ont des besoins en récurrence ; demandez une explication des forfaits ou contrats selon volume.',
      },
      {
        question: 'Intervenez-vous au port ?',
        answer: 'Oui, tous quartiers de La Ciotat.',
      },
      {
        question: 'Produits bio pour déboucher : efficaces ?',
        answer: 'Souvent insuffisants sur graisses solidifiées ; le mécanique reste la référence.',
      },
    ],
    focusKeyword: 'debouchage évier la ciotat',
    villeSlug: 'la-ciotat',
  },
  {
    slug: 'gardanne',
    breadcrumbLabel: 'Évier Gardanne',
    metaTitle: 'Debouchage évier Gardanne (13120)',
    metaDescription:
      'Évier bouché à Gardanne ? Proche Marseille et Aix, intervention rapide, devis gratuit. Debouchage évier & lavabo.',
    h1: 'Debouchage d\u2019évier à Gardanne',
    intro: `Ville dynamique entre Marseille et Aix-en-Provence : nombreux pavillons et copropriétés. Les éviers bouchés y sont traités rapidement, avec des délais souvent très courts grâce à la proximité géographique. ${BASE}`,
    sections: [
      {
        title: 'Quartiers en pente',
        body: `L\u2019écoulement gravitaire peut masquer un bouchon partiel ; le diagnostic au débit réel reste important.`,
      },
      {
        title: 'Transports',
        body: `Accès rapide depuis le réseau routier principal pour nos véhicules équipés.`,
      },
    ],
    faqs: [
      {
        question: 'Tarif identique à Marseille ?',
        answer: 'Oui, même logique de devis selon complexité.',
      },
      {
        question: 'Intervention en soirée ?',
        answer: 'Oui, astreinte 24h/7j.',
      },
      {
        question: 'Lave-vaisselle relié à l\u2019évier : même intervention ?',
        answer: 'Oui, nous vérifions la ligne commune.',
      },
    ],
    focusKeyword: 'debouchage évier gardanne',
    villeSlug: 'gardanne',
  },
  {
    slug: 'gemenos',
    breadcrumbLabel: 'Évier Gémenos',
    metaTitle: 'Debouchage évier Gémenos (13420) — Bouches-du-Rhône',
    metaDescription:
      'Évier bouché à Gémenos entre Aubagne et La Ciotat ? Debouchage siphon, canalisation, 24h/7j. Devis gratuit.',
    h1: 'Debouchage d\u2019évier à Gémenos',
    intro: `Gémenos relie collines et zone d\u2019activité : villas et immeubles présentent des configurations variées. Les bouchons d\u2019évier par graisses et calcaire sont fréquents ; nous intervenons sur toute la commune. ${BASE}`,
    sections: [
      {
        title: 'Village et lotissements',
        body: `Les réseaux peuvent différer fortement selon l\u2019âge du bâtiment ; nous adaptons le diagnostic.`,
      },
      {
        title: 'Accès depuis la RD',
        body: `Déplacements rapides depuis Aubagne ou Marseille pour nos équipes.`,
      },
    ],
    faqs: [
      {
        question: 'Délai depuis Gémenos centre ?',
        answer: 'Souvent très court en journée.',
      },
      {
        question: 'Intervenez-vous vers le parc d\u2019activités ?',
        answer: 'Oui, l\u2019ensemble de la commune.',
      },
      {
        question: 'Évier + machine à laver sur même évacuation ?',
        answer: 'Nous testons les deux appareils après intervention.',
      },
    ],
    focusKeyword: 'debouchage évier gemenos',
    villeSlug: 'gemenos',
  },
  {
    slug: 'aix-en-provence',
    breadcrumbLabel: 'Évier Aix-en-Provence',
    metaTitle: 'Debouchage évier Aix-en-Provence (13100)',
    metaDescription:
      'Évier bouché à Aix-en-Provence ? Debouchage évier cuisine, siphon, urgence possible. Bouches-du-Rhône.',
    h1: 'Debouchage d\u2019évier à Aix-en-Provence',
    intro: `Aix-en-Provence mêle centre historique, quartiers résidentiels et vie étudiante active. Les cuisines très sollicitées génèrent des pics de bouchons d\u2019évier. ${BASE}`,
    sections: [
      {
        title: 'Centre ancien et extensions',
        body: `Les réseaux anciens du centre-ville demandent un diagnostic adapté ; les extensions modernes ont souvent des canalisations PVC standard.`,
      },
      {
        title: 'Accès',
        body: `Nous desservons l\u2019ensemble du territoire communal.`,
      },
    ],
    faqs: [
      {
        question: 'Délai plus long qu\u2019Aubagne ?',
        answer: 'Légèrement, selon la tournée ; appelez aux premiers symptômes.',
      },
      {
        question: 'Intervenez-vous au Jas de Bouffan ?',
        answer: 'Oui, tous les quartiers d\u2019Aix.',
      },
      {
        question: 'Devis par téléphone possible ?',
        answer: 'Oui, comme partout dans les Bouches-du-Rhône.',
      },
    ],
    focusKeyword: 'debouchage évier aix en provence',
    villeSlug: 'aix-en-provence',
  },
];

export function getGeoEvier13Page(slug: string): GeoEvier13PageDef | undefined {
  return GEO_EVIER_13_PAGES.find((p) => p.slug === slug);
}

export function getAllGeoEvier13Slugs(): string[] {
  return GEO_EVIER_13_PAGES.map((p) => p.slug);
}

export function getRelatedGeoEvier13Slugs(currentSlug: string, count = 6): string[] {
  const all = GEO_EVIER_13_PAGES.map((p) => p.slug);
  const idx = all.indexOf(currentSlug);
  if (idx === -1) return [];
  const out: string[] = [];
  for (let offset = 1; out.length < count && offset < all.length; offset++) {
    const j = (idx + offset) % all.length;
    if (all[j] !== currentSlug) out.push(all[j]);
  }
  return out;
}
