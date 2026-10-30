const fs = require('fs');
const html = fs.readFileSync('scripts/muhammad-ashfaq.html', 'utf8');

const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>|<img[^>]+data-delayed-url=["']([^"']+)["'][^>]*>/gi;
let match;
console.log('All images in muhammad-ashfaq.html:');
while ((match = regex.exec(html)) !== null) {
  const tag = match[0];
  const url = match[1] || match[2];
  if (!url.includes('aero-v1') && !url.includes('company-logo')) {
    console.log('---');
    console.log('URL:', url);
    const alt = tag.match(/alt=["']([^"']*)["']/i);
    console.log('ALT:', alt ? alt[1] : '');
  }
}
