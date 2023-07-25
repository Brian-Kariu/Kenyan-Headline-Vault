const { articleModel, headlineModel } = require("../models/scraper.model");

async function scrapeNation(browser) {
  console.log("   Nation Africa scraping...");
  const page = await browser.then((browser) => browser.newPage());
  await page.goto("https://nation.africa/kenya");
  getScreenshot(page);
  await scrapeHeadlinesPage(page);
  console.log("   Nation Africa scraped Successful.");
}

async function scrapeHeadlinesPage(page) {
  try {
    // TODO: Rewrite this to handle different sources i.e nation, standard
    console.log("   Getting data from headlines page...");
    const options = { ordered: true };
    const headlines = await getHeadlines(page);
    console.log("   Adding new headlines to database...");
    const insertedHeadlines = await headlineModel.create(headlines, options);
    console.log(
      `   ${insertedHeadlines.insertedCount} documents were inserted to headlines`
    );
  } catch (err) {
    console.error(err);
  }
}

async function getHeadlines(page) {
  const headlines = [];
  let headlineInstance = undefined;
  const articles = await page.$$eval("li > a[href]:has(article)", (elements) =>
    elements.map((el) => {
      const title = el.querySelector("h3")?.textContent.trim();
      const image = `https://nation.africa${el
        .querySelector("img")
        ?.getAttribute("src")}`;
      const topic = el
        .querySelector("aside")
        ?.textContent.trim()
        .split("\n\n")[0];
      const date = el
        .querySelector("aside")
        ?.textContent.trim()
        .split("\n\n")[1];
      const paragraph = el.querySelector("p")?.textContent.trim();
      const link = `https://nation.africa${el.getAttribute("href")}`;
      return {
        title: title,
        paragraph: paragraph,
        imageUrl: image,
        topic: topic,
        date: date,
        link: link,
      };
    })
  );
  console.log("   Adding articles to index...");
  for (const article in articles) {
    const articleInstance = await getArticle(articles[article].link);
    if (articleInstance) {
      headlineInstance = new headlineModel({
        title: articles[article].title,
        paragraph: articles[article].paragraph,
        imageUrl: articles[article].imageUrl,
        topic: articles[article].topic,
        date: articles[article].date,
        link: articles[article].link,
        article_id: articleInstance.id,
      });
    }
    headlines.push(headlineInstance);
  }
  console.log(`   ${articles.length} documents were inserted to articles`);
  return articles;
}

async function getArticle(link) {
  let articleInstance = null;
  const currentArticleIndex = await articleModel.exists({
    link: link,
  });
  if (currentArticleIndex == null && link) {
    // TODO: Look at how you can scrape this article link
    articleInstance = await articleModel.create({
      link: link,
    });
  }
  return articleInstance;
}

async function getScreenshot(page) {
  await page.screenshot({
    fullPage: true,
  });
}

module.exports = scrapeNation;
