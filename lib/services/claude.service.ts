import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface AmeliorerTexteParams {
  type: string;
  ville: string;
  code_postal?: string;
  contexte?: string;
  diagnostic?: string;
  intervention: string;
  resultat: string;
  materiels?: string;
  duree?: string;
}

interface AmeliorerTexteResult {
  contexte_enrichi: string;
  diagnostic_enrichi: string;
  intervention_enrichie: string;
  resultat_enrichi: string;
  titre_seo: string;
  meta_description: string;
}

export async function ameliorerTexte(params: AmeliorerTexteParams): Promise<AmeliorerTexteResult> {
  const fallback: AmeliorerTexteResult = {
    contexte_enrichi: params.contexte || '',
    diagnostic_enrichi: params.diagnostic || '',
    intervention_enrichie: params.intervention,
    resultat_enrichi: params.resultat,
    titre_seo: `${params.type} à ${params.ville}`,
    meta_description: params.resultat.slice(0, 155),
  };

  if (!process.env.ANTHROPIC_API_KEY) return fallback;

  const { type, ville, code_postal, contexte, diagnostic, intervention, resultat, materiels, duree } = params;

  const prompt = `Tu es rédacteur SEO expert pour un plombier-déboucheur professionnel installé dans le Var (83), France.
Tu dois DÉVELOPPER et ENRICHIR chaque section d'un compte-rendu d'intervention rédigé brièvement par le technicien.

MISSION : transformer des notes courtes en textes riches, détaillés, professionnels et optimisés SEO.

RÈGLES IMPÉRATIVES :
- Chaque section doit faire 3 à 5 phrases minimum (jamais moins)
- Développe le contexte technique : pourquoi ça arrive, comment ça évolue, quels risques si non traité
- Ajoute des détails concrets : matériaux, durée probable, zone de travail, pression utilisée, distance de canalisation
- Utilise le vocabulaire métier : hydrocurage, furet hélicoïdal, inspection endoscopique, tartre calcaire, siphon, regards, collecteur, etc.
- Intègre naturellement la ville ${ville}${code_postal ? ` (${code_postal})` : ''} dans au moins une section
- Ton professionnel mais humain, pas robotique
- NE PAS inventer de faits qui contredisent les notes du technicien

Données brutes du technicien :
- Type d'intervention : ${type}
- Ville : ${ville}${code_postal ? ` — Code postal : ${code_postal}` : ''}
${duree ? `- Durée totale : ${duree}` : ''}
${materiels ? `- Matériels utilisés : ${materiels}` : ''}
${contexte ? `- Situation (notes brutes) : "${contexte}"` : '- Situation : non renseignée'}
${diagnostic ? `- Diagnostic (notes brutes) : "${diagnostic}"` : '- Diagnostic : non renseigné'}
- Intervention (notes brutes) : "${intervention}"
- Résultat (notes brutes) : "${resultat}"

Réponds UNIQUEMENT en JSON strict (pas de commentaire, pas de markdown) :
{
  "contexte_enrichi": "3 à 5 phrases développant la situation initiale, le contexte du client, et les risques de ne pas intervenir rapidement...",
  "diagnostic_enrichi": "3 à 5 phrases sur ce que le technicien a trouvé, comment il l'a identifié, la cause probable, la localisation précise du problème...",
  "intervention_enrichie": "3 à 5 phrases décrivant précisément les techniques et matériels utilisés, les étapes, les difficultés rencontrées...",
  "resultat_enrichi": "3 à 5 phrases sur le résultat final, les vérifications faites, les conseils donnés au client, la garantie...",
  "titre_seo": "titre H1 optimisé contenant '${type}' et '${ville}' (55-65 caractères)",
  "meta_description": "description engageante mentionnant ${ville}${code_postal ? ` ${code_postal}` : ''}, le type et le résultat (145-160 caractères)"
}`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 2048,
      messages: [{ role: 'user', content: prompt }],
    });

    const content = message.content[0];
    if (content.type !== 'text') return fallback;

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return fallback;

    const parsed = JSON.parse(jsonMatch[0]) as AmeliorerTexteResult;
    return {
      contexte_enrichi: parsed.contexte_enrichi || params.contexte || '',
      diagnostic_enrichi: parsed.diagnostic_enrichi || params.diagnostic || '',
      intervention_enrichie: parsed.intervention_enrichie || params.intervention,
      resultat_enrichi: parsed.resultat_enrichi || params.resultat,
      titre_seo: parsed.titre_seo || fallback.titre_seo,
      meta_description: parsed.meta_description || fallback.meta_description,
    };
  } catch {
    return fallback;
  }
}
