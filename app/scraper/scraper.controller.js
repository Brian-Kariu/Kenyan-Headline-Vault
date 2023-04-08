const Article = require("./scraper.model");
const puppeteer = require("puppeteer");
const DOWNLOAD_PATH = "./downloads";

exports.scrapeSite = async (req, res, next) => {
  try {
    const browser = await puppeteer.launch({
      args: [`--download.default_directory=${DOWNLOAD_PATH}`],
    });
    const page = await browser.newPage();
    await page.goto("https://nation.africa/kenya");
    /**
     * Get a screenshot of the entire page
     */
    await page.screenshot({
      path: `${DOWNLOAD_PATH}/nation/nation-homepage.png`,
      fullPage: true,
    });
    const headlines = [];

    const articles = await page.$$("article");
    let count = 0;
    for (const article of articles) {
      count += 1;
      const pageArticle = new Article();
      children = Array.from(document.querySelector(article).children).length;
      console.log("Result:", children);
      const title = (await article.$eval("h3", (el) => el.innerText)) ?? null;
      const image = (await article.$eval("img", (el) => el.src)) ?? null;
      const aside =
        (await article.$eval("aside", (el) => el.innerText)) ?? null;
      const link =
        (await page.$eval(`a[aria-label*="${title}"]`, (el) => el.href)) ??
        null;
      const paragraph =
        (await article.$eval("p", (el) => el.innerText)) ?? null;
      pageArticle.setTitle(title);
      pageArticle.setParagraph(paragraph);
      pageArticle.setImageUrl(image);
      pageArticle.setLink(link);
      pageArticle.setImageCaption(aside);
      headlines.push(pageArticle);
    }
    await browser.close();
    res.status(200).send(headlines);
  } catch (err) {
    if ('failed to find element matching selector "img"' in err) {
      console.log(err);
    }
    next(err);
  }
};
