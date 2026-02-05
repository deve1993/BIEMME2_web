import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const IMG_DIR = './public/img';
const MAX_WIDTH = 1200;
const MAX_SIZE_KB = 100;

// Usa le versioni -original come source
const imagesToOptimize = [
  'cantiere-residenziale',
  'scavi-movimento-terra',
  'team',
  'edilizia-industriale',
];

async function optimizeImages() {
  console.log('Optimizing from -original files...\n');

  for (const basename of imagesToOptimize) {
    const sourcePath = path.join(IMG_DIR, `${basename}-original.webp`);
    const outputPath = path.join(IMG_DIR, `${basename}-opt.webp`);

    try {
      // Check if source exists
      await fs.access(sourcePath);

      const originalStats = await fs.stat(sourcePath);
      const originalKB = Math.round(originalStats.size / 1024);

      const metadata = await sharp(sourcePath).metadata();

      let quality = 75;
      let outputBuffer;

      // Try decreasing quality until under target size
      do {
        outputBuffer = await sharp(sourcePath)
          .resize({
            width: MAX_WIDTH,
            withoutEnlargement: true
          })
          .webp({ quality })
          .toBuffer();

        if (outputBuffer.length > MAX_SIZE_KB * 1024 && quality > 30) {
          quality -= 5;
        } else {
          break;
        }
      } while (quality > 30);

      await fs.writeFile(outputPath, outputBuffer);

      const newKB = Math.round(outputBuffer.length / 1024);
      const savings = Math.round((1 - newKB / originalKB) * 100);

      console.log(`✓ ${basename}`);
      console.log(`  ${originalKB} KB → ${newKB} KB (-${savings}%)`);
      console.log(`  Quality: ${quality}, Width: ${Math.min(metadata.width, MAX_WIDTH)}px\n`);

    } catch (error) {
      console.error(`✗ Error processing ${basename}:`, error.message);
    }
  }

  console.log('Done! New optimized files created with -opt suffix.');
  console.log('Update your code to use the -opt versions.');
}

optimizeImages();
