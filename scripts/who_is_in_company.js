const fs = require('fs');
const html = fs.readFileSync('scripts/company_linkedin.html', 'utf8');

const img2 = '1614757359556';
const img4 = '1621687585542';

[img2, img4].forEach(target => {
  const idx = html.indexOf(target);
  if (idx !== -1) {
    console.log(`\nContext around ${target}:`);
    console.log(html.substring(Math.max(0, idx - 400), Math.min(html.length, idx + 400)));
  }
});
