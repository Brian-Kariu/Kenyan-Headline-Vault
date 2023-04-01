const fs = require("fs");
const puppeteer = require("puppeteer");

async function run() {
  const DOWNLOAD_PATH = "./downloads";
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
  /**
   * Get a pdf version of the entire page
   * TODO: Takes to long to load
   */
  // await page.pdf({
  //   path: "${DOWNLOAD_PATH}/nation/nation-homepage.pdf",
  //   format: "A4",
  // });
  /**
   * Gets the courses on the webpage using array from
   */
    const headlines = await page.evaluate(() =>
      Array.from(document.querySelectorAll("div.col-1-1.large-col-1-3.teaser-image-large_summary"), (e) => ({
        title: e.querySelector("h3").innerHTML
      }))
    );
  /**
   * Get the text of the webpage
   */
  //   const text = await page.evaluate(() => document.body.innerHTML);
  /**
   * Dynamically gets all the links on the webpage
   */
  //   const links = await page.evaluate(() => Array.from(document.querySelectorAll('a'), (e) => e.href))
  /**
   * Gets the courses on the webpage using array from
   */
  //   const courses = await page.evaluate(() =>
  //     Array.from(document.querySelectorAll("#cscourses .card"), (e) => ({
  //       title: e.querySelector(".card-body h3").innerHTML,
  //       level: e.querySelector(".card-body .level").innerHTML,
  //       url: e.querySelector(".card-footer a").href,
  //     }))
  //   );

  //   const courses = await page.$$eval("#cscourses .card", (elements) =>
  //     elements.map((e) => ({
  //       title: e.querySelector(".card-body h3").innerHTML,
  //       level: e.querySelector(".card-body .level").innerHTML,
  //       url: e.querySelector(".card-footer a").href,
  //     }))
  //   );
  //   console.log(courses);

  //   // save data to JSON file
  //   fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
  //     if (err) throw err;
  //     console.log("File saved");
  //   });

  // Closes the browser
  console.log(await a.getProperties());
  await browser.close();
}

module.exports = run;
