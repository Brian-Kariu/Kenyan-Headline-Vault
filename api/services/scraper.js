const puppeteer = require("puppeteer-core");
const { MongoClient } = require("mongodb");
const scrapeNation = require("./nation");
// const mongoClient = require("../../middleware/db_connection")

const fs = require("fs");
const { join } = require("path");
require("dotenv").config();

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const DOWNLOAD_PATH = join(__dirname, "../../public/downloads");
async function getBrowser() {
  const browser = await puppeteer.launch({
    headless: "false",
    executablePath:
      process.env.NODENV == "production"
        ? "/opt/google/chrome/google-chrome"
        : "/opt/google/chrome/chrome",
    args: ["--no-sandbox", `--download.default_directory=${DOWNLOAD_PATH}`],
  });
  return browser;
}

async function checkIndex(articles) {
  try {
    // TODO: Rewrite this to handle different sources i.e nation, standard
    console.log("Indexing new articles...");
    const links = [];
    const indexedArticles = [];
    const db = client.db("nation-db");
    const linkIndex = db.collection("link-index");
    for (article in articles) {
      const currentArticleInstance = articles[article];
      const currentLinkIndex = await linkIndex.findOne({
        link: currentArticleInstance["link"],
      });
      if (currentLinkIndex == undefined) {
        links.push({
          link: `https://nation.africa${currentArticleInstance["link"]}`,
        });
        indexedArticles.push(currentArticleInstance);
      }
    }
    const options = { ordered: true };
    await linkIndex.insertMany(links, options);
    return indexedArticles;
  } catch (err) {
    console.log(err);
  }
}

async function scrapeSite() {
  try {
    if (
      !fs.existsSync("/opt/public/downloads/nation") &&
      process.env.NODENV == "production"
    ) {
      fs.mkdirSync("/opt/public/downloads/nation");
    }
    const browser = getBrowser();
    const nationData = await scrapeNation(browser);
    await checkIndex(nationData);
    await UploadToDB(nationData);
    await browser.close();
    return headlines;
  } catch (err) {
    if ("failed to find element matching selector" in err) {
      console.log("Skipping element for article...");
    } else {
      return err;
    }
  }
}

async function UploadToDB(articles) {
  try {
    console.log("Successfully connected to Atlas!");
    const db = client.db("nation-db");
    const headlines = db.collection("headlines");
    const options = { ordered: true };
    console.log("Inserting to MongoDB...");
    const result = await headlines.insertMany(articles, options);
    console.log(`${result.insertedCount} documents were inserted`);
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}
module.exports = scrapeSite;
