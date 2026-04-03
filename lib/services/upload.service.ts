import { supabaseAdmin } from '@/lib/db/supabase';

const BUCKET = 'realisations-photos';

export async function uploadPhoto(
  file: File,
  realisationId: string,
  type: 'avant' | 'apres',
  rotation?: number
): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const inputBuffer = Buffer.from(arrayBuffer);

  let uploadBuffer: Buffer;
  let contentType: string;
  let ext: string;

  try {
    const sharp = (await import('sharp')).default;
    let pipeline = sharp(inputBuffer).rotate(); // auto-rotate from EXIF
    if (rotation && rotation !== 0) {
      pipeline = pipeline.rotate(rotation);
    }
    uploadBuffer = await pipeline
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 75 })
      .toBuffer();
    contentType = 'image/webp';
    ext = 'webp';
  } catch (sharpErr) {
    console.error('[upload] Sharp conversion failed:', sharpErr instanceof Error ? sharpErr.message : sharpErr);
    // Fallback: try sharp without resize/webp (just convert to jpeg)
    try {
      const sharp = (await import('sharp')).default;
      uploadBuffer = await sharp(inputBuffer).rotate().jpeg({ quality: 80 }).toBuffer();
      contentType = 'image/jpeg';
      ext = 'jpg';
    } catch {
      // Last resort: upload as-is but force web-compatible extension
      uploadBuffer = inputBuffer;
      const origExt = file.name.split('.').pop()?.toLowerCase() || '';
      const webSafe = ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(origExt);
      contentType = webSafe ? (file.type || 'image/jpeg') : 'image/jpeg';
      ext = webSafe ? origExt : 'jpg';
    }
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
