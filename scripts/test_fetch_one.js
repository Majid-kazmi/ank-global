const https = require('https');

function fetchPage(url, maxRedirects = 5) {
  return new Promise((resolve) => {
    if (maxRedirects <= 0) return resolve({ error: 'Too many redirects' });
    const req = https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    }, (res) => {
      console.log('Got response code:', res.statusCode, 'from:', url);
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let nextUrl = res.headers.location;
        if (nextUrl.startsWith('/')) {
          const u = new URL(url);
          nextUrl = u.protocol + '//' + u.host + nextUrl;
        }
        console.log('Redirecting to:', nextUrl);
        return resolve(fetchPage(nextUrl, maxRedirects - 1));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', (err) => resolve({ error: err.message }));
  });
}

async function main() {
  const url = process.argv[2] || 'https://www.linkedin.com/in/muhammad-ashfaq-ank/';
  const res = await fetchPage(url);
  console.log('Status:', res.status, 'Data length:', res.data ? res.data.length : 0);
  if (res.data) {
    const titleMatch = res.data.match(/<title>([^<]+)<\/title>/);
    console.log('Title:', titleMatch ? titleMatch[1] : 'none');
    const metas = res.data.match(/<meta[^>]+>/g) || [];
    metas.filter(m => m.includes('og:') || m.includes('twitter:') || m.includes('description')).forEach(m => console.log('Meta:', m));
  }
}

main();
