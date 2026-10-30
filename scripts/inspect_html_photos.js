const fs = require('fs');

function inspectProfile(slug) {
  const html = fs.readFileSync(`scripts/${slug}.html`, 'utf8');
  console.log(`\n=================== ${slug} ===================`);
  
  // Find author image or main profile image in HTML
  // In LinkedIn public profile, main photo is often in top-card-layout or similar
  const topCardImg = html.match(/class="[^"]*top-card[^"]*"[\s\S]*?<img[^>]+src="([^">]+)"/i) ||
                     html.match(/<img[^>]+class="[^"]*(?:profile|avatar|top-card__profile-image)[^"]*"[^>]+src="([^">]+)"/i) ||
                     html.match(/class="[^"]*(?:profile|avatar|top-card__profile-image)[^"]*"[^>]+data-delayed-url="([^">]+)"/i);

  if (topCardImg) {
    console.log('Top card image:', topCardImg[1]);
  } else {
    console.log('No top card image matched directly.');
  }

  // Look for any <img> tag with "profile" or author in alt
  const imgTags = html.match(/<img[^>]+>/gi) || [];
  imgTags.forEach(img => {
    if (img.includes('profile') || img.includes('avatar') || img.includes('photo') || img.includes('Ashfaq') || img.includes('Kamran') || img.includes('Mazhar')) {
      console.log('Candidate img tag:', img);
    }
  });

  // Also check JSON-LD Person object
  const jsonLds = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const j of jsonLds) {
    const raw = j.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    try {
      const data = JSON.parse(raw);
      if (data['@type'] === 'Person' && data.image) {
        console.log('JSON-LD Person Image:', data.image);
      }
      if (data['@graph']) {
        for (const item of data['@graph']) {
          if (item['@type'] === 'Person' && item.image) {
            console.log('JSON-LD Graph Person Image:', item.image);
          }
        }
      }
    } catch(e) {}
  }
}

inspectProfile('muhammad-ashfaq');
inspectProfile('muhammad-kamran-shafi');
inspectProfile('mazhar-acca');
