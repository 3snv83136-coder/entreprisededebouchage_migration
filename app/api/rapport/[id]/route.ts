import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/db/supabase';
import { genererRapportHTML } from '@/lib/services/claude.service';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const { data: r, error } = await supabaseAdmin
    .from('realisations')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !r) {
    return new Response('Realisation non trouvee', { status: 404 });
  }

  const html = genererRapportHTML({
    type: r.type,
    ville: r.ville,
    code_postal: r.code_postal || undefined,
    mois: r.mois,
    annee: r.annee,
    duree: r.duree || undefined,
    recit: r.contexte || r.intervention || '',
    contexte_enrichi: r.contexte_enrichi || undefined,
    diagnostic_enrichi: r.diagnostic_enrichi || undefined,
    intervention_enrichie: r.intervention_enrichie || undefined,
    resultat_enrichi: r.description_generee || undefined,
    materiels: r.materiels || undefined,
    temoignage: r.temoignage || undefined,
  });

  // Return HTML that auto-triggers print dialog for PDF save
  const printableHtml = html.replace(
    '</body>',
    `<script>window.onload = function() { window.print(); }</script></body>`
  );

  return new Response(printableHtml, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  });
}
