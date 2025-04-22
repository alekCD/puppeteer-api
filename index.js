const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  try {
    const url = process.argv[2] || 'https://analytics.zoho.com/open-view/3029039000000579437';

    if (!/^https?:\/\//.test(url)) {
      throw new Error('Invalid URL. Must start with http:// or https://');
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const defaultPath = `screenshot-${timestamp}.png`;
    const path = "/Users/alekdanielsy/Library/CloudStorage/GoogleDrive-alek@cleardesk.com/My Drive/Pending Placements Screenshots/" + defaultPath;

    // const browser = await puppeteer.launch({ headless: "new" });
    const browser = await puppeteer.launch({
  headless: "new",
  args: ['--no-sandbox', '--disable-setuid-sandbox']
});
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 5000)); // ⏳ wait 5 seconds

    await page.screenshot({ path, fullPage: true });

    await browser.close();

    console.log(`✅ Screenshot saved to: ${path}`);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
})();
