const express = require('express')
const app = express()
const scraperRoutes = require("./app/scraper");
const port = 4000;
const {db} = require('./firebase.js')

const firebaseConfig = {
  apiKey: "AIzaSyBlNMQ-WWe-LQLi_5hNayffPv9Rix_uriY",
  authDomain: "newsaggregatortest-50e3c.firebaseapp.com",
  projectId: "newsaggregatortest-50e3c",
  storageBucket: "newsaggregatortest-50e3c.appspot.com",
  messagingSenderId: "471606395421",
  appId: "1=471606395421=web=92f279fe5b60c32f97fcf4",
  measurementId: "G-BBE6CLPFQP"
}
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/scrape", onSchedule("0 6,12,6 * * *", scraperRoutes.scraperRoute));
