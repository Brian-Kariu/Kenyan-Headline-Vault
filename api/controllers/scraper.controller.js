const scrapeSite = require("../services/scraper");

async function scrapeData(req, res, next) {
  // TODO: In future add a function to scrape screenshots, metadata etc.
  try {
    await scrapeSite().then((response) => {
      return response;
    });
    res.status(200).send({ message: "scraping successful" });
  } catch (error) {
    next(error);
  }
}

module.exports = scrapeData;
