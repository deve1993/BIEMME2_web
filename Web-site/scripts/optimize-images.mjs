/**
 * Script per ottimizzare le immagini in public/img/
 * Converte JPG/PNG in WebP con compressione e ridimensionamento
 */

import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgDir = path.join(__dirname, "..", "public", "img");

// Configurazione ottimizzazione
const CONFIG = {
  maxWidth: 1920, // Max larghezza per desktop
  quality: 80, // Qualità WebP (0-100)
  // Non creiamo versioni multiple, Next.js Image le genera automaticamente
};

async function optimizeImages() {
  console.log("🖼️  Ottimizzazione immagini in corso...\n");

  const files = await fs.readdir(imgDir);
  const imageFiles = files.filter((f) =>
    /\.(jpg|jpeg|png)$/i.test(f) && !f.includes("-backup")
  );

  if (imageFiles.length === 0) {
    console.log("✅ Nessuna immagine JPG/PNG da ottimizzare");
    return;
  }

  let totalSaved = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(imgDir, file);
    const baseName = path.basename(file, path.extname(file));
    const outputPath = path.join(imgDir, `${baseName}.webp`);
    const backupPath = path.join(imgDir, `${baseName}-backup${path.extname(file)}`);

    try {
      // Get original file size
      const originalStats = await fs.stat(inputPath);
      const originalSize = originalStats.size;

      // Ottieni metadata immagine
      const metadata = await sharp(inputPath).metadata();

      // Ridimensiona solo se più larga di maxWidth
      let pipeline = sharp(inputPath);

      if (metadata.width && metadata.width > CONFIG.maxWidth) {
        pipeline = pipeline.resize(CONFIG.maxWidth, null, {
          withoutEnlargement: true,
          fit: "inside",
        });
      }

      // Converti a WebP
      await pipeline
        .webp({ quality: CONFIG.quality })
        .toFile(outputPath);

      // Get new file size
      const newStats = await fs.stat(outputPath);
      const newSize = newStats.size;
      const saved = originalSize - newSize;
      totalSaved += saved;

      // Rinomina originale come backup
      await fs.rename(inputPath, backupPath);

      const originalMB = (originalSize / 1024 / 1024).toFixed(2);
      const newKB = (newSize / 1024).toFixed(0);
      const savedPercent = ((saved / originalSize) * 100).toFixed(0);

      console.log(
        `✓ ${file} (${originalMB} MB) → ${baseName}.webp (${newKB} KB) [-${savedPercent}%]`
      );
    } catch (error) {
      console.error(`✗ Errore con ${file}:`, error.message);
    }
  }

  const totalMB = (totalSaved / 1024 / 1024).toFixed(2);
  console.log(`\n🎉 Totale risparmiato: ${totalMB} MB`);
  console.log("\n⚠️  I file originali sono stati rinominati con suffisso -backup");
  console.log("   Eliminarli manualmente dopo aver verificato che tutto funzioni.");
}

optimizeImages().catch(console.error);
