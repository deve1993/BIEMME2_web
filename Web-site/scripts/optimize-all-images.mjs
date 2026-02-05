import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const IMG_DIR = './public/img';
const MAX_WIDTH = 1200;
const QUALITY = 75;
const MAX_SIZE_KB = 100; // Target: sotto 100KB

// Immagini da ottimizzare (escludi quelle già ottimizzate)
const imagesToOptimize = [
  'cantiere-residenziale.webp',
  'scavi-movimento-terra.webp',
  'team.webp',
  'edilizia-industriale.webp',
];

async function optimizeImages() {
  console.log('Optimizing secondary images...\n');
  console.log(`Target: max ${MAX_WIDTH}px width, quality ${QUALITY}, under ${MAX_SIZE_KB}KB\n`);

  for (const filename of imagesToOptimize) {
    const inputPath = path.join(IMG_DIR, filename);

    try {
      const originalStats = await fs.stat(inputPath);
      const originalKB = Math.round(originalStats.size / 1024);

      // Crea backup
      const backupPath = inputPath.replace('.webp', '-original.webp');
      await fs.copyFile(inputPath, backupPath);

      // Ottimizza
      const image = sharp(inputPath);
      const metadata = await image.metadata();

      let quality = QUALITY;
      let outputBuffer;

      // Ridimensiona se necessario
      const resizeOptions = metadata.width > MAX_WIDTH
        ? { width: MAX_WIDTH, withoutEnlargement: true }
        : {};

      // Prova qualità decrescenti per raggiungere target
      do {
        outputBuffer = await sharp(inputPath)
          .resize(resizeOptions)
          .webp({ quality })
          .toBuffer();

        if (outputBuffer.length > MAX_SIZE_KB * 1024 && quality > 30) {
          quality -= 10;
        } else {
          break;
        }
      } while (quality > 30);

      await fs.writeFile(inputPath, outputBuffer);

      const newKB = Math.round(outputBuffer.length / 1024);
      const savings = Math.round((1 - newKB / originalKB) * 100);

      console.log(`✓ ${filename}`);
      console.log(`  ${originalKB} KB → ${newKB} KB (-${savings}%)`);
      console.log(`  Quality: ${quality}, Width: ${Math.min(metadata.width, MAX_WIDTH)}px\n`);

    } catch (error) {
      console.error(`✗ Error processing ${filename}:`, error.message);
    }
  }

  console.log('Done! Secondary images optimized.');
  console.log('Backup files created with -original suffix.');
}

optimizeImages();
