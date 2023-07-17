const Article = require("../models/scraper.model");

async function scrapeNation(browser) {
  console.log("   Nation Africa scraping...");
  const page = await browser.then((browser) => browser.newPage());
  await page.goto("https://nation.africa/kenya");
  getScreenshot(page);
  const headlines = await getHeadlines(page);
  console.log("   Nation Africa scraped Successful.");
  return headlines;
}

async function getHeadlines(page) {
  const articles = await page.$$eval("li > a[href]:has(article)", (elements) =>
    elements.map((el) => {
      // TODO: Look to save this using the model
      const title = el.querySelector("h3")?.textContent.trim();
      const image = el.querySelector("img")?.getAttribute("src");
      const aside = el.querySelector("aside")?.textContent.trim();
      const paragraph = el.querySelector("p")?.textContent.trim();
      const link = el.getAttribute("href");
      return { title, image, aside, paragraph, link };
    })
  );
  return articles;
}

async function getScreenshot(page) {
  await page.screenshot({
    fullPage: true,
  });
}

module.exports = scrapeNation;
