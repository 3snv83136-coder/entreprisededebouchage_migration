import type { PageQuestion } from '@/lib/types/questions';

const questions: PageQuestion[] = [
  // ─── GROUPE 1 — DÉFINITIONS ────────────────────────────────────────────────

  {
    slug: 'debouchage-definition',
    typeQuestion: 'definition',
    profondeur: 1,
    noindex: false,
    titre: 'Débouchage : définition, techniques et quand faire appel à un pro',
    metaDesc:
      'Débouchage : définition complète, techniques utilisées par les pros (hydrocurage, furet, caméra) et conseils pour savoir quand appeler un plombier dans les Bouches-du-Rhône.',
    h1: 'Débouchage — définition et guide complet',
    intro:
      'Le débouchage désigne l\'ensemble des opérations techniques visant à supprimer une obstruction dans un réseau de canalisations. Il peut s\'agir d\'une intervention manuelle, mécanique ou hydraulique selon la nature et la localisation du bouchon.',
    sections: [
      {
        heading: 'Définition technique',
        body: 'Le débouchage consiste à rétablir la circulation normale des effluents dans une canalisation obstruée. L\'obstruction peut être partielle (écoulement lent) ou totale (refoulement). Les causes sont multiples : accumulation de graisses, dépôts calcaires, corps étrangers, intrusions racinaires, affaissement de conduite.',
      },
      {
        heading: 'Les trois grandes techniques',
        body: '(1) Débouchage mécanique au furet — un câble hélicoïdal rotatif qui fracture ou extrait le bouchon. (2) Hydrocurage haute pression — un jet d\'eau à 150-200 bars qui décolle les dépôts. (3) Inspection caméra — permet de localiser et qualifier l\'obstruction avant intervention.',
      },
      {
        heading: 'Débouchage DIY vs professionnel',
        body: 'Les produits du commerce (Destop, vinaigre + bicarbonate) peuvent suffire pour les bouchons superficiels dans le siphon. Ils sont inefficaces sur les obstructions profondes, les racines ou les dépôts calcaires sévères. Dans les Bouches-du-Rhône (13), la dureté de l\'eau accélère l\'entartrage des conduites et rend les bouchons plus tenaces qu\'ailleurs.',
      },
      {
        heading: 'Quand appeler un pro',
        body: 'Refoulement simultané de plusieurs appareils, odeurs persistantes malgré le nettoyage, récidive fréquente, présence d\'eau sale remontant des évacuations.',
      },
    ],
    faq: [
      {
        q: 'Quelle est la différence entre débouchage et curage ?',
        r: 'Le débouchage traite une obstruction ponctuelle. Le curage est une opération de nettoyage préventif de l\'ensemble d\'un réseau, même sans bouchon déclaré.',
      },
      {
        q: 'Combien de temps dure un débouchage professionnel ?',
        r: 'Entre 30 minutes et 2 heures selon la complexité. Un débouchage WC simple prend 30 à 45 min. Un curage de réseau complet peut prendre 2 à 3 heures.',
      },
      {
        q: 'Le débouchage est-il pris en charge par l\'assurance ?',
        r: 'Oui, dans la plupart des contrats habitation, les dommages causés par un bouchon (dégât des eaux) sont couverts. L\'intervention elle-même peut être remboursée selon les garanties souscrites.',
      },
    ],
    servicesCta: ['/debouchage-canalisation/', '/debouchage-wc-toilettes/', '/debouchage-egouts-regards/'],
    villesCta: ['/debouchage-aubagne/', '/debouchage-marseille/'],
  },

  {
    slug: 'debouchage-definition-sens',
    typeQuestion: 'definition',
    profondeur: 1,
    noindex: false,
    titre: 'Déboucher : définition du mot et sens technique en plomberie',
    metaDesc:
      'Que signifie déboucher ? Définition du terme, sens courant et technique, synonymes, et ce que recouvre le mot dans le métier de l\'assainissement.',
    h1: 'Déboucher — définition et sens en assainissement',
    intro:
      '"Déboucher" signifie supprimer ce qui obstrue un passage. En plomberie et assainissement, il désigne spécifiquement le rétablissement de l\'écoulement dans une canalisation bouchée.',
    sections: [
      {
        heading: 'Sens courant',
        body: 'Déboucher, c\'est libérer un passage obstrué. On l\'emploie pour une bouteille (retirer le bouchon), pour une oreille (libérer la trompe d\'Eustache), mais surtout, dans le contexte professionnel, pour une canalisation.',
      },
      {
        heading: 'Sens technique assainissement',
        body: 'En plomberie, déboucher désigne l\'ensemble des opérations permettant de rétablir un débit normal dans une conduite d\'évacuation. Le professionnel qui réalise cette opération est un plombier-déboucheur ou un technicien en assainissement.',
      },
      {
        heading: 'Synonymes professionnels',
        body: 'Curer, désengorger, désobstruer, hydrocurer. Ces termes recouvrent des réalités légèrement différentes mais désignent tous des opérations de rétablissement du débit.',
      },
      {
        heading: 'Dans les Bouches-du-Rhône (13)',
        body: 'Le mot "débouchage" est très utilisé dans la région PACA en raison de la forte dureté de l\'eau qui génère des obstructions calcaires fréquentes dans les canalisations domestiques.',
      },
    ],
    faq: [
      {
        q: 'Quel est le synonyme de déboucher en plomberie ?',
        r: 'Désengorger, désobstruer, curer, hydrocurer. Tous désignent le rétablissement de l\'écoulement dans une conduite.',
      },
      {
        q: 'Qu\'est-ce qu\'un débouché professionnel (sens RH) ?',
        r: 'Dans le domaine professionnel (emploi), un "débouché" désigne une opportunité d\'emploi ou d\'insertion. Ce sens est distinct du débouchage en plomberie.',
      },
      {
        q: 'Qu\'est-ce que ça veut dire déboucher ?',
        r: 'Au sens plomberie : rétablir l\'écoulement d\'une canalisation obstruée. Au sens courant : libérer un passage bloqué.',
      },
    ],
    servicesCta: ['/debouchage-canalisation/', '/debouchage-wc-toilettes/'],
    villesCta: ['/debouchage-aubagne/'],
  },

  // ─── GROUPE 2 — PRIX ───────────────────────────────────────────────────────

  {
    slug: 'debouchage-canalisation-prix',
    typeQuestion: 'how_expensive',
    profondeur: 1,
    noindex: false,
    titre: 'Prix débouchage canalisation 2026 — Tarifs fixes dans les Bouches-du-Rhône',
    metaDesc:
      'Quel prix pour déboucher une canalisation ? Tarifs clairs et fixes dans les Bouches-du-Rhône (13) : débouchage manuel {PRIX_MANUEL}€, haute pression {PRIX_HAUTE_PRESSION}€, inspection caméra {PRIX_CAMERA}€. Devis gratuit.',
    h1: 'Prix débouchage canalisation — tarifs 2026 dans les Bouches-du-Rhône',
    intro:
      'Le prix d\'un débouchage de canalisation dans les Bouches-du-Rhône varie entre {PRIX_MANUEL}€ et {PRIX_HAUTE_PRESSION}€ selon la technique employée. Tous nos tarifs sont fixes, annoncés avant déplacement, déplacement inclus.',
    sections: [
      {
        heading: 'Tableau des tarifs',
        body: 'Débouchage manuel (furet) : {PRIX_MANUEL}€ — Hydrocurage haute pression : {PRIX_HAUTE_PRESSION}€ — Inspection caméra : {PRIX_CAMERA}€. Ces tarifs incluent le déplacement dans les Bouches-du-Rhône (13) et le diagnostic.',
      },
      {
        heading: 'Ce qui est inclus',
        body: 'Déplacement dans les Bouches-du-Rhône (13), diagnostic, intervention, rapport oral. Pas de frais cachés. Le devis est communiqué par téléphone avant toute venue.',
      },
      {
        heading: 'Facteurs qui influencent le prix',
        body: '(1) Profondeur de l\'obstruction — plus elle est loin, plus l\'intervention est longue. (2) Technique requise — un furet suffit pour les bouchons organiques superficiels, l\'hydrocurage est nécessaire pour le tartre et les graisses solidifiées. (3) Accessibilité — un réseau en cave ou sous dalle nécessite parfois du matériel supplémentaire.',
      },
      {
        heading: 'Prise en charge assurance',
        body: 'Si le bouchon a causé un dégât des eaux, votre assurance habitation peut couvrir tout ou partie de l\'intervention. Nous délivrons un rapport d\'intervention pour votre dossier assurance.',
      },
    ],
    faq: [
      {
        q: 'Quel prix pour déboucher une canalisation ?',
        r: 'Dans les Bouches-du-Rhône, comptez entre {PRIX_MANUEL}€ et {PRIX_HAUTE_PRESSION}€ selon la technique. Prix fixe annoncé avant déplacement, déplacement inclus.',
      },
      {
        q: 'Quel est le prix pour déboucher canalisation avec camion haute pression ?',
        r: 'L\'hydrocurage haute pression est facturé {PRIX_HAUTE_PRESSION}€ dans les Bouches-du-Rhône. Ce tarif inclut le déplacement du camion et l\'intervention.',
      },
      {
        q: 'Le débouchage canalisation est-il remboursé par l\'assurance ?',
        r: 'Oui, si le bouchon a causé un sinistre (dégât des eaux), votre assurance habitation prend généralement en charge l\'intervention. Demandez votre rapport d\'intervention.',
      },
      {
        q: 'Y a-t-il une différence de prix le week-end ?',
        r: 'Non, nos tarifs sont identiques 7j/7 et 24h/24. Aucune majoration de nuit ou weekend.',
      },
    ],
    servicesCta: ['/debouchage-canalisation/', '/debouchage-egouts-regards/'],
    villesCta: ['/debouchage-aubagne/', '/debouchage-marseille/', '/debouchage-marignane/'],
  },

  {
    slug: 'quel-prix-deboucher-canalisation',
    typeQuestion: 'how_expensive',
    profondeur: 1,
    noindex: false,
    titre: 'Quel prix pour déboucher une canalisation ? Tarifs Bouches-du-Rhône 2026',
    metaDesc:
      'Combien coûte un débouchage de canalisation ? Tarifs détaillés 2026 dans les Bouches-du-Rhône (13). Furet, haute pression, caméra. Prix fixe avant déplacement.',
    h1: 'Quel prix pour déboucher une canalisation ?',
    intro:
      'Déboucher une canalisation coûte entre {PRIX_MANUEL}€ et {PRIX_HAUTE_PRESSION}€ dans les Bouches-du-Rhône (13) selon la méthode utilisée. Ce tarif est fixe et communiqué avant l\'intervention, déplacement inclus.',
    sections: [
      {
        heading: 'Réponse directe',
        body: 'Pour un bouchon simple (WC, évier, douche), comptez {PRIX_MANUEL}€ avec notre furet motorisé. Pour une canalisation avec dépôt calcaire ou graisse profonde, l\'hydrocurage haute pression est à {PRIX_HAUTE_PRESSION}€. Le diagnostic caméra, utile avant une intervention lourde, est à {PRIX_CAMERA}€.',
      },
      {
        heading: 'Pourquoi les prix varient',
        body: 'La distance de l\'obstruction dans la conduite, le type de matériau (PVC, fonte, grès), l\'accessibilité (regards enterrés, sous dalle), et la gravité de l\'obstruction sont les quatre facteurs qui déterminent la méthode et donc le tarif.',
      },
      {
        heading: 'Comment éviter les arnaques',
        body: 'Un professionnel sérieux annonce toujours le prix avant de se déplacer. Fuyez les devis "à évaluer sur place" qui conduisent souvent à des factures multipliées par 5.',
      },
    ],
    faq: [
      {
        q: 'Quel est le prix pour déboucher une canalisation ?',
        r: 'Entre {PRIX_MANUEL}€ (furet, bouchon simple) et {PRIX_HAUTE_PRESSION}€ (hydrocurage haute pression) dans les Bouches-du-Rhône. Prix fixe avant déplacement.',
      },
      {
        q: 'Qui doit payer le débouchage des canalisations ?',
        r: 'En location, c\'est généralement le locataire si le bouchon est dû à un usage non conforme (lingettes, etc.). Si la canalisation est vétuste, le propriétaire est responsable.',
      },
    ],
    servicesCta: ['/debouchage-canalisation/'],
    villesCta: ['/debouchage-aubagne/', '/debouchage-marseille/'],
  },

  // ─── GROUPE 3 — HOW ────────────────────────────────────────────────────────

  {
    slug: 'comment-deboucher-canalisation-tres-bouchee',
    typeQuestion: 'how',
    profondeur: 1,
    noindex: false,
    titre: 'Comment déboucher une canalisation très bouchée ? Guide pro 2026',
    metaDesc:
      'Canalisation complètement bouchée ? Méthodes DIY et pro pour déboucher efficacement : furet, haute pression, bicarbonate. Quand appeler un professionnel dans les Bouches-du-Rhône.',
    h1: 'Comment déboucher une canalisation très bouchée',
    intro:
      'Une canalisation complètement bouchée nécessite une approche progressive : d\'abord les méthodes manuelles, puis si elles échouent, l\'hydrocurage haute pression par un professionnel. Dans les Bouches-du-Rhône (13), le calcaire aggrave souvent les bouchons classiques.',
    sections: [
      {
        heading: 'Étape 1 — Identifier la nature du bouchon',
        body: 'Bouchon organique (cheveux, nourriture) → sensible aux méthodes chimiques et mécaniques légères. Bouchon graisseux → sensible à l\'eau chaude + dégraissant. Bouchon calcaire → nécessite un détartrant ou l\'hydrocurage. Corps étranger → extraction mécanique obligatoire.',
      },
      {
        heading: 'Étape 2 — Méthodes DIY à essayer',
        body: '(1) Eau bouillante + liquide vaisselle (pour les graisses). (2) Bicarbonate + vinaigre blanc (réaction chimique légère). (3) Ventouse à membrane (pour les WC et éviers). (4) Furet manuel de 3 mètres.',
      },
      {
        heading: 'Étape 3 — Quand appeler un pro',
        body: 'Si les méthodes DIY échouent après 2 tentatives, si plusieurs appareils sont touchés simultanément, si l\'eau remonte au lieu de descendre, si les odeurs sont persistantes après intervention.',
      },
      {
        heading: 'Ce que fait le professionnel',
        body: 'Inspection caméra pour localiser le bouchon, furet motorisé ou hydrocurage haute pression selon la nature de l\'obstruction, test de débit, rapport.',
      },
      {
        heading: 'Spécificité Bouches-du-Rhône (13)',
        body: 'L\'eau des Bouches-du-Rhône a un titre hydrotimétrique (TH) de 25 à 35°f selon les secteurs. Ce calcaire se dépose à l\'intérieur des canalisations et transforme des bouchons organiques simples en obstructions dures et tenaces.',
      },
    ],
    faq: [
      {
        q: 'Comment déboucher une canalisation complètement bouchée ?',
        r: 'Progressivement : ventouse, puis furet manuel, puis produit déboucheur. Si ça ne suffit pas, appelez un pro pour un hydrocurage haute pression.',
      },
      {
        q: 'Comment enlever un gros bouchon dans une canalisation ?',
        r: 'Un furet motorisé professionnel peut atteindre et fragmenter les gros bouchons jusqu\'à 30 mètres de profondeur. Pour les bouchons calcaires durs, l\'hydrocurage est plus efficace.',
      },
      {
        q: 'Comment trouver un bouchon dans une canalisation ?',
        r: 'En ouvrant successivement chaque siphon et regard depuis le point d\'appel jusqu\'au collecteur. Un professionnel utilise une caméra d\'inspection pour localiser précisément l\'obstruction.',
      },
      {
        q: 'Comment déboucher une canalisation d\'eaux usées ?',
        r: 'Depuis le regard le plus proche, avec un furet ou un hydrocureur. Les eaux usées nécessitent des protections (gants, lunettes) et un matériel adapté.',
      },
      {
        q: 'Comment déboucher une canalisation coudée ?',
        r: 'Un furet souple passe les coudes jusqu\'à 90°. L\'hydrocurage avec flexible souple est aussi efficace sur les réseaux avec de nombreux changements de direction.',
      },
    ],
    servicesCta: ['/debouchage-canalisation/', '/debouchage-egouts-regards/'],
    villesCta: ['/debouchage-aubagne/', '/debouchage-marseille/', '/debouchage-marignane/'],
  },

  {
    slug: 'comment-deboucher-canalisations-maison',
    typeQuestion: 'how',
    profondeur: 1,
    noindex: false,
    titre: 'Comment déboucher les canalisations d\'une maison — Guide complet',
    metaDesc:
      'Canalisations bouchées dans votre maison ? Guide complet : identifier le bouchon, méthodes DIY, outils pros, et quand appeler un plombier-déboucheur dans les Bouches-du-Rhône.',
    h1: 'Comment déboucher les canalisations d\'une maison',
    intro:
      'Déboucher les canalisations d\'une maison demande d\'abord d\'identifier si le bouchon est localisé (un seul appareil) ou global (tous les appareils touchés). La réponse détermine la méthode.',
    sections: [
      {
        heading: 'Bouchon localisé vs collecteur bouché',
        body: 'Si un seul appareil est affecté (WC ou évier), le bouchon est local. Si plusieurs appareils refluent simultanément, le collecteur principal est obstrué — intervention pro obligatoire.',
      },
      {
        heading: 'Outils à avoir chez soi',
        body: 'Ventouse à cloche (WC), ventouse à membrane (évier), furet manuel 3 m, produit déboucheur sans acide.',
      },
      {
        heading: 'Méthode par appareil',
        body: 'Évier → siphon démontable et nettoyable. WC → ventouse puis furet. Douche → bonde à dévisser et furet court. Lave-linge → filtre de vidange à nettoyer en premier.',
      },
      {
        heading: 'Le calcaire dans les Bouches-du-Rhône',
        body: 'Les propriétaires du Bouches-du-Rhône (13) font face à un problème spécifique : le tartre calcaire durcit les bouchons organiques et encrasse les siphons plus vite qu\'ailleurs. Un entretien préventif annuel est recommandé.',
      },
    ],
    faq: [
      {
        q: 'Comment déboucher une canalisation maison ?',
        r: 'Commencez par le siphon le plus proche du bouchon. Nettoyez-le, puis testez l\'écoulement. Si le problème persiste, remontez vers le collecteur principal.',
      },
      {
        q: 'Comment désengorger une canalisation ?',
        r: 'Eau chaude + dégraissant pour les graisses. Bicarbonate + vinaigre pour les dépôts légers. Furet pour les bouchons mécaniques.',
      },
      {
        q: 'Comment déboucher un tuyau de canalisation ?',
        r: 'Selon le diamètre et la nature du bouchon : furet pour les petits diamètres (40-50 mm), hydrocurage pour les gros diamètres (100 mm et plus).',
      },
    ],
    servicesCta: ['/debouchage-canalisation/', '/debouchage-evier-lavabo/', '/debouchage-wc-toilettes/'],
    villesCta: ['/debouchage-aubagne/', '/debouchage-marseille/'],
  },

  {
    slug: 'comment-deboucher-regard-exterieur',
    typeQuestion: 'how',
    profondeur: 1,
    noindex: false,
    titre: 'Comment déboucher un regard extérieur — Guide et conseils',
    metaDesc:
      'Regard extérieur bouché ou débordant ? Guide complet pour déboucher un regard d\'eaux usées ou pluviales, méthodes DIY et professionnel dans les Bouches-du-Rhône.',
    h1: 'Comment déboucher un regard extérieur',
    intro:
      'Un regard extérieur bouché peut provoquer des inondations dans le jardin ou la cour. La méthode de débouchage dépend de la nature du bouchon (organique, calcaire, racines) et du type de réseau (EU ou EP).',
    sections: [
      {
        heading: 'Étape 1 — Ouvrir et inspecter',
        body: 'Soulevez le couvercle du regard avec un outil adapté (crochet ou pied de biche). Inspectez visuellement : débris visibles en surface = bouchon accessible. Niveau haut = bouchon en aval du regard.',
      },
      {
        heading: 'Étape 2 — Nettoyage manuel',
        body: 'Gants résistants obligatoires. Retirez les débris en surface à la main ou avec un racloir. Si le regard est plein et que le niveau ne baisse pas, le bouchon est dans la conduite aval.',
      },
      {
        heading: 'Étape 3 — Furet depuis le regard',
        body: 'Introduisez un furet souple dans la conduite sortant du regard. Poussez et tournez jusqu\'à sentir la résistance du bouchon. Fracturez-le et retirez les débris.',
      },
      {
        heading: 'Étape 4 — Hydrocurage pro',
        body: 'Si le furet n\'atteint pas le bouchon ou si les racines sont en cause, appelez un professionnel avec hydrocureur. Le réseau extérieur des maisons des Bouches-du-Rhône est particulièrement exposé aux intrusions racinaires (pins, figuiers, oliviers).',
      },
    ],
    faq: [
      {
        q: 'Comment déboucher un regard extérieur ?',
        r: 'Nettoyage manuel des débris de surface, puis furet dans la conduite aval, puis hydrocurage pro si nécessaire.',
      },
      {
        q: 'Qui doit entretenir les regards extérieurs ?',
        r: 'Le propriétaire de la maison est responsable des regards sur sa propriété privée. Les regards sur voie publique relèvent de la commune.',
      },
      {
        q: 'Que faire si le regard déborde après la pluie ?',
        r: 'Le réseau pluvial est saturé ou bouché en aval. Appelez un professionnel pour un hydrocurage du réseau EP depuis le regard jusqu\'au collecteur public.',
      },
    ],
    servicesCta: ['/debouchage-egouts-regards/'],
    villesCta: ['/debouchage-aubagne/', '/debouchage-marignane/'],
  },

  {
    slug: 'comment-enlever-bouchon-graisse-canalisation',
    typeQuestion: 'how',
    profondeur: 1,
    noindex: false,
    titre: 'Comment enlever un bouchon de graisse dans une canalisation',
    metaDesc:
      'Bouchon de graisse dans une canalisation ? Méthodes efficaces : eau chaude, dégraissant, hydrocurage. Guide complet pour particuliers et restaurants.',
    h1: 'Comment enlever un bouchon de graisse dans une canalisation',
    intro:
      'Les bouchons de graisse sont les plus fréquents dans les cuisines. La graisse animale et végétale se solidifie à basse température et tapisse les parois des canalisations jusqu\'à les obstruer complètement.',
    sections: [
      {
        heading: 'Méthode 1 — Eau très chaude',
        body: 'Versez 2 litres d\'eau bouillante dans la canalisation. La chaleur fluidifie la graisse. Attendez 5 min et testez l\'écoulement. Efficace pour les bouchons frais.',
      },
      {
        heading: 'Méthode 2 — Dégraissant + eau chaude',
        body: 'Ajoutez 3 cuillères à soupe de liquide vaisselle concentré avant l\'eau bouillante. Le tensioactif émulsifie la graisse. Laissez agir 15 min.',
      },
      {
        heading: 'Méthode 3 — Bicarbonate + vinaigre + eau chaude',
        body: '3 cuillères de bicarbonate, puis 200 ml de vinaigre blanc, puis 1 litre d\'eau bouillante. La réaction chimique aide à décoller la graisse.',
      },
      {
        heading: 'Méthode 4 — Hydrocurage à l\'eau chaude',
        body: 'Pour les bouchons de graisse anciens et solidifiés, seul l\'hydrocurage à 60-80°C est efficace. C\'est la méthode que nous utilisons pour les restaurants et les collectivités dans les Bouches-du-Rhône.',
      },
      {
        heading: 'Prévention',
        body: 'Ne versez jamais de graisse liquide chaude dans l\'évier — elle se solidifie en refroidissant. Utilisez un bac à graisses pour les cuisines professionnelles.',
      },
    ],
    faq: [
      {
        q: 'Comment déboucher un évier plein de graisse ?',
        r: 'Eau bouillante + liquide vaisselle en premier. Si insuffisant, furet puis hydrocurage pro. Ne jamais utiliser de soude caustique pure qui peut endommager les canalisations en PVC.',
      },
      {
        q: 'Comment déboucher une canalisation avec de l\'acide chlorhydrique ?',
        r: 'L\'acide chlorhydrique est efficace sur le calcaire mais dangereux pour vous et corrosif pour certains matériaux. Son usage est réservé aux professionnels équipés. Ne l\'utilisez jamais dans une canalisation sans avis pro.',
      },
    ],
    servicesCta: ['/debouchage-cuisine/', '/debouchage-evier-lavabo/'],
    villesCta: ['/debouchage-aubagne/', '/debouchage-marseille/'],
  },

  {
    slug: 'fabriquer-produit-deboucher-canalisation',
    typeQuestion: 'how',
    profondeur: 1,
    noindex: false,
    titre: 'Fabriquer un produit déboucheur maison — Recettes efficaces',
    metaDesc:
      'Comment faire un produit déboucheur maison ? Recettes au bicarbonate, vinaigre, sel, soude. Efficacité réelle vs limites et quand appeler un pro.',
    h1: 'Fabriquer un produit pour déboucher une canalisation',
    intro:
      'Les produits déboucheurs maison à base de bicarbonate, vinaigre et sel fonctionnent pour les bouchons superficiels. Ils sont sans danger pour les canalisations et l\'environnement, mais ont des limites sur les obstructions profondes.',
    sections: [
      {
        heading: 'Recette 1 — Bicarbonate + vinaigre',
        body: '100g de bicarbonate de soude dans la canalisation, puis 200ml de vinaigre blanc. Réaction effervescente pendant 15 min. Rincer avec 1L d\'eau chaude. Efficace sur les dépôts organiques légers.',
      },
      {
        heading: 'Recette 2 — Sel + bicarbonate',
        body: 'Mélange à sec de 100g de sel + 100g de bicarbonate versé dans le siphon, suivi d\'eau bouillante. Le sel agit comme abrasif léger.',
      },
      {
        heading: 'Recette 3 — Soude cristaux + eau bouillante',
        body: '3 cuillères de soude cristaux (carbonate de sodium, différent de la soude caustique), puis eau bouillante. Dégraissant puissant, sans danger pour les canalisations en PVC.',
      },
      {
        heading: 'Limites des recettes maison',
        body: 'Inefficaces sur les bouchons calcaires durs, les corps étrangers, les racines, et les obstructions à plus de 1 mètre de profondeur.',
      },
    ],
    faq: [
      {
        q: 'Quel bicarbonate pour déboucher une canalisation ?',
        r: 'Le bicarbonate de soude (NaHCO₃), vendu en supermarché. Différent du bicarbonate alimentaire par sa granulométrie, mais les deux fonctionnent.',
      },
      {
        q: 'Comment nettoyer une canalisation avec bicarbonate et vinaigre ?',
        r: 'Versez le bicarbonate en premier, puis le vinaigre (réaction inverse non efficace). Laissez agir 15-20 min, rincez abondamment à l\'eau chaude.',
      },
      {
        q: 'Le vinaigre blanc débouche-t-il vraiment ?',
        r: 'Oui, mais uniquement en combinaison avec le bicarbonate et uniquement pour les bouchons légers et superficiels. Pour les bouchons profonds, son efficacité est nulle.',
      },
    ],
    servicesCta: ['/debouchage-canalisation/', '/debouchage-evier-lavabo/'],
    villesCta: ['/debouchage-aubagne/'],
  },

  {
    slug: 'comment-se-passe-debouchage-canalisation',
    typeQuestion: 'how',
    profondeur: 1,
    noindex: false,
    titre: 'Comment se passe un débouchage de canalisation ? Étapes détaillées',
    metaDesc:
      'Que se passe-t-il lors d\'un débouchage professionnel ? De l\'appel à l\'intervention : diagnostic, technique, résultat. Guide étape par étape.',
    h1: 'Comment se passe un débouchage de canalisation',
    intro:
      'Un débouchage professionnel se déroule en 4 étapes : prise d\'appel et diagnostic téléphonique, arrivée du technicien, intervention, validation du résultat. Durée totale : 30 min à 2h.',
    sections: [
      {
        heading: 'Étape 1 — L\'appel',
        body: 'Vous décrivez le problème au téléphone. Le technicien identifie la nature probable du bouchon et vous communique le tarif avant déplacement. Délai d\'arrivée confirmé.',
      },
      {
        heading: 'Étape 2 — Le diagnostic sur place',
        body: 'Le technicien inspecte les appareils touchés, teste l\'écoulement, identifie le point d\'obstruction. Il peut utiliser une caméra si le bouchon est introuvable visuellement.',
      },
      {
        heading: 'Étape 3 — L\'intervention',
        body: 'Selon le diagnostic : furet motorisé, hydrocurage haute pression, ou curage manuel. Le technicien protège la zone (bâches, gants) et intervient sans endommager les installations.',
      },
      {
        heading: 'Étape 4 — La validation',
        body: 'Test de l\'écoulement à débit normal, vérification qu\'il n\'y a pas de fuite post-intervention, rapport oral. Sur demande, un rapport écrit est établi (utile pour l\'assurance).',
      },
    ],
    faq: [
      {
        q: 'Comment se passe un curage de canalisation ?',
        r: 'Diagnostic → introduction du furet ou du flexible haute pression → curage → test de débit → rapport. Durée : 45 min à 2h.',
      },
      {
        q: 'Faut-il être présent lors du débouchage ?',
        r: 'Oui, pour accéder à la propriété et valider le résultat. Sauf exception (clés chez un voisin ou gardien avec accord préalable).',
      },
      {
        q: 'Reçoit-on un document après le débouchage ?',
        r: 'Un rapport d\'intervention oral est toujours fourni. Un document écrit peut être établi sur demande, notamment pour les dossiers assurance ou les copropriétés.',
      },
    ],
    servicesCta: ['/debouchage-canalisation/'],
    villesCta: ['/debouchage-aubagne/', '/debouchage-marseille/', '/debouchage-marignane/'],
  },

  // ─── GROUPE 4 — QUI ────────────────────────────────────────────────────────

  {
    slug: 'qui-appeler-deboucher-canalisation',
    typeQuestion: 'who',
    profondeur: 1,
    noindex: false,
    titre: 'Qui appeler pour déboucher une canalisation ? Guide et tarifs',
    metaDesc:
      'Qui appeler pour déboucher une canalisation dans les Bouches-du-Rhône ? Plombier, déboucheur, artisan assainissement — différences et numéros d\'urgence.',
    h1: 'Qui appeler pour déboucher une canalisation ?',
    intro:
      'Pour déboucher une canalisation dans les Bouches-du-Rhône, appelez un technicien en assainissement ou un plombier-déboucheur. Évitez les plateformes intermédiaires qui facturent des frais de mise en relation au-dessus du prix réel.',
    sections: [
      {
        heading: 'Qui peut déboucher les canalisations ?',
        body: 'Un plombier, un technicien en assainissement, ou une entreprise spécialisée en débouchage. Pour les réseaux extérieurs, un prestataire avec camion hydrocureur.',
      },
      {
        heading: 'Plombier vs déboucheur',
        body: 'Un plombier fait tout (tuyaux, robinetterie, sanitaires). Un déboucheur se spécialise dans les obstructions — il est souvent plus rapide et moins cher pour cette prestation spécifique.',
      },
      {
        heading: 'Ce qu\'il faut éviter',
        body: 'Les plateformes type urgence-plombier qui redirigent vers un sous-traitant avec des frais de service non affichés. Appelez directement l\'entreprise locale.',
      },
      {
        heading: 'Dans les Bouches-du-Rhône (13)',
        body: 'Notre équipe intervient sur les 119 communes des Bouches-du-Rhône. Délai d\'arrivée moyen : moins d\'une heure.',
      },
    ],
    faq: [
      {
        q: 'Qui appeler pour déboucher des canalisations ?',
        r: 'Un technicien en assainissement ou un plombier-déboucheur. Appelez directement une entreprise locale pour éviter les frais de plateforme.',
      },
      {
        q: 'Qui peut déboucher les canalisations ?',
        r: 'Tout professionnel du bâtiment habilité. Pour les réseaux extérieurs et enterrés, un prestataire avec camion hydrocureur est indispensable.',
      },
      {
        q: 'Qui doit payer le débouchage des canalisations en location ?',
        r: 'En général, le locataire pour les bouchons liés à l\'usage (lingettes, graisses). Le propriétaire pour les canalisations vétustes ou les défauts d\'installation.',
      },
    ],
    servicesCta: ['/debouchage-canalisation/'],
    villesCta: ['/debouchage-aubagne/', '/debouchage-marseille/', '/debouchage-marignane/', '/debouchage-aix-en-provence/'],
  },

  {
    slug: 'qui-doit-payer-debouchage-canalisations',
    typeQuestion: 'who',
    profondeur: 1,
    noindex: false,
    titre: 'Qui doit payer le débouchage des canalisations — Locataire ou propriétaire ?',
    metaDesc:
      'Qui paye le débouchage des canalisations en location ? Règles juridiques, cas où c\'est le propriétaire, et quand l\'assurance intervient.',
    h1: 'Qui doit payer le débouchage des canalisations ?',
    intro:
      'En location, la répartition des frais de débouchage dépend de la cause du bouchon. Usage non conforme (lingettes, graisses excessives) → locataire. Vétusté ou défaut d\'installation → propriétaire.',
    sections: [
      {
        heading: 'Règle générale (décret de 1987)',
        body: 'Le décret n°87-712 liste les réparations à la charge du locataire, dont le "maintien en état de propreté" des appareils. Les bouchons courants relèvent du locataire.',
      },
      {
        heading: 'Cas où le propriétaire paye',
        body: 'Canalisation vétuste (fonte fissuré, joint défaillant), installation non conforme, problème structurel du réseau collectif de l\'immeuble.',
      },
      {
        heading: 'Cas litigieux',
        body: 'Corps étranger d\'enfant (locataire), intrusion racinaire d\'un arbre du jardin (propriétaire si l\'arbre est vieux). En cas de litige, le rapport du technicien est la pièce clé.',
      },
      {
        heading: 'Le rôle de l\'assurance',
        body: 'Si le bouchon cause un dégât des eaux, l\'assurance habitation peut intervenir — qu\'on soit locataire ou propriétaire. Un rapport d\'intervention écrit est nécessaire.',
      },
    ],
    faq: [
      {
        q: 'Qui doit payer le débouchage des canalisations en location ?',
        r: 'Généralement le locataire pour les bouchons d\'usage courant. Le propriétaire pour les problèmes liés à la vétusté ou à l\'installation.',
      },
      {
        q: 'Qui doit payer le débouchage WC en appartement ?',
        r: 'Le locataire, sauf si le WC était défectueux à l\'entrée dans les lieux (prouvé par l\'état des lieux d\'entrée).',
      },
      {
        q: 'L\'assurance couvre-t-elle le débouchage ?',
        r: 'L\'intervention de débouchage elle-même est rarement couverte. En revanche, les dommages causés par le bouchon (dégât des eaux) sont souvent pris en charge.',
      },
    ],
    servicesCta: ['/debouchage-canalisation/', '/debouchage-wc-toilettes/'],
    villesCta: ['/debouchage-aubagne/'],
  },

  // ─── GROUPE 5 — WHAT ───────────────────────────────────────────────────────

  {
    slug: 'quel-deboucheur-le-plus-efficace',
    typeQuestion: 'what',
    profondeur: 1,
    noindex: false,
    titre: 'Quel déboucheur est le plus efficace ? Comparatif 2026',
    metaDesc:
      'Furet, Destop, bicarbonate, haute pression : quel déboucheur est le plus efficace ? Comparatif honnête selon le type de bouchon.',
    h1: 'Quel est le déboucheur le plus efficace ?',
    intro:
      'Il n\'existe pas un seul déboucheur universel. L\'efficacité dépend du type de bouchon : organique, graisseux, calcaire, corps étranger, racinaire. Voici le comparatif honnête.',
    sections: [
      {
        heading: 'Comparatif des méthodes',
        body: 'Ventouse → bouchons superficiels dans le coude → rapide, sans danger. Furet manuel → bouchons mécaniques jusqu\'à 2m → efficace sur matières solides. Furet électrique pro → jusqu\'à 30m, corps étrangers → très efficace. Produit chimique (Destop) → matières organiques légères → limité sur calcaire et corps étrangers. Bicarbonate + vinaigre → entretien préventif uniquement → insuffisant pour bouchon déclaré. Hydrocurage haute pression → tout type, jusqu\'à 60m → le plus efficace toutes catégories.',
      },
      {
        heading: 'Le verdict',
        body: 'L\'hydrocurage haute pression est objectivement le déboucheur le plus efficace. Il traite tous les types de bouchons, tous les matériaux, toutes les profondeurs.',
      },
      {
        heading: 'Quel Destop le plus efficace ?',
        body: 'Destop Power Gel est le plus concentré de la gamme. Mais son efficacité reste limitée aux matières organiques fraîches. Sur calcaire et corps étrangers, il est sans effet.',
      },
    ],
    faq: [
      {
        q: 'Quel est le meilleur produit de débouchage de canalisation ?',
        r: 'Pour un particulier : la ventouse + furet manuel couvrent 70% des cas. Pour les 30% restants, appelez un pro avec hydrocureur.',
      },
      {
        q: 'Quel est le meilleur produit pour déboucher une canalisation ?',
        r: 'L\'eau bouillante + liquide vaisselle pour les graisses. Le furet pour les corps étrangers. L\'hydrocurage professionnel pour tout le reste.',
      },
      {
        q: 'Quel est le meilleur déboucheur WC ?',
        r: 'La ventouse à cloche (WC plunger) pour les bouchons dans le coude. Le furet WC pour les obstructions dans le tuyau. Le pro pour tout le reste.',
      },
      {
        q: 'Quel est le meilleur moyen pour déboucher une canalisation ?',
        r: 'Progressif : ventouse → furet → hydrocurage. Ne pas brûler les étapes pour économiser.',
      },
    ],
    servicesCta: ['/debouchage-canalisation/', '/debouchage-wc-toilettes/'],
    villesCta: ['/debouchage-aubagne/'],
  },

  {
    slug: 'meilleur-produit-debouchage-canalisation',
    typeQuestion: 'what',
    profondeur: 1,
    noindex: false,
    titre: 'Meilleur produit de débouchage canalisation — Comparatif 2026',
    metaDesc:
      'Quel produit choisir pour déboucher une canalisation ? Comparatif Destop, acide, bicarbonate, enzymatique. Efficacité réelle, risques et alternatives pro.',
    h1: 'Meilleur produit de débouchage de canalisation — comparatif',
    intro:
      'Le meilleur produit pour déboucher une canalisation dépend du type de bouchon. Aucun produit chimique du commerce ne remplace l\'hydrocurage pour les obstructions sévères.',
    sections: [
      {
        heading: 'Produits du commerce',
        body: 'Destop (soude caustique) efficace sur matières organiques fraîches. Mr Musclé Gel Déboucheur, similaire. Tous inefficaces sur calcaire pur et corps étrangers.',
      },
      {
        heading: 'Acide chlorhydrique',
        body: 'Très efficace sur le calcaire mais dangereux (émanations toxiques, corrosif pour la peau et les canalisations en métal). Usage pro uniquement.',
      },
      {
        heading: 'Enzymatiques',
        body: 'Bio-déboucheurs à base d\'enzymes et bactéries. Efficaces en entretien préventif, pas en curatif d\'urgence. Sûrs pour les fosses septiques.',
      },
      {
        heading: 'Bicarbonate + vinaigre',
        body: 'Entretien préventif uniquement. Réaction trop faible pour un bouchon déclaré.',
      },
      {
        heading: 'Le produit le plus efficace sans risque',
        body: 'L\'eau bouillante + liquide vaisselle concentré reste le meilleur rapport efficacité/sécurité pour les particuliers sur les bouchons graisseux.',
      },
    ],
    faq: [
      {
        q: 'Quel est le produit le plus efficace pour déboucher les canalisations ?',
        r: 'L\'hydrocurage haute pression est la méthode la plus efficace. Parmi les produits chimiques, Destop Power Gel pour les matières organiques, acide citrique pour le calcaire.',
      },
      {
        q: 'Le vinaigre blanc débouche-t-il les canalisations ?',
        r: 'Partiellement, en association avec le bicarbonate, pour les dépôts légers. Insuffisant seul sur un bouchon avéré.',
      },
      {
        q: 'Quel bicarbonate pour déboucher une canalisation ?',
        r: 'Bicarbonate de soude (NaHCO₃). Doses : 100g par canalisation, suivi de vinaigre blanc et d\'eau chaude.',
      },
    ],
    servicesCta: ['/debouchage-canalisation/'],
    villesCta: ['/debouchage-aubagne/', '/debouchage-marseille/'],
  },
];

export function getAllQuestions(): PageQuestion[] {
  return questions;
}

export function getQuestionBySlug(slug: string): PageQuestion | undefined {
  return questions.find((q) => q.slug === slug);
}

export function getIndexedQuestions(): PageQuestion[] {
  return questions.filter((q) => !q.noindex);
}
