const fs = require('fs');

['muhammad-kamran-shafi', 'mazhar-acca'].forEach(slug => {
  const html = fs.readFileSync(`scripts/${slug}.html`, 'utf8');
  console.log(`\n================== ${slug} ==================`);
  const regex = /<img[^>]+src=["']([^"']+)["'][^>]*>|<img[^>]+data-delayed-url=["']([^"']+)["'][^>]*>/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const tag = match[0];
    const url = match[1] || match[2];
    if (url.includes('profile-displayphoto')) {
      const alt = tag.match(/alt=["']([^"']*)["']/i);
      console.log('URL:', url);
      console.log('ALT:', alt ? alt[1] : 'no alt');
      // context around match
      const start = Math.max(0, match.index - 100);
      const end = Math.min(html.length, match.index + 200);
      console.log('Context:', html.substring(start, end).replace(/\s+/g, ' '));
      console.log('---');
    }
  }
});
