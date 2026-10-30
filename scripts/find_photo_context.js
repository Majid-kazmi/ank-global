const fs = require('fs');

['muhammad-kamran-shafi', 'mazhar-acca'].forEach(slug => {
  const html = fs.readFileSync(`scripts/${slug}.html`, 'utf8');
  console.log(`\n================== ${slug} ==================`);
  const urls = html.match(/https:\/\/[a-z0-9\.\/-]*licdn\.com\/[^\s\"\'\<\>]+/g) || [];
  const profilePhotos = [...new Set(urls)].filter(u => u.includes('profile-displayphoto'));
  profilePhotos.forEach(u => {
    const cleanUrl = u.split('&amp;')[0];
    const idx = html.indexOf(u.substring(0, 50));
    console.log('Photo URL:', u);
    if (idx !== -1) {
      console.log('Context:', html.substring(Math.max(0, idx - 150), Math.min(html.length, idx + 250)).replace(/\s+/g, ' '));
    }
  });
});
