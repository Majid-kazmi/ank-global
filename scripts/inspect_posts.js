const fs = require('fs');

['muhammad-kamran-shafi', 'mazhar-acca'].forEach(slug => {
  const html = fs.readFileSync(`scripts/${slug}.html`, 'utf8');
  console.log(`\n================== ${slug} ==================`);
  
  // Find all posts or articles in json-ld
  const jsonLds = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
  for (const j of jsonLds) {
    const raw = j.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
    try {
      const data = JSON.parse(raw);
      if (data['@graph']) {
        data['@graph'].forEach(item => {
          if (item['@type'] === 'DiscussionForumPosting' || item['@type'] === 'Article') {
            console.log('Post:', item.headline || item.text ? (item.text || item.headline).slice(0, 150) : '');
            if (item.image) console.log('Post image:', item.image);
          }
        });
      }
    } catch(e) {}
  }
});
