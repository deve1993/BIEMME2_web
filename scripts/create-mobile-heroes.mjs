import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const IMG_DIR = './public/img';
const MOBILE_WIDTH = 480;
const MOBILE_QUALITY = 40;

const heroImages = ['hero-1-opt.webp', 'hero-2-opt.webp', 'hero-3-opt.webp'];

async function createMobileHeroes() {
  console.log('Creating mobile-optimized hero images...\n');

  for (const filename of heroImages) {
    const inputPath = path.join(IMG_DIR, filename);
    const outputFilename = filename.replace('-opt.webp', '-mobile.webp');
    const outputPath = path.join(IMG_DIR, outputFilename);

    try {
      const inputStats = await fs.stat(inputPath);

      await sharp(inputPath)
        .resize(MOBILE_WIDTH, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: MOBILE_QUALITY })
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

  console.log('Done! Mobile hero images created.');
}

createMobileHeroes();
