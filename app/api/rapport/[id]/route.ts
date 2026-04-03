import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db/supabase';
import { genererRapportHTML } from '@/lib/services/claude.service';

export const dynamic = 'force-dynamic';
export const maxDuration = 30;

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    if (!id || id === 'undefined') {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }

    const { data: r, error } = await supabaseAdmin
      .from('realisations')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !r) {
      return NextResponse.json(
        { error: 'Realisation non trouvee', detail: error?.message },
        { status: 404 }
      );
    }

    const html = genererRapportHTML({
      type: r.type,
      ville: r.ville,
      code_postal: r.code_postal || undefined,
      mois: r.mois,
      annee: r.annee,
      duree: r.duree || undefined,
      recit: r.contexte || r.intervention || '',
      contexte_enrichi: r.contexte || undefined,
      diagnostic_enrichi: r.diagnostic || undefined,
      intervention_enrichie: r.intervention || undefined,
      resultat_enrichi: r.resultat || undefined,
      materiels: r.materiels || undefined,
      temoignage: r.temoignage || undefined,
      expertise_complete: r.description_generee || undefined,
      photo_avant_url: r.photo_avant_url || undefined,
      photo_apres_url: r.photo_apres_url || undefined,
    });

    // Auto-triggers print dialog for PDF save
    const printableHtml = html.replace(
      '</body>',
      `<script>window.onload = function() { window.print(); }</script></body>`
    );

    return new NextResponse(printableHtml, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Erreur serveur', detail: String(err) },
      { status: 500 }
    );
  }
}
