const https = require('https');

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function test() {
  const pages = ['https://ankglobal.co/about-us/', 'https://ankglobal.co/team/', 'https://ankglobal.co/our-team/'];
  for (const page of pages) {
    const res = await fetchPage(page);
    console.log(page, 'Status:', res.status, 'Len:', res.data ? res.data.length : 0);
    if (res.data) {
      const imgs = res.data.match(/<img[^>]+src=["'][^"']+["'][^>]*>/gi) || [];
      console.log('Images found:', imgs.length);
      imgs.slice(0, 10).forEach(i => console.log('  ', i));
    }
  }
}
test();
