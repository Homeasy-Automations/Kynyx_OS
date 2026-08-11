const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');

// 1. Define your website domain
const BASE_URL = 'https://kynyx.com';

// 2. List all of your static routes
const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/services', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.5 },
];

async function generateSitemap() {
  try {
    const stream = new SitemapStream({ hostname: BASE_URL });
   
    // Write links to the stream
    links.forEach(link => stream.write(link));
    stream.end();

    // Convert stream to standard XML string
    const sitemapOutput = await streamToPromise(stream);
   
    // Define the public folder path where React looks for static assets
    const publicPath = path.join(__dirname, 'public', 'sitemap.xml');
   
    // Save the file
    fs.writeFileSync(publicPath, sitemapOutput.toString());
    console.log('✅ Sitemap generated successfully in the public folder!');
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
  }
}

generateSitemap();
