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
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    // Already enriched?
    if (r.description_generee && r.description_generee !== r.contexte) {
      return NextResponse.json({ status: 'already_enriched' });
    }

    const recit = r.contexte || r.intervention || '';
    const improved = await enrichirRecit({
      type: r.type,
      ville: r.ville,
      code_postal: r.code_postal || undefined,
      recit,
      duree: r.duree || undefined,
    });

    const updates: Record<string, unknown> = {};

    if (improved.expertise_complete && improved.expertise_complete !== recit) {
      updates.contexte_enrichi = improved.contexte_enrichi;
      updates.diagnostic_enrichi = improved.diagnostic_enrichi;
      updates.intervention_enrichie = improved.intervention_enrichie;
      updates.resultat_enrichi = improved.resultat_enrichi;
      updates.description_generee = improved.expertise_complete;
      updates.titre = improved.titre_seo;
      updates.meta_description = improved.meta_description;
      updates.materiels = improved.materiels_detectes;
    }

    // FAQ + JSON-LD
    const faq = generateFaq(r.type, r.ville);
    updates.faq = faq;
    updates.json_ld = generateJsonLd({
      type: r.type,
      ville: r.ville,
      slug: r.slug,
      mois: r.mois,
      annee: r.annee,
      resultat: recit,
      faq,
      description_generee: updates.description_generee as string | undefined,
      meta_description: (updates.meta_description as string) || r.meta_description,
    });

    if (Object.keys(updates).length > 0) {
      await supabaseAdmin.from('realisations').update(updates).eq('id', id);
    }

    return NextResponse.json({
      status: 'enriched',
      expertise_length: (updates.description_generee as string)?.length || 0,
    });
  } catch (err) {
    console.error('[enrichir API] Error:', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
