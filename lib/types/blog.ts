export interface Article {
  slug: string;
  titre: string;
  description: string;        // meta description (155 chars max)
  date: string;               // format "2026-03-01"
  auteur: string;
  categorieSlug: string;
  contenu: string;            // HTML rendu
  tempsLecture: number;       // minutes
  tags: string[];
}
