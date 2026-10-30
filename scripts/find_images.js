const fs = require('fs');
['muhammad-ashfaq', 'muhammad-kamran-shafi', 'mazhar-acca'].forEach(slug => {
  const file = `scripts/${slug}.html`;
  if (fs.existsSync(file)) {
    const html = fs.readFileSync(file, 'utf8');
    const mediaUrls = html.match(/https:\/\/[a-z0-9\.\/-]*licdn\.com\/[^\s\"\'\<\>]+/g) || [];
    const unique = [...new Set(mediaUrls)].filter(u => !u.includes('aero-v1'));
    console.log(`\n${slug} licdn images found: ${unique.length}`);
    unique.slice(0, 10).forEach(u => console.log('  ', u));
  }
});
