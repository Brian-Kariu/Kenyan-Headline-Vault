const scrapeSite = require("../services/scraper");
const { log } = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

const app = initializeApp();
const db = getFirestore(app);

async function getData() {
  log("Scraping beginning...");
  const scrapedData = await scrapeSite();
  log("Scraped Data: ", scrapedData);
  //TODO: Move this to its own function
  // Push the new message into Firestore using the Firebase Admin SDK.
  db.collection("headlines")
    .add({ foo: "bar" })
    .then((result) => {
      // Send back a message that we've successfully written the message
      return { result: `Message with ID: ${result} added.` };
    });
}

module.exports = getData;
