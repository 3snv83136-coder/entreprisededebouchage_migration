import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

interface AmeliorerTexteParams {
  type: string;
  ville: string;
  texte_brut: string;
}

interface AmeliorerTexteResult {
  texte_corrige: string;
  titre_seo: string;
  meta_description: string;
}

export async function ameliorerTexte(params: AmeliorerTexteParams): Promise<AmeliorerTexteResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    return {
      texte_corrige: params.texte_brut,
      titre_seo: `${params.type} à ${params.ville}`,
      meta_description: params.texte_brut.slice(0, 155),
    };
  }

  const { type, ville, texte_brut } = params;

  const prompt = `Tu es un expert SEO local pour un plombier-déboucheur dans le Var (83), France.

Améliore ce compte-rendu d'intervention rédigé par le technicien :
- Corrige les fautes sans changer le fond
- Rends-le professionnel mais humain
- Longueur similaire à l'original

Type d'intervention : ${type}
Ville : ${ville}

Texte du technicien :
${texte_brut}

Réponds en JSON strict :
{
  "texte_corrige": "...",
  "titre_seo": "...",
  "meta_description": "..."
}

Le titre_seo doit contenir "${type}" et "${ville}" (~60 caractères).
La meta_description doit être engageante (~155 caractères).`;

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type from Claude');
  }

  const jsonMatch = content.text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No JSON found in Claude response');
  }

  return JSON.parse(jsonMatch[0]) as AmeliorerTexteResult;
}
