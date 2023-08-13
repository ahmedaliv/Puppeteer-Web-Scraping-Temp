const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const urls = [
    // List of URLs to scrape
    'https://example.com/page1',
    'https://example.com/page2',
    // Add more URLs here
  ];

  const scrapedData = [];

  for (const url of urls) {
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const titleSelector = 'TITLE_SELECTOR';
    const titleElement = await page.$(titleSelector);
    const title = titleElement ? await (await titleElement.getProperty('textContent')).jsonValue() : null;

    const descriptionSelector = 'DESCRIPTION_SELECTOR';
    const descriptionElement = await page.$(descriptionSelector);
    const description = descriptionElement ? await (await descriptionElement.getProperty('textContent')).jsonValue() : null;


    scrapedData.push({
      url,
      title,
      description,
    });

    await page.waitForTimeout(2000); // Delay to prevent aggressive scraping and detection

    console.log(`Scraped data for ${url}:`, { title, description });
  }

  console.log('Scraped data:', scrapedData);

  await browser.close();
})();
