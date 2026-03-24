import { supabaseAdmin } from '@/lib/db/supabase';

const BUCKET = 'realisations-photos';

export async function uploadPhoto(
  file: File,
  realisationId: string,
  type: 'avant' | 'apres'
): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${realisationId}/${type}.${ext}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload photo ${type} failed: ${error.message}`);
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
