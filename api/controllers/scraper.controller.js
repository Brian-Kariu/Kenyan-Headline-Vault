const scrapeSite = require("../services/scraper");

async function scrapeData(req, res, next) {
  // TODO: In future add a function to scrape screenshots, metadata etc.
  try {
    const response = await scrapeSite().then((response) => {
      return response;
    });
    res.status(200).send(response);
  } catch (error) {
    next(error);
  }
}

module.exports = scrapeData;
