const puppeteer = require("puppeteer-core");
const scrapeNation = require("./nation");

const fs = require("fs");
const { join } = require("path");
require("dotenv").config();

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

async function scrapeSite() {
  console.log("Scraping beginning...");
  try {
    if (
      !fs.existsSync("/opt/public/downloads/nation") &&
      process.env.NODENV == "production"
    ) {
      fs.mkdirSync("/opt/public/downloads/nation");
    }
    const browser = getBrowser();
    await scrapeNation(browser);
    await browser.close();
    return console.log("Scraping complete");
  } catch (err) {
    if ("failed to find element matching selector" in err) {
      console.log("Skipping element for article...");
    } else {
      return err;
    }
  }
}

module.exports = scrapeSite;
