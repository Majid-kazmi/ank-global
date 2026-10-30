const fs = require('fs');
const html = fs.readFileSync('scripts/company_linkedin.html', 'utf8');

// Print company jsonld
const jsonld = fs.readFileSync('scripts/company_jsonld_0.json', 'utf8');
console.log('JSONLD:', jsonld.slice(0, 1000));

// Find any updates, posts or people mentioned
const regex = /data-feed-entity-id="[^"]*"|urn:li:activity:[0-9]+/g;
const activities = html.match(regex);
console.log('Activities found:', activities ? activities.length : 0);

// Find all anchor links to people /in/
const inLinks = html.match(/href="https:\/\/[a-z.]*linkedin\.com\/in\/[^"]+"/g) || [];
console.log('In links:', [...new Set(inLinks)]);
