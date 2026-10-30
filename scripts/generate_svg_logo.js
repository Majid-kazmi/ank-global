const potrace = require('../frontend/node_modules/potrace');
const fs = require('fs');
const path = require('path');

function traceMask(maskFile) {
  return new Promise((resolve, reject) => {
    potrace.trace(maskFile, {
      threshold: 128,
      optCurve: true,
      optTolerance: 0.3,
      turnPolicy: potrace.Potrace.TURNPOLICY_MINORITY
    }, (err, svg) => {
      if (err) reject(err);
      else {
        const match = svg.match(/<path\s+d="([^"]+)"/i);
        resolve(match ? match[1] : '');
      }
    });
  });
}

async function run() {
  const brandDir = path.resolve(__dirname, '../frontend/public/images/brand');
  const maskRed = path.join(brandDir, 'mask_red_inv.png');
  const maskGold = path.join(brandDir, 'mask_gold_inv.png');
  const maskBlack = path.join(brandDir, 'mask_black_inv.png');

  console.log('Tracing masks...');
  const redPath = await traceMask(maskRed);
  const goldPath = await traceMask(maskGold);
  const blackPath = await traceMask(maskBlack);

  console.log('Red path length:', redPath.length);
  console.log('Gold path length:', goldPath.length);
  console.log('Black path length:', blackPath.length);

  // 1. Primary Full Logo (Light background)
  const fullSvgLight = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 211" width="800" height="211" fill="none">
  <path d="${redPath}" fill="#CD0001" />
  <path d="${goldPath}" fill="#F1C332" />
  <path d="${blackPath}" fill="#111827" />
</svg>
`;

  // 2. Full Logo (Dark background, white text)
  const fullSvgDark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 211" width="800" height="211" fill="none">
  <path d="${redPath}" fill="#E53935" />
  <path d="${goldPath}" fill="#F6D04C" />
  <path d="${blackPath}" fill="#FFFFFF" />
</svg>
`;

  // 3. Mark / Icon only (for favicon, mobile mark, badges)
  const emblemSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 211" width="220" height="211" fill="none">
  <path d="${redPath}" fill="#CD0001" />
  <path d="${goldPath}" fill="#F1C332" />
</svg>
`;

  // 4. White Mark (for dark backgrounds)
  const emblemSvgDark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 211" width="220" height="211" fill="none">
  <path d="${redPath}" fill="#E53935" />
  <path d="${goldPath}" fill="#F6D04C" />
</svg>
`;

  fs.writeFileSync(path.join(brandDir, 'ank-logo.svg'), fullSvgLight, 'utf8');
  fs.writeFileSync(path.join(brandDir, 'ank-logo-white.svg'), fullSvgDark, 'utf8');
  fs.writeFileSync(path.join(brandDir, 'ank-mark.svg'), emblemSvg, 'utf8');
  fs.writeFileSync(path.join(brandDir, 'ank-mark-white.svg'), emblemSvgDark, 'utf8');

  // Also copy main logo to root /images/logo.svg and /images/logo-white.svg for convenience
  const imagesDir = path.resolve(__dirname, '../frontend/public/images');
  fs.writeFileSync(path.join(imagesDir, 'logo.svg'), fullSvgLight, 'utf8');
  fs.writeFileSync(path.join(imagesDir, 'logo-white.svg'), fullSvgDark, 'utf8');
  fs.writeFileSync(path.join(imagesDir, 'favicon.svg'), emblemSvg, 'utf8');

  console.log('Generated all authentic vector SVGs successfully!');
}

run().catch(console.error);
