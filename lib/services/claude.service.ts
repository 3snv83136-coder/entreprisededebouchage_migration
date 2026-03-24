import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface AmeliorerTexteParams {
  type: string;
  ville: string;
  contexte?: string;
  diagnostic?: string;
  intervention: string;
  resultat: string;
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

  const { type, ville, contexte, diagnostic, intervention, resultat } = params;

  const prompt = `Tu es rédacteur SEO local pour un plombier-déboucheur professionnel dans le Var (83), France.

Améliore chaque section de ce compte-rendu d'intervention rédigé par le technicien.
Règles :
- Conserve les faits et chiffres exacts (durée, pression, distance, etc.)
- Corrige les fautes sans dénaturer le style terrain
- Enrichis naturellement avec des termes techniques métier
- Chaque section doit rester courte (2-4 phrases max)
- Ton professionnel mais accessible

Intervention :
- Type : ${type}
- Ville : ${ville}
${contexte ? `- Situation : ${contexte}` : ''}
${diagnostic ? `- Diagnostic : ${diagnostic}` : ''}
- Intervention : ${intervention}
- Résultat : ${resultat}

Réponds UNIQUEMENT en JSON strict, sans commentaire :
{
  "contexte_enrichi": "${contexte ? '...' : ''}",
  "diagnostic_enrichi": "${diagnostic ? '...' : ''}",
  "intervention_enrichie": "...",
  "resultat_enrichi": "...",
  "titre_seo": "...",
  "meta_description": "..."
}

Le titre_seo doit contenir "${type}" et "${ville}" (50-65 caractères).
La meta_description doit être incitative (140-160 caractères).`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
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
