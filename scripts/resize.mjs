// Usage: node scripts/resize.mjs <src-dir> <dest-dir>
// Resizes photos to max 2000px (keeps aspect), auto-rotates from EXIF, strips metadata.
import sharp from 'sharp';
import { readdirSync, mkdirSync } from 'node:fs';
import { join, parse } from 'node:path';
const [src, dest] = process.argv.slice(2);
mkdirSync(dest, { recursive: true });
for (const f of readdirSync(src)) {
  if (!/\.(jpe?g|png)$/i.test(f)) continue;
  const out = join(dest, parse(f).name.toLowerCase() + '.jpg');
  await sharp(join(src, f)).rotate().resize({ width: 2000, height: 2000, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  console.log('→', out);
}
