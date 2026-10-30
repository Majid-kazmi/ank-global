const https = require('https');
const fs = require('fs');
const path = require('path');

const profiles = [
  { slug: 'muhammad-ashfaq', url: 'https://www.linkedin.com/in/muhammad-ashfaq-ank/' },
  { slug: 'muhammad-awais-memon', url: 'https://www.linkedin.com/in/muhammad-awais-memon/' },
  { slug: 'muhammad-kamran-shafi', url: 'https://www.linkedin.com/in/muhammad-kamran-shafi-6961a452/' },
  { slug: 'muhammad-akhtar', url: 'https://www.linkedin.com/in/muhammad-akhtar-acca-ca-f-49642563/' },
  { slug: 'mazhar-acca', url: 'https://www.linkedin.com/in/mazharacca/' }
];

function fetchWithUA(url, ua = 'Twitterbot/1.0', maxRedirects = 5) {
  return new Promise((resolve) => {
    if (maxRedirects <= 0) return resolve({ error: 'Too many redirects' });
    const req = https.get(url, {
      headers: {
        'User-Agent': ua,
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
        return resolve(fetchWithUA(nextUrl, ua, maxRedirects - 1));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, finalUrl: url }));
    });
    req.on('error', err => resolve({ error: err.message }));
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(downloadImage(res.headers.location, destPath));
      }
      if (res.statusCode !== 200) {
        return resolve({ success: false, status: res.statusCode });
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve({ success: true, path: destPath });
      });
    }).on('error', err => resolve({ success: false, error: err.message }));
  });
}

async function run() {
  const outputDir = path.join(__dirname, '../frontend/public/images/team');
  const details = [];

  for (const p of profiles) {
    console.log(`\n================== Fetching ${p.slug} ==================`);
    const res = await fetchWithUA(p.url);
    console.log('Status:', res.status, 'Final URL:', res.finalUrl);
    if (!res.data) continue;

    fs.writeFileSync(path.join(__dirname, `${p.slug}.html`), res.data);

    const titleMatch = res.data.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : '';

    const ogTitleMatch = res.data.match(/<meta\s+(?:property|name)=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                         res.data.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:title["']/i);
    const ogDescMatch = res.data.match(/<meta\s+(?:property|name)=["']og:description["']\s+content=["']([^"']+)["']/i) ||
                        res.data.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:description["']/i);
    const ogImageMatch = res.data.match(/<meta\s+(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                         res.data.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["']og:image["']/i);

    const ogTitle = ogTitleMatch ? ogTitleMatch[1] : '';
    const ogDesc = ogDescMatch ? ogDescMatch[1] : '';
    const ogImage = ogImageMatch ? ogImageMatch[1].replace(/&amp;/g, '&') : '';

    console.log('og:title:', ogTitle);
    console.log('og:description:', ogDesc);
    console.log('og:image:', ogImage);

    // Look for ld+json or profile data
    const ldJsonMatches = res.data.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    let ldData = null;
    for (const ld of ldJsonMatches) {
      try {
        const jsonContent = ld.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
        ldData = JSON.parse(jsonContent);
      } catch (e) {}
    }

    let localImagePath = null;
    if (ogImage && !ogImage.includes('static.licdn.com/aero-v1/sc/h/')) {
      const destPath = path.join(outputDir, `${p.slug}.jpg`);
      const imgRes = await downloadImage(ogImage, destPath);
      if (imgRes.success) {
        console.log(`Saved image to: ${destPath}`);
        localImagePath = `/images/team/${p.slug}.jpg`;
      }
    }

    details.push({
      slug: p.slug,
      url: p.url,
      title,
      ogTitle,
      ogDesc,
      ogImage,
      localImagePath,
      ldData
    });
  }

  fs.writeFileSync(path.join(__dirname, 'profiles_bot_summary.json'), JSON.stringify(details, null, 2));
  console.log('\nFinished all profiles!');
}

run();
