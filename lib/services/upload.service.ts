import { supabaseAdmin } from '@/lib/db/supabase';
import sharp from 'sharp';

const BUCKET = 'realisations-photos';

export async function uploadPhoto(
  file: File,
  realisationId: string,
  type: 'avant' | 'apres'
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const inputBuffer = Buffer.from(arrayBuffer);

  // Convert to WebP, resize to max 1200px wide, quality 75
  const webpBuffer = await sharp(inputBuffer)
    .resize({ width: 1200, withoutEnlargement: true })
    .webp({ quality: 75 })
    .toBuffer();

  const path = `${realisationId}/${type}.webp`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, webpBuffer, {
      contentType: 'image/webp',
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload photo ${type} failed: ${error.message}`);
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
