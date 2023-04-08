const express = require("express");
const scraperRoutes = require("./app/scraper");
const app = express();
const port = 4000;

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use("/scrape", scraperRoutes.scraperRoute);

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

// Start the server
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
