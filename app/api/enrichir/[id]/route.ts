import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db/supabase';
import { enrichirRecit } from '@/lib/services/claude.service';
import { generateFaq, generateJsonLd } from '@/lib/services/realisation.service';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { data: r, error } = await supabaseAdmin
      .from('realisations')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !r) {
      return NextResponse.json({ status: 'error', error: 'Realisation introuvable' }, { status: 404 });
    }

    // Already enriched? (description_generee exists AND is different from raw contexte)
    if (r.description_generee && r.description_generee.length > 200 && r.description_generee !== r.contexte) {
      const wordCount = r.description_generee.split(/\s+/).length;
      return NextResponse.json({ status: 'already_enriched', word_count: wordCount });
    }

    const recit = r.contexte || r.intervention || '';
    if (!recit || recit.trim().length < 10) {
      return NextResponse.json({ status: 'error', error: 'Recit trop court pour enrichissement' });
    }

    const result = await enrichirRecit({
      type: r.type,
      ville: r.ville,
      code_postal: r.code_postal || undefined,
      recit,
      duree: r.duree || undefined,
    });

    // Always update FAQ + JSON-LD
    const updates: Record<string, unknown> = {};
    const faq = generateFaq(r.type, r.ville);
    updates.faq = faq;

    if (!result.success) {
      // Save FAQ/JSON-LD even on AI failure
      updates.json_ld = generateJsonLd({
        type: r.type, ville: r.ville, slug: r.slug,
        mois: r.mois, annee: r.annee, resultat: recit, faq,
        meta_description: r.meta_description,
      });
      await supabaseAdmin.from('realisations').update(updates).eq('id', id);

      return NextResponse.json({
        status: 'error',
        error: result.error || 'Enrichissement IA echoue',
      });
    }

    // Success — save enriched data in existing DB columns
    const d = result.data;
    updates.description_generee = d.expertise_complete;
    updates.contexte = d.contexte_enrichi || recit;
    updates.diagnostic = d.diagnostic_enrichi || null;
    updates.intervention = d.intervention_enrichie || recit;
    updates.resultat = d.resultat_enrichi || recit;
    updates.titre = d.titre_seo || r.titre;
    updates.meta_description = d.meta_description || r.meta_description;
    updates.materiels = d.materiels_detectes || r.materiels;
    updates.json_ld = generateJsonLd({
      type: r.type, ville: r.ville, slug: r.slug,
      mois: r.mois, annee: r.annee, resultat: recit, faq,
      description_generee: d.expertise_complete,
      meta_description: d.meta_description || r.meta_description,
    });

    await supabaseAdmin.from('realisations').update(updates).eq('id', id);

    const wordCount = d.expertise_complete.split(/\s+/).length;
    return NextResponse.json({
      status: 'enriched',
      word_count: wordCount,
      expertise_length: d.expertise_complete.length,
    });
  } catch (err) {
    console.error('[enrichir API] Error:', err);
    return NextResponse.json(
      { status: 'error', error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
