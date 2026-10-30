const https = require('https');

const videoIds = [
  'N6FHLDwyHpk', 'srM98aOpwmw', 'kQNY5XRv4Bk',
  'ng1nf2118mU', 'SNN15eKtThA', 'HNUXFgYHcb8',
  'kR28fEdWGYg', 'hTgA-tnkS6I', 'fPG9tGSQmMQ',
  'BTwxFZe33Oo', '3K_uODyUKaU', 'JBX0aMqfCIE',
  'rwQzlXBubMs', 'O76iIpR4JDM'
];

function getTitle(id) {
  return new Promise((resolve) => {
    https.get(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${id}`, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          resolve({ id, title: json.title, author: json.author_name });
        } catch(e) { resolve({ id, title: 'err' }); }
      });
    }).on('error', () => resolve({ id, title: 'err' }));
  });
}

async function run() {
  for (const id of videoIds) {
    const res = await getTitle(id);
    console.log(res.id, ':', res.title);
  }
}

run();
