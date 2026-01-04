/**
 * Script per comprimere ulteriormente le immagini hero
 * Target: < 50KB per immagine per LCP ottimale su mobile
 * Crea nuovi file con suffisso -opt per evitare lock
 */

import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgDir = path.join(__dirname, "..", "public", "img");

// Configurazione aggressiva per mobile LCP
const CONFIG = {
  maxWidth: 1600, // Ridotto da 1920 per mobile-first
  quality: 60, // Qualità ridotta per performance (era 65)
};

async function compressHeroImages() {
  console.log("🚀 Compressione aggressiva immagini hero...\n");

  const heroFiles = ["hero-1.webp", "hero-2.webp", "hero-3.webp"];
  let totalSaved = 0;

  for (const file of heroFiles) {
    const inputPath = path.join(imgDir, file);
    const outputPath = path.join(imgDir, `${file.replace(".webp", "-opt.webp")}`);

    try {
      // Check if file exists
      await fs.access(inputPath);

      // Get original size
      const originalStats = await fs.stat(inputPath);
      const originalSize = originalStats.size;

      // Compress with aggressive settings
      await sharp(inputPath)
        .resize(CONFIG.maxWidth, null, {
          withoutEnlargement: true,
          fit: "inside",
        })
        .webp({
          quality: CONFIG.quality,
          effort: 6, // Max compression effort
          smartSubsample: true,
        })
        .toFile(outputPath);

      // Get new size
      const newStats = await fs.stat(outputPath);
      const newSize = newStats.size;
      const saved = originalSize - newSize;

      totalSaved += Math.max(0, saved);

      const originalKB = (originalSize / 1024).toFixed(0);
      const newKB = (newSize / 1024).toFixed(0);
      const savedPercent = saved > 0 ? ((saved / originalSize) * 100).toFixed(0) : 0;

      console.log(
        `✓ ${file}: ${originalKB}KB → ${newKB}KB (${saved > 0 ? `-${savedPercent}%` : "no change"})`
      );
      console.log(`  Output: ${outputPath}`);
    } catch (error) {
      console.error(`✗ Errore con ${file}:`, error.message);
    }
  }

  const totalKB = (totalSaved / 1024).toFixed(0);
  console.log(`\n🎉 Totale risparmiato: ${totalKB} KB`);
  console.log("\n📝 Rinomina manualmente i file -opt.webp dopo aver fermato il dev server:");
  console.log("   hero-1-opt.webp → hero-1.webp");
  console.log("   hero-2-opt.webp → hero-2.webp");
  console.log("   hero-3-opt.webp → hero-3.webp");
}

compressHeroImages().catch(console.error);
