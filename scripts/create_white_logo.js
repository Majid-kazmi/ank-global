const fs = require('fs');
const path = require('path');

const srcPath = path.resolve(__dirname, '../logos/ANK Global Growth Partner Logo.svg');
let svg = fs.readFileSync(srcPath, 'utf8');

// Replace tagline fill="#333" with #ffffff
svg = svg.replace(/fill="#333"/g, 'fill="#ffffff"');
svg = svg.replace(/stroke="#333"/g, 'stroke="#ffffff"');

// Split by <g> to identify the ANK GLOBAL text group (second <g>)
const parts = svg.split('<g>');
if (parts.length >= 3) {
  parts[2] = parts[2].replace(/fill="#dc0006"/g, 'fill="#ffffff"');
}
const whiteSvg = parts.join('<g>');

const out1 = path.resolve(__dirname, '../frontend/public/images/brand/ank-logo-white.svg');
const out2 = path.resolve(__dirname, '../frontend/public/images/logo-white.svg');

fs.writeFileSync(out1, whiteSvg, 'utf8');
fs.writeFileSync(out2, whiteSvg, 'utf8');
console.log('Successfully wrote white SVG logo to:');
console.log(out1);
console.log(out2);
