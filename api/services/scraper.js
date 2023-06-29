const Article = require("../models/scraper.model");
const puppeteer = require("puppeteer-core");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const app = initializeApp();
const db = getFirestore(app);
db.settings({ ignoreUndefinedProperties: true })
const fs = require("fs")
const { join } = require('path');
require("dotenv").config();

const DOWNLOAD_PATH = join(__dirname, "../../public/downloads");
async function scrapeSite() {
  try {
    if (!fs.existsSync("/opt/public/downloads/nation") && process.env.NODENV == "production") {
      fs.mkdirSync("/opt/public/downloads/nation");
    }
    const browser = await puppeteer.launch({
      headless: "false",
      executablePath: process.env.NODENV == "production" ? "/opt/google/chrome/google-chrome" : "/opt/google/chrome/chrome",
      args: [
        "--no-sandbox",
        `--download.default_directory=${DOWNLOAD_PATH}`
      ]
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
    const links = await page.$$eval('a', links => {
      return links.map(link => link.href);
    });
    for (const article of articles) {
      const pageArticle = new Article();
      const title = await article.$eval("h3", (el) => el.innerText);
      const image = undefined;
      const aside = undefined;
      const link = links[title.replace(/\s+/g, "-").toLowerCase()];
      const paragraph = undefined;
      pageArticle.setTitle(title);
      pageArticle.setParagraph(paragraph);
      pageArticle.setImageUrl(image);
      pageArticle.setLink(link);
      pageArticle.setImageCaption(aside);
      // headlines.push(pageArticle);
      console.log("pageArticle", pageArticle);
      await UploadToFirebase(pageArticle);
    }
    await browser.close();
    return headlines;
  } catch (err) {
    if ('failed to find element matching selector "img"' in err) {
      console.log(err);
    }
    return err;
  }
}

async function UploadToFirebase(article) {
  console.log("Article", article);
  await db.collection("headlines")
    .add(article.getArticle())
    .then((result) => {
      // Send back a message that we've successfully written the message
      return { result: `Message with ID: ${result} added.` };
    });
}
module.exports = scrapeSite;
