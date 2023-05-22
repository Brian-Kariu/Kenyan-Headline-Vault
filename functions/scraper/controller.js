const Article = require("./model");
const puppeteer = require("puppeteer");
const DOWNLOAD_PATH = "./downloads";

async function scrapeSite() {
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
    for (const article of articles) {
      const pageArticle = new Article();
      const title = (await article.$eval("h3", (el) => el.innerText));
      const image = (await article.$eval("img", (el) => el.src));
      const aside =
        (await article.$eval("aside", (el) => el.innerText));
      const link =
        (await page.$eval(`a[aria-label*="${title}"]`, (el) => el.href));
      const paragraph =
        (await article.$eval("p", (el) => el.innerText));
      pageArticle.setTitle(title);
      pageArticle.setParagraph(paragraph);
      pageArticle.setImageUrl(image);
      pageArticle.setLink(link);
      pageArticle.setImageCaption(aside);
      headlines.push(pageArticle);
    }
    await browser.close();
    return headlines;
  } catch (err) {
    if ("failed to find element matching selector \"img\"" in err) {
      console.log(err);
    }
    return err;
  }
}

module.exports = scrapeSite;
