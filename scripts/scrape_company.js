const https = require('https');
const fs = require('fs');

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
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let nextUrl = res.headers.location;
        if (nextUrl.startsWith('/')) {
          const u = new URL(url);
          nextUrl = `${u.protocol}//${u.host}${nextUrl}`;
        }
        return resolve(fetchPage(nextUrl, maxRedirects - 1));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    });
    req.on('error', (err) => resolve({ error: err.message }));
  });
}

async function run() {
  const company = await fetchPage('https://www.linkedin.com/company/ank-global-chartered-accountants/');
  if (company.data) {
    fs.writeFileSync('scripts/company_linkedin.html', company.data);
    console.log('Saved company html length:', company.data.length);

    // Look for names or employees or posts
    const jsonLd = company.data.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    jsonLd.forEach((j, i) => fs.writeFileSync(`scripts/company_jsonld_${i}.json`, j));
    console.log('Found jsonLd count:', jsonLd.length);
  }
}

run();
