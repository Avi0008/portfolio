const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sequenceDir = path.join(__dirname, '../public/sequence');

async function convertSequence() {
  console.log('Optimizing sequence images (960x540 WebP)...');
  const files = fs.readdirSync(sequenceDir).filter(f => f.endsWith('.png'));
  console.log(`Found ${files.length} PNG files to optimize.`);

  let totalOriginalSize = 0;
  let totalWebpSize = 0;

  for (const file of files) {
    const pngPath = path.join(sequenceDir, file);
    const webpName = file.replace('.png', '.webp');
    const webpPath = path.join(sequenceDir, webpName);

    const originalStats = fs.statSync(pngPath);
    totalOriginalSize += originalStats.size;

    await sharp(pngPath)
      .resize(960, 540, { fit: 'inside' })
      .webp({ quality: 68, effort: 4 })
      .toFile(webpPath);

    const webpStats = fs.statSync(webpPath);
    totalWebpSize += webpStats.size;
  }

  const origMB = (totalOriginalSize / (1024 * 1024)).toFixed(2);
  const webpMB = (totalWebpSize / (1024 * 1024)).toFixed(2);
  const reduction = (((totalOriginalSize - totalWebpSize) / totalOriginalSize) * 100).toFixed(1);

  console.log(`Optimization completed successfully!`);
  console.log(`Original Total: ${origMB} MB`);
  console.log(`Optimized WebP Total: ${webpMB} MB (${(totalWebpSize / files.length / 1024).toFixed(1)} KB per frame)`);
  console.log(`Payload Reduction: ${reduction}%`);
}

convertSequence().catch(err => {
  console.error('Error converting images:', err);
  process.exit(1);
});
