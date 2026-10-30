const fs = require('fs');
const html = fs.readFileSync('scripts/muhammad-akhtar.html', 'utf8');

const regex = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi;
let match;
while ((match = regex.exec(html)) !== null) {
  try {
    const data = JSON.parse(match[1]);
    console.log(JSON.stringify(data, null, 2));
  } catch(e) {}
}
