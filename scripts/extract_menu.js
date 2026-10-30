const https = require('https');

https.get('https://ankglobal.co/', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Search for elementskit-menu or wp-nav-menu or elementskit-navbar-nav
    const regex = /<li[^>]*class="[^"]*menu-item[^"]*"[^>]*>[\s\S]*?<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    const seen = new Set();
    while ((match = regex.exec(data)) !== null) {
      const url = match[1];
      const title = match[2].replace(/<[^>]+>/g, '').trim();
      if (title && !seen.has(url + title)) {
        seen.add(url + title);
        console.log(`${title} => ${url}`);
      }
    }
  });
}).on('error', console.error);
