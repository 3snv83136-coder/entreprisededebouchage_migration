import { supabase } from '@/lib/db/supabase';
import type { Realisation } from '@/lib/types';

export async function getAllRealisations(): Promise<Realisation[]> {
  const { data, error } = await supabase
    .from('realisations')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export async function getRealisationBySlug(slug: string): Promise<Realisation | null> {
  const { data, error } = await supabase
    .from('realisations')
    .select('*')
    .eq('slug', slug)
    .single();
  if (error) return null;
  return data;
}

export async function getAllRealisationSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('realisations')
    .select('slug');
  if (error) return [];
  return (data || []).map((r) => r.slug);
}
