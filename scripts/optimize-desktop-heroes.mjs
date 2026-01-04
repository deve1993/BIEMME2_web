import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const IMG_DIR = './public/img';
const DESKTOP_WIDTH = 1280;
// Quality 70: buon compromesso tra qualità visiva e file size per hero images
const DESKTOP_QUALITY = 70;

const heroImages = ['hero-1.webp', 'hero-2.webp', 'hero-3.webp'];

async function optimizeDesktopHeroes() {
  console.log('Optimizing desktop hero images...\n');

  for (const filename of heroImages) {
    const inputPath = path.join(IMG_DIR, filename);
    const outputFilename = filename.replace('.webp', '-opt.webp');
    const outputPath = path.join(IMG_DIR, outputFilename);

    try {
      const inputStats = await fs.stat(inputPath);

      await sharp(inputPath)
        .resize(DESKTOP_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: DESKTOP_QUALITY })
        .toFile(outputPath);

      const outputStats = await fs.stat(outputPath);

      console.log(`✓ ${filename}`);
      console.log(`  Input:  ${Math.round(inputStats.size / 1024)}KB`);
      console.log(`  Output: ${outputFilename} - ${Math.round(outputStats.size / 1024)}KB`);
      console.log(`  Saved:  ${Math.round((1 - outputStats.size / inputStats.size) * 100)}%\n`);
    } catch (error) {
      console.error(`✗ Error processing ${filename}:`, error.message);
    }
  }

  console.log('Done! Desktop hero images optimized.');
}

optimizeDesktopHeroes();
