import { supabaseAdmin } from '@/lib/db/supabase';

const BUCKET = 'realisations-photos';

export async function uploadPhoto(
  file: File,
  realisationId: string,
  type: 'avant' | 'apres'
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const inputBuffer = Buffer.from(arrayBuffer);

  let uploadBuffer: Buffer;
  let contentType: string;
  let ext: string;

  try {
    // Dynamic import to avoid crash if sharp not available
    const sharp = (await import('sharp')).default;
    uploadBuffer = await sharp(inputBuffer)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    contentType = 'image/webp';
    ext = 'webp';
  } catch {
    // Fallback: upload original file as-is
    uploadBuffer = inputBuffer;
    contentType = file.type || 'image/jpeg';
    ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  }

  const path = `${realisationId}/${type}.${ext}`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, uploadBuffer, {
      contentType,
      upsert: true,
    });

  if (error) {
    throw new Error(`Upload photo ${type} failed: ${error.message}`);
  }

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}
