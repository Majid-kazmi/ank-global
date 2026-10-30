const fs = require('fs');
const html = fs.readFileSync('scripts/mazhar-acca.html', 'utf8');

const target = '7227287339646017537';
const idx = html.indexOf(target);
if (idx !== -1) {
  console.log('Context of announcement post:');
  console.log(html.substring(Math.max(0, idx - 200), Math.min(html.length, idx + 1500)));
}
