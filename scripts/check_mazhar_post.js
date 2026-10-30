const fs = require('fs');
const html = fs.readFileSync('scripts/mazhar-acca.html', 'utf8');

const target = 'delighted to announce';
const idx = html.indexOf(target);
if (idx !== -1) {
  console.log('Post text:');
  console.log(html.substring(Math.max(0, idx - 100), Math.min(html.length, idx + 800)));
}
