const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SERVICES_DIR = './public/images/services';
const OUTPUT_DIR = './public/images/services';

// Responsive breakpoints
const SIZES = [640, 1024, 1920];
const QUALITY = 80;

async function getImageInfo(filepath) {
  try {
    const metadata = await sharp(filepath).metadata();
    return metadata;
  } catch (e) {
    return null;
  }
}

async function optimizeImage(filename) {
  const inputPath = path.join(SERVICES_DIR, filename);
  const baseName = path.parse(filename).name;
  const ext = path.parse(filename).ext.toLowerCase();

  // Skip broken files (< 100 bytes)
  const stats = fs.statSync(inputPath);
  if (stats.size < 100) {
    console.log(`Skipping ${filename} (broken/empty file)`);
    return;
  }

  const metadata = await getImageInfo(inputPath);
  if (!metadata) {
    console.log(`Could not read ${filename}`);
    return;
  }

  console.log(`\nProcessing: ${filename}`);
  console.log(`  Original: ${metadata.width}x${metadata.height}, ${(stats.size / 1024).toFixed(0)} KB`);

  // Create optimized versions for each size
  for (const width of SIZES) {
    // Skip if original is smaller than target width
    if (metadata.width < width) continue;

    const outputFilename = `${baseName}-${width}w.webp`;
    const outputPath = path.join(OUTPUT_DIR, outputFilename);

    await sharp(inputPath)
      .resize(width, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    console.log(`  Created: ${outputFilename} (${(newStats.size / 1024).toFixed(0)} KB)`);
  }

  // Also create an optimized version at original aspect ratio (max 1920w) as default
  const defaultOutput = path.join(OUTPUT_DIR, `${baseName}-optimized.webp`);
  await sharp(inputPath)
    .resize(1920, null, {
      withoutEnlargement: true,
      fit: 'inside'
    })
    .webp({ quality: QUALITY })
    .toFile(defaultOutput);

  const defaultStats = fs.statSync(defaultOutput);
  console.log(`  Default: ${baseName}-optimized.webp (${(defaultStats.size / 1024).toFixed(0)} KB)`);
}

async function main() {
  console.log('=== Image Optimization Script ===\n');

  const files = fs.readdirSync(SERVICES_DIR)
    .filter(f => /\.(webp|jpg|jpeg|png)$/i.test(f))
    .filter(f => !f.includes('-640w') && !f.includes('-1024w') && !f.includes('-1920w') && !f.includes('-optimized'));

  console.log(`Found ${files.length} images to process`);

  let totalSaved = 0;

  for (const file of files) {
    const inputPath = path.join(SERVICES_DIR, file);
    const originalSize = fs.statSync(inputPath).size;

    await optimizeImage(file);

    // Calculate savings for the optimized default
    const baseName = path.parse(file).name;
    const optimizedPath = path.join(OUTPUT_DIR, `${baseName}-optimized.webp`);
    if (fs.existsSync(optimizedPath)) {
      const newSize = fs.statSync(optimizedPath).size;
      const saved = originalSize - newSize;
      if (saved > 0) {
        totalSaved += saved;
        console.log(`  Saved: ${(saved / 1024).toFixed(0)} KB (${((saved / originalSize) * 100).toFixed(0)}%)`);
      }
    }
  }

  console.log(`\n=== TOTAL SAVINGS: ${(totalSaved / 1024 / 1024).toFixed(2)} MB ===`);
}

main().catch(console.error);
