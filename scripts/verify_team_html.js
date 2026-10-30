const fs = require('fs');
const html = fs.readFileSync('frontend/out/team/index.html', 'utf8');
const names = ['Naffar Hussain', 'Muhammad Ashfaq', 'Muhammad Awais Memon', 'Muhammad Kamran Shafi', 'Muhammad Akhtar', 'Mazhar Bashir'];
names.forEach(name => {
  console.log(name, 'present in team/index.html:', html.includes(name));
});
const imgs = html.match(/\/ank-global\/images\/team\/[^"]+/g) || [];
console.log('Team images referenced in team/index.html:', [...new Set(imgs)]);
