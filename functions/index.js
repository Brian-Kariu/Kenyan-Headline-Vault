// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const scraper = require("./scraper/controller");
const functions = require("firebase-functions");
// All available logging functions
const {log} = require("firebase-functions/logger");
// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

const app = initializeApp();
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/scrapedData
exports.scrape = functions.pubsub.schedule("0 6,12,6 * * *").onRun(
    async (context) => {
      log("Scraping beginning...");
      const scrapedData = await scraper();
      log("Scraped Data: ", scrapedData);
      // Push the new message into Firestore using the Firebase Admin SDK.
      db.collection("headlines").add({foo: "bar"}).then((result) =>{
        // Send back a message that we've successfully written the message
        return {result: `Message with ID: ${result} added.`};
      });
      // for (let i = 0; i < scrapedData; i++) {
      //   console.log(scrapedData[i]);
      //   db.collection("headlines").add(scrapedData[i]).then((result) =>{
      //     // Send back a message that we've successfully written the message
      //     return {result: `Message with ID: ${result} added.`};
      //   });
      // }
    });

// Listens for new messages added to /messages/:documentId/scrapedData
// and saves an uppercased version of the message
// to /messages/:documentId/uppercase
// exports.makeuppercase = onDocumentCreated("/headlines/{documentId}",
//     (event) => {
//       // Grab the current value of what was written to Firestore.
//       const scrapedData = event.data.data().scrapedData;

//       // Access the parameter `{documentId}` with `event.params`
//       logger.log("Uppercasing", event.params.documentId, scrapedData);

//       const uppercase = scrapedData.toUpperCase();

//       // You must return a Promise when performing
//       // asynchronous tasks inside a function
//       // such as writing to Firestore.
//       // Setting an 'uppercase' field in Firestore document
//   returns a Promise.
//       return event.data.ref.set({uppercase}, {merge: true});
//     });
