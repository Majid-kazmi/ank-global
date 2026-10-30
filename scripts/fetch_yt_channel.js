const https = require('https');

function fetchPage(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data }));
    }).on('error', err => resolve({ error: err.message }));
  });
}

async function run() {
  const res = await fetchPage('https://www.youtube.com/@ANKGlobalCharteredAccountants/videos');
  if (res.data) {
    const videoMatches = res.data.match(/"videoId":"([a-zA-Z0-9_-]{11})"/g) || [];
    const uniqueIds = [...new Set(videoMatches.map(m => m.split('"')[3]))];
    console.log('Video IDs:', uniqueIds);

    const titleMatches = res.data.match(/"title":\{"runs":\[\{"text":"([^"]+)"\}\]/g) || [];
    console.log('Title matches:', titleMatches.slice(0, 10));
  }
}

run();
