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
  // Delegate to enrichirRecit with combined text
  const recit = [params.contexte, params.diagnostic, params.intervention, params.resultat]
    .filter(Boolean)
    .join('. ');
  const result = await enrichirRecit({
    type: params.type,
    ville: params.ville,
    code_postal: params.code_postal,
    recit,
    duree: params.duree,
  });
  return {
    contexte_enrichi: result.contexte_enrichi,
    diagnostic_enrichi: result.diagnostic_enrichi,
    intervention_enrichie: result.intervention_enrichie,
    resultat_enrichi: result.resultat_enrichi,
    titre_seo: result.titre_seo,
    meta_description: result.meta_description,
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

export async function enrichirRecit(params: EnrichirRecitParams): Promise<EnrichirRecitResult> {
  const fallback: EnrichirRecitResult = {
    expertise_complete: params.recit,
    contexte_enrichi: params.recit,
    diagnostic_enrichi: '',
    intervention_enrichie: params.recit,
    resultat_enrichi: params.recit,
    titre_seo: `${params.type} a ${params.ville}`,
    meta_description: params.recit.slice(0, 155),
    materiels_detectes: '',
  };

  if (!process.env.ANTHROPIC_API_KEY) return fallback;

  const { type, ville, code_postal, recit, duree } = params;

  const prompt = `Tu es Christophe Allard, expert en assainissement dans le Var (83), France, avec 19 ans d'experience.

Un de tes techniciens a raconte une intervention de maniere informelle. Tu dois transformer ce recit en un TEXTE CONTINU D'EXPERTISE riche et detaille, comme si tu redigeais un rapport professionnel pour le client et pour le site web.

MISSION : A partir du recit brut, generer un texte d'expertise complet + des sections pour le rapport PDF + metadata SEO.

LE TEXTE D'EXPERTISE (champ "expertise_complete") :
- C'est le coeur du contenu : un texte continu de 300 a 500 mots
- Raconte l'intervention comme un recit d'expert : la demande du client, ce qu'on a observe, notre analyse technique, comment on a procede, le resultat et les recommandations
- Ajoute ton expertise : explique POURQUOI le probleme est arrive, quels risques si non traite, quelles precautions pour l'avenir
- Ton professionnel mais accessible — le client doit comprendre et etre rassure
- Integre naturellement ces termes quand pertinent : ${MAILLAGE_KEYWORDS.join(', ')}
- Mentionne la ville ${ville}${code_postal ? ` (${code_postal})` : ''} naturellement
- NE PAS inventer de faits qui contredisent le recit du technicien
- Developpe les aspects techniques : type de canalisation, pression utilisee, distance, methode, cause identifiee

LES SECTIONS RAPPORT PDF (champs contexte/diagnostic/intervention/resultat) :
- Ce sont des versions courtes (2-3 phrases chacune) pour structurer le rapport PDF
- Elles reprennent les points cles du texte d'expertise

Recit brut du technicien :
"${recit}"

Type d'intervention : ${type}
Ville : ${ville}${code_postal ? ` (${code_postal})` : ''}
${duree ? `Duree : ${duree}` : ''}

Reponds UNIQUEMENT en JSON strict :
{
  "expertise_complete": "Le texte d'expertise complet, 300-500 mots, continu, riche en savoir-faire technique...",
  "contexte_enrichi": "2-3 phrases : situation initiale, demande du client",
  "diagnostic_enrichi": "2-3 phrases : ce qu'on a trouve, cause identifiee",
  "intervention_enrichie": "2-3 phrases : methode, materiel, etapes cles",
  "resultat_enrichi": "2-3 phrases : resultat, verification, conseil",
  "titre_seo": "titre H1 optimise contenant '${type}' et '${ville}' (55-65 caracteres)",
  "meta_description": "description engageante mentionnant ${ville}, le type et le resultat (145-160 caracteres)",
  "materiels_detectes": "liste des materiels utilises ou implicites, separes par des virgules"
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

    const parsed = JSON.parse(jsonMatch[0]) as EnrichirRecitResult;
    return {
      expertise_complete: parsed.expertise_complete || params.recit,
      contexte_enrichi: parsed.contexte_enrichi || params.recit,
      diagnostic_enrichi: parsed.diagnostic_enrichi || '',
      intervention_enrichie: parsed.intervention_enrichie || params.recit,
      resultat_enrichi: parsed.resultat_enrichi || params.recit,
      titre_seo: parsed.titre_seo || fallback.titre_seo,
      meta_description: parsed.meta_description || fallback.meta_description,
      materiels_detectes: parsed.materiels_detectes || '',
    };
  } catch {
    return fallback;
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
    <div class="company">Entreprise de Debouchage — Specialiste assainissement Var (83)</div>
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
      <div class="signature-company">Entreprise de Debouchage — Var (83)</div>
    </div>
  </div>

  <div class="footer">
    <p>Rapport genere par <strong>Entreprise de Debouchage</strong> — ${date}</p>
    <p>Intervention 24h/7j dans tout le Var (83) — entreprisededebouchage.com</p>
  </div>

</div>
</body>
</html>`;
}
