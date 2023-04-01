const express = require("express");
const scraper = require('./scraper/index')
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// GET method route
app.get("/scrape", (req, res) => {
  scraper();
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
