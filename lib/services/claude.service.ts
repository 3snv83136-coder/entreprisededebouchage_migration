import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ── Legacy interface (kept for compatibility) ──
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
  const recit = [params.contexte, params.diagnostic, params.intervention, params.resultat]
    .filter(Boolean)
    .join('. ');
  const response = await enrichirRecit({
    type: params.type,
    ville: params.ville,
    code_postal: params.code_postal,
    recit,
    duree: params.duree,
  });
  const d = response.data;
  return {
    contexte_enrichi: d.contexte_enrichi,
    diagnostic_enrichi: d.diagnostic_enrichi,
    intervention_enrichie: d.intervention_enrichie,
    resultat_enrichi: d.resultat_enrichi,
    titre_seo: d.titre_seo,
    meta_description: d.meta_description,
  };
}

// ── New: single free-text recit enrichment ──
interface EnrichirRecitParams {
  type: string;
  ville: string;
  code_postal?: string;
  recit: string;
  duree?: string;
}

interface EnrichirRecitResult {
  expertise_complete: string;
  contexte_enrichi: string;
  diagnostic_enrichi: string;
  intervention_enrichie: string;
  resultat_enrichi: string;
  titre_seo: string;
  meta_description: string;
  materiels_detectes: string;
}

const MAILLAGE_KEYWORDS = [
  'canalisation', 'canalisations', 'hydrocurage', 'haute pression', 'hydrocureur',
  'furet', 'camera inspection', 'inspection camera', 'fosse septique',
  'wc', 'toilettes', 'evier', 'lavabo', 'douche', 'baignoire',
  'egout', 'egouts', 'regard', 'regards', 'salle de bain',
  'lave-vaisselle', 'lave-linge', 'cuisine', 'siphon',
  'tartre', 'calcaire', 'graisse', 'racines',
  'debouchage', 'curage', 'vidange',
];

export interface EnrichirRecitResponse {
  success: boolean;
  error?: string;
  data: EnrichirRecitResult;
}

export async function enrichirRecit(params: EnrichirRecitParams): Promise<EnrichirRecitResponse> {
  const fallbackData: EnrichirRecitResult = {
    expertise_complete: '',
    contexte_enrichi: '',
    diagnostic_enrichi: '',
    intervention_enrichie: '',
    resultat_enrichi: '',
    titre_seo: `${params.type} a ${params.ville}`,
    meta_description: params.recit.slice(0, 155),
    materiels_detectes: '',
  };

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('[claude] ANTHROPIC_API_KEY manquante');
    return { success: false, error: 'Cle API Anthropic non configuree', data: fallbackData };
  }

  const { type, ville, code_postal, recit, duree } = params;
  console.log('[claude] Calling Claude API for', type, ville, '— recit length:', recit.length);

  const prompt = `Tu es un redacteur specialise qui enrichit les recits de techniciens en assainissement. Le technicien a raconte son intervention de maniere brute — ton travail est de developper ce recit en gardant EXACTEMENT son ton, son vocabulaire, sa facon de raconter.

REGLE D'OR : tu enrichis, tu ne reecris pas. Le technicien dit "on a passe la camera" → tu gardes "on a passe la camera", tu ne dis pas "nous avons procede a une inspection par camera endoscopique". Tu developpes les details techniques, tu expliques le pourquoi, tu ajoutes du contexte pro — mais dans le style du gars qui raconte son chantier.

ARTICLE CONTINU (champ "expertise_complete") :
- MINIMUM 400 mots, MAXIMUM 600 mots — c'est OBLIGATOIRE
- Texte continu sans sous-titres, sans bullet points
- Developpe ce que le technicien a dit : details techniques (type de canalisation, pression, distance, cause), contexte (pourquoi ce probleme arrive, risques si non traite), precautions pour l'avenir
- Comme si le technicien expliquait en detail a un client curieux qui pose des questions
- Integre naturellement ces termes quand pertinent : ${MAILLAGE_KEYWORDS.join(', ')}
- Mentionne ${ville}` + (code_postal ? ` (${code_postal})` : '') + ` naturellement 1-2 fois
- NE PAS inventer de faits absents du recit
- NE PAS utiliser de ton commercial ou corporate

RESUME 4 SECTIONS (champs contexte/diagnostic/intervention/resultat) :
- Chaque section : 2-3 phrases, extraites du texte principal
- Meme ton que l'article

Recit brut du technicien :
"${recit}"

Type : ${type}
Ville : ${ville}` + (code_postal ? ` (${code_postal})` : '') + `
${duree ? `Duree : ${duree}` : ''}

IMPORTANT : Reponds UNIQUEMENT avec un objet JSON valide, sans markdown, sans backticks, sans texte avant ou apres :
{
  "expertise_complete": "article continu 400-600 mots...",
  "contexte_enrichi": "2-3 phrases : situation initiale",
  "diagnostic_enrichi": "2-3 phrases : ce qu'on a trouve",
  "intervention_enrichie": "2-3 phrases : methode utilisee",
  "resultat_enrichi": "2-3 phrases : resultat et suivi",
  "titre_seo": "titre H1 avec '${type}' et '${ville}' (55-65 caracteres)",
  "meta_description": "description engageante avec ${ville} et resultat (145-160 caracteres)",
  "materiels_detectes": "materiels utilises, separes par virgules"
}`;

  try {
    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }],
    });

    console.log('[claude] Response received, stop_reason:', message.stop_reason);

    if (message.stop_reason === 'max_tokens') {
      console.error('[claude] Response tronquee (max_tokens atteint)');
      return { success: false, error: 'Reponse IA tronquee — texte trop long', data: fallbackData };
    }

    const content = message.content[0];
    if (content.type !== 'text') {
      console.error('[claude] Non-text content type:', content.type);
      return { success: false, error: 'Reponse IA invalide (pas de texte)', data: fallbackData };
    }

    console.log('[claude] Raw response length:', content.text.length);

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('[claude] No JSON found in response:', content.text.slice(0, 500));
      return { success: false, error: 'Reponse IA sans JSON valide', data: fallbackData };
    }

    let parsed: EnrichirRecitResult;
    try {
      parsed = JSON.parse(jsonMatch[0]) as EnrichirRecitResult;
    } catch (parseErr) {
      console.error('[claude] JSON parse error:', parseErr, '— raw:', jsonMatch[0].slice(0, 500));
      return { success: false, error: 'JSON invalide dans la reponse IA', data: fallbackData };
    }

    if (!parsed.expertise_complete || parsed.expertise_complete.length < 200) {
      console.error('[claude] expertise_complete trop court:', parsed.expertise_complete?.length || 0);
      return {
        success: false,
        error: `Texte genere trop court (${parsed.expertise_complete?.length || 0} car.)`,
        data: fallbackData,
      };
    }

    const wordCount = parsed.expertise_complete.split(/\s+/).length;
    console.log('[claude] expertise_complete:', wordCount, 'mots,', parsed.expertise_complete.length, 'caracteres');

    return {
      success: true,
      data: {
        expertise_complete: parsed.expertise_complete,
        contexte_enrichi: parsed.contexte_enrichi || '',
        diagnostic_enrichi: parsed.diagnostic_enrichi || '',
        intervention_enrichie: parsed.intervention_enrichie || '',
        resultat_enrichi: parsed.resultat_enrichi || '',
        titre_seo: parsed.titre_seo || fallbackData.titre_seo,
        meta_description: parsed.meta_description || fallbackData.meta_description,
        materiels_detectes: parsed.materiels_detectes || '',
      },
    };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error('[claude] API error:', errMsg);
    return { success: false, error: `Erreur API Claude : ${errMsg}`, data: fallbackData };
  }
}

// ── PDF report generation ──
interface RapportParams {
  type: string;
  ville: string;
  code_postal?: string;
  mois: string;
  annee: string;
  duree?: string;
  recit: string;
  contexte_enrichi?: string;
  diagnostic_enrichi?: string;
  intervention_enrichie?: string;
  resultat_enrichi?: string;
  materiels?: string;
  temoignage?: string;
  intervenant?: string;
  expertise_complete?: string;
  photo_avant_url?: string;
  photo_apres_url?: string;
}

export function genererRapportHTML(params: RapportParams): string {
  const {
    type, ville, code_postal, mois, annee, duree,
    contexte_enrichi, diagnostic_enrichi,
    intervention_enrichie, resultat_enrichi,
    materiels, temoignage, intervenant, expertise_complete,
    photo_avant_url, photo_apres_url,
  } = params;

  const date = `${mois} ${annee}`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Rapport d'intervention — ${type} a ${ville}</title>
<style>
  @page { margin: 20mm 18mm; size: A4; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Helvetica Neue', Arial, sans-serif;
    font-size: 11pt;
    color: #1a1a1a;
    line-height: 1.6;
    background: #fff;
  }
  .page { padding: 0; }

  /* Header */
  .header {
    background: linear-gradient(135deg, #0e141c 0%, #1a2028 100%);
    color: #fff;
    padding: 32px 36px;
    border-radius: 0 0 12px 12px;
    margin-bottom: 28px;
  }
  .header h1 {
    font-size: 22pt;
    font-weight: 800;
    margin-bottom: 4px;
    color: #ffb786;
  }
  .header h2 {
    font-size: 12pt;
    font-weight: 400;
    color: #ddc1b0;
  }
  .header .company {
    font-size: 10pt;
    color: #8b949e;
    margin-top: 12px;
  }

  /* Info grid */
  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 28px;
    padding: 0 4px;
  }
  .info-box {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 14px 18px;
  }
  .info-box .label {
    font-size: 9pt;
    font-weight: 700;
    color: #f4811f;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 4px;
  }
  .info-box .value {
    font-size: 11pt;
    font-weight: 600;
    color: #1a1a1a;
  }

  /* Sections */
  .section {
    margin-bottom: 24px;
    padding: 0 4px;
  }
  .section-num {
    display: inline-block;
    background: #f4811f;
    color: #fff;
    font-size: 10pt;
    font-weight: 800;
    width: 28px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border-radius: 50%;
    margin-right: 10px;
  }
  .section h3 {
    display: inline;
    font-size: 13pt;
    font-weight: 700;
    color: #0e141c;
    vertical-align: middle;
  }
  .section-content {
    margin-top: 12px;
    padding-left: 38px;
    font-size: 11pt;
    color: #333;
    line-height: 1.7;
  }

  /* Result box */
  .result-box {
    background: #f0fdf4;
    border: 2px solid #22c55e;
    border-radius: 10px;
    padding: 20px 24px;
    margin: 24px 4px;
  }
  .result-box h3 {
    color: #16a34a;
    font-size: 13pt;
    margin-bottom: 8px;
  }
  .result-box p {
    color: #333;
    line-height: 1.7;
  }

  /* Testimonial */
  .testimonial {
    background: #fffbeb;
    border-left: 4px solid #f4811f;
    padding: 16px 20px;
    margin: 20px 4px;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #555;
  }

  /* Summary grid */
  .summary-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin: 24px 4px;
  }
  .summary-box {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 8px;
    padding: 14px 18px;
  }
  .summary-box p {
    font-size: 10pt;
    color: #333;
    line-height: 1.5;
    margin: 0;
  }
  .summary-title {
    font-size: 9pt;
    font-weight: 700;
    color: #f4811f;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin-bottom: 6px;
  }
  .summary-result {
    grid-column: span 2;
    background: #f0fdf4;
    border-color: #22c55e;
  }
  .summary-result .summary-title {
    color: #16a34a;
  }

  /* Photos */
  .photos {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    margin: 24px 4px;
  }
  .photo-box {
    text-align: center;
  }
  .photo-box img {
    width: 100%;
    max-height: 280px;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }
  .photo-box .photo-label {
    font-size: 9pt;
    font-weight: 700;
    color: #f4811f;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-top: 8px;
  }

  /* Signature */
  .signature {
    margin: 32px 4px 0;
    padding: 24px;
    border-top: 2px solid #e9ecef;
    display: flex;
    justify-content: flex-end;
  }
  .signature-block {
    text-align: right;
  }
  .signature-name {
    font-size: 14pt;
    font-weight: 700;
    color: #0e141c;
  }
  .signature-role {
    font-size: 10pt;
    color: #f4811f;
    font-weight: 600;
    margin-top: 2px;
  }
  .signature-company {
    font-size: 9pt;
    color: #8b949e;
    margin-top: 4px;
  }

  /* Footer */
  .footer {
    border-top: 2px solid #e9ecef;
    padding-top: 16px;
    margin-top: 24px;
    text-align: center;
    font-size: 9pt;
    color: #8b949e;
  }
  .footer strong { color: #f4811f; }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <h1>RAPPORT D'INTERVENTION &amp; DIAGNOSTIC</h1>
    <h2>${type} — ${ville}${code_postal ? ` (${code_postal})` : ''}</h2>
    <div class="company">Entreprise de Debouchage — Specialiste assainissement Bouches-du-Rhone (13)</div>
  </div>

  <div class="info-grid">
    <div class="info-box">
      <div class="label">Type d'intervention</div>
      <div class="value">${type}</div>
    </div>
    <div class="info-box">
      <div class="label">Lieu</div>
      <div class="value">${ville}${code_postal ? ` (${code_postal})` : ''}</div>
    </div>
    <div class="info-box">
      <div class="label">Date</div>
      <div class="value">${date}</div>
    </div>
    <div class="info-box">
      <div class="label">Duree</div>
      <div class="value">${duree || 'Non precisee'}</div>
    </div>
    ${intervenant ? `
    <div class="info-box">
      <div class="label">Intervenant</div>
      <div class="value">${intervenant}</div>
    </div>` : ''}
    ${materiels ? `
    <div class="info-box" style="grid-column: span 2;">
      <div class="label">Materiels utilises</div>
      <div class="value">${materiels}</div>
    </div>` : ''}
  </div>

  <div class="section">
    <span class="section-num">1</span>
    <h3>RAPPORT D'EXPERTISE</h3>
    <div class="section-content">
      ${expertise_complete || contexte_enrichi || 'Non renseigne.'}
    </div>
  </div>

  <div class="summary-grid">
    <div class="summary-box">
      <div class="summary-title">Contexte</div>
      <p>${contexte_enrichi || '—'}</p>
    </div>
    <div class="summary-box">
      <div class="summary-title">Diagnostic</div>
      <p>${diagnostic_enrichi || '—'}</p>
    </div>
    <div class="summary-box">
      <div class="summary-title">Intervention</div>
      <p>${intervention_enrichie || '—'}</p>
    </div>
    <div class="summary-box summary-result">
      <div class="summary-title">Resultat</div>
      <p>${resultat_enrichi || '—'}</p>
    </div>
  </div>

  ${temoignage ? `
  <div class="testimonial">
    "${temoignage}"
  </div>` : ''}

  ${(photo_avant_url || photo_apres_url) ? `
  <div class="section">
    <span class="section-num">4</span>
    <h3>PHOTOS</h3>
  </div>
  <div class="photos">
    ${photo_avant_url ? `
    <div class="photo-box">
      <img src="${photo_avant_url}" alt="Avant intervention" />
      <div class="photo-label">Avant</div>
    </div>` : ''}
    ${photo_apres_url ? `
    <div class="photo-box">
      <img src="${photo_apres_url}" alt="Apres intervention" />
      <div class="photo-label">Apres</div>
    </div>` : ''}
  </div>` : ''}

  <div class="signature">
    <div class="signature-block">
      <div class="signature-name">Christophe Allard</div>
      <div class="signature-role">Expert en assainissement</div>
      <div class="signature-company">Entreprise de Debouchage — Bouches-du-Rhone (13)</div>
    </div>
  </div>

  <div class="footer">
    <p>Rapport genere par <strong>Entreprise de Debouchage</strong> — ${date}</p>
    <p>Intervention 24h/7j dans tout les Bouches-du-Rhone (13) — entreprisededebouchage.com</p>
  </div>

</div>
</body>
</html>`;
}
