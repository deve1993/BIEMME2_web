/**
 * Script per rigenerare le immagini hero ad alta qualità
 *
 * Prende le immagini originali dalla cartella Context/ e genera:
 * - Versioni desktop (1920px, quality 85)
 * - Versioni mobile (960px, quality 78)
 */

import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');

// Configurazione - bilanciato qualità/size
const DESKTOP_WIDTH = 1920;
const MOBILE_WIDTH = 960;
const DESKTOP_QUALITY = 75;  // Buon compromesso per full-screen
const MOBILE_QUALITY = 68;   // Ottimizzato per mobile

// Mappatura sorgente -> destinazione
const IMAGE_MAP = [
  {
    source: 'Context/edilizia industriale.jpg',
    desktop: 'public/img/hero-1-opt.webp',
    mobile: 'public/img/hero-1-mobile.webp',
    name: 'Hero 1 - Edilizia Industriale'
  },
  {
    source: 'Context/cantiere residenziale.jpg',
    desktop: 'public/img/hero-2-opt.webp',
    mobile: 'public/img/hero-2-mobile.webp',
    name: 'Hero 2 - Cantiere Residenziale'
  },
  {
    source: 'Context/scavi e movimento terra.jpg',
    desktop: 'public/img/hero-3-opt.webp',
    mobile: 'public/img/hero-3-mobile.webp',
    name: 'Hero 3 - Scavi e Movimento Terra'
  }
];

async function processImage(config) {
  const sourcePath = path.join(ROOT_DIR, config.source);
  const desktopPath = path.join(ROOT_DIR, config.desktop);
  const mobilePath = path.join(ROOT_DIR, config.mobile);

  console.log(`\nProcessing: ${config.name}`);
  console.log(`  Source: ${config.source}`);

  // Verifica che il file sorgente esista
  if (!fs.existsSync(sourcePath)) {
    console.error(`  ERROR: Source file not found: ${sourcePath}`);
    return false;
  }

  try {
    // Leggi metadata originale
    const metadata = await sharp(sourcePath).metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height}`);

    // Genera versione desktop
    const desktopResult = await sharp(sourcePath)
      .resize(DESKTOP_WIDTH, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: DESKTOP_QUALITY })
      .toFile(desktopPath);

    const desktopSize = (desktopResult.size / 1024).toFixed(1);
    console.log(`  Desktop: ${desktopResult.width}x${desktopResult.height} - ${desktopSize} KB`);

    // Genera versione mobile
    const mobileResult = await sharp(sourcePath)
      .resize(MOBILE_WIDTH, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: MOBILE_QUALITY })
      .toFile(mobilePath);

    const mobileSize = (mobileResult.size / 1024).toFixed(1);
    console.log(`  Mobile: ${mobileResult.width}x${mobileResult.height} - ${mobileSize} KB`);

    return true;
  } catch (error) {
    console.error(`  ERROR: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log('='.repeat(60));
  console.log('HERO IMAGE REGENERATION');
  console.log('='.repeat(60));
  console.log(`Desktop: ${DESKTOP_WIDTH}px, quality ${DESKTOP_QUALITY}`);
  console.log(`Mobile: ${MOBILE_WIDTH}px, quality ${MOBILE_QUALITY}`);

  let success = 0;
  let failed = 0;

  for (const config of IMAGE_MAP) {
    const result = await processImage(config);
    if (result) {
      success++;
    } else {
      failed++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`COMPLETED: ${success} success, ${failed} failed`);
  console.log('='.repeat(60));

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
