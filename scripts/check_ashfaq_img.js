const fs = require('fs');
const html = fs.readFileSync('scripts/muhammad-ashfaq.html', 'utf8');

const targetUrl = '1728850173082';
const idx = html.indexOf(targetUrl);
if (idx !== -1) {
  console.log('Context around targetUrl in muhammad-ashfaq:');
  console.log(html.substring(Math.max(0, idx - 300), Math.min(html.length, idx + 300)));
} else {
  console.log('Not found');
}
