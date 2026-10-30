const fs = require('fs');
if (fs.existsSync('scripts/company_linkedin.html')) {
  const html = fs.readFileSync('scripts/company_linkedin.html', 'utf8');
  console.log('Company html size:', html.length);
  
  // Search for mentions of Ashfaq, Kamran, Shafi, Mazhar, Akhtar, Awais
  ['Ashfaq', 'Kamran', 'Shafi', 'Mazhar', 'Akhtar', 'Awais'].forEach(name => {
    const regex = new RegExp(`(?:[\\s\\S]{0,100})${name}(?:[\\s\\S]{0,100})`, 'gi');
    const matches = html.match(regex) || [];
    console.log(`\nMentions of ${name}:`, matches.length);
    matches.slice(0, 3).forEach(m => console.log('  ...', m.replace(/\s+/g, ' '), '...'));
  });

  // Extract all media.licdn.com images in company page
  const mediaUrls = html.match(/https:\/\/[a-z0-9\.\/-]*licdn\.com\/[^\s\"\'\<\>]+/g) || [];
  const unique = [...new Set(mediaUrls)].filter(u => !u.includes('aero-v1') && !u.includes('company-logo'));
  console.log('\nUnique images in company page:', unique.length);
  unique.forEach(u => console.log('  ', u));
} else {
  console.log('company_linkedin.html does not exist');
}
