const scrapeSite = require("../services/scraper");
// const { initializeApp } = require("firebase-admin/app");
// const { getFirestore } = require("firebase-admin/firestore");

// const app = initializeApp();
// const db = getFirestore(app);

async function getData() {
  console.log("Scraping beginning...");
  const scrapedData = await scrapeSite();
  console.log("Scraped Data: ", scrapedData);
  //TODO: Move this to its own function
  // Push the new message into Firestore using the Firebase Admin SDK.
  // for (article in scrapedData) {
  //   console.log("Article", article);
  //   db.collection("headlines")
  //     .add(article.getArticle())
  //     .then((result) => {
  //       // Send back a message that we've successfully written the message
  //       return { result: `Message with ID: ${result} added.` };
  //     });
  // }
}

module.exports = getData;
