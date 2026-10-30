const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const targets = [
  { slug: 'muhammad-ashfaq', url: 'https://www.linkedin.com/in/muhammad-ashfaq-ank/' },
  { slug: 'muhammad-awais-memon', url: 'https://www.linkedin.com/in/muhammad-awais-memon/' },
  { slug: 'muhammad-kamran-shafi', url: 'https://www.linkedin.com/in/muhammad-kamran-shafi-6961a452/' },
  { slug: 'muhammad-akhtar', url: 'https://www.linkedin.com/in/muhammad-akhtar-acca-ca-f-49642563/' },
  { slug: 'mazhar-acca', url: 'https://www.linkedin.com/in/mazharacca/' }
];

function fetchPage(url, maxRedirects = 5) {
  return new Promise((resolve) => {
    if (maxRedirects <= 0) return resolve({ error: 'Too many redirects' });
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache'
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
      res.on('end', () => {
        resolve({ status: res.statusCode, data, finalUrl: url });
      });
    });
    req.on('error', (err) => resolve({ error: err.message }));
  });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        'Referer': 'https://www.linkedin.com/'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, destPath).then(resolve).catch(reject);
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
    });
    req.on('error', (err) => resolve({ success: false, error: err.message }));
  });
}

async function run() {
  const outputDir = path.join(__dirname, '../frontend/public/images/team');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const results = [];

  for (const t of targets) {
    console.log(`\n========================================`);
    console.log(`Fetching: ${t.slug} (${t.url})`);
    const res = await fetchPage(t.url);
    if (res.error || !res.data) {
      console.log(`Failed to fetch ${t.slug}:`, res.error || res.status);
      results.push({ slug: t.slug, error: res.error || res.status });
      continue;
    }

    const titleMatch = res.data.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].replace('&amp;', '&').trim() : '';

    const ogTitleMatch = res.data.match(/<meta\s+property=["']og:title["']\s+content=["']([^"']+)["']/i) ||
                         res.data.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:title["']/i);
    const ogDescMatch = res.data.match(/<meta\s+property=["']og:description["']\s+content=["']([^"']+)["']/i) ||
                        res.data.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:description["']/i);
    const ogImageMatch = res.data.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i) ||
                         res.data.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);

    const ogTitle = ogTitleMatch ? ogTitleMatch[1].replace(/&amp;/g, '&') : '';
    const ogDesc = ogDescMatch ? ogDescMatch[1].replace(/&amp;/g, '&') : '';
    let ogImage = ogImageMatch ? ogImageMatch[1].replace(/&amp;/g, '&') : '';

    console.log('Title:', title);
    console.log('og:title:', ogTitle);
    console.log('og:description:', ogDesc);
    console.log('og:image:', ogImage);

    // Also look for ld+json
    const ldJsonMatches = res.data.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi) || [];
    let parsedLd = null;
    for (const ld of ldJsonMatches) {
      try {
        const jsonContent = ld.replace(/<script[^>]*>/, '').replace(/<\/script>/, '');
        const data = JSON.parse(jsonContent);
        console.log('Found LD+JSON:', JSON.stringify(data, null, 2));
        parsedLd = data;
      } catch (e) {}
    }

    let downloadedImagePath = null;
    if (ogImage && !ogImage.includes('static.licdn.com/aero-v1/sc/h/')) { // not a placeholder ghost icon
      const destFile = path.join(outputDir, `${t.slug}.jpg`);
      console.log(`Downloading image to ${destFile}...`);
      const imgRes = await downloadImage(ogImage, destFile);
      if (imgRes.success) {
        console.log(`Successfully saved: ${destFile}`);
        downloadedImagePath = `/images/team/${t.slug}.jpg`;
      } else {
        console.log(`Failed to download image:`, imgRes);
      }
    } else {
      console.log(`og:image is missing or default ghost placeholder.`);
    }

    results.push({
      slug: t.slug,
      url: t.url,
      title,
      ogTitle,
      ogDesc,
      ogImage,
      downloadedImagePath,
      parsedLd
    });
  }

  fs.writeFileSync(path.join(__dirname, 'team_scrape_results.json'), JSON.stringify(results, null, 2));
  console.log('\nAll done! Saved to scripts/team_scrape_results.json');
}

run();
