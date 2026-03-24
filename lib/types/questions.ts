export interface ContentSection {
  heading: string;
  body: string;
}

export interface FaqQR {
  q: string;
  r: string;
}

export interface PageQuestion {
  slug: string;
  typeQuestion: 'how' | 'what' | 'who' | 'how_expensive' | 'definition' | 'yesno';
  profondeur: 1 | 2;
  noindex: boolean;
  titre: string;
  metaDesc: string;
  h1: string;
  intro: string;
  sections: ContentSection[];
  faq: FaqQR[];
  servicesCta: string[];
  villesCta: string[];
}
