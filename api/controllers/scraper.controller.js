const scrapeSite = require("../services/scraper");

async function scrapeData() {
  // TODO: In future add a function to scrape screenshots, metadata etc.
  await scrapeSite();
}

module.exports = scrapeData;
