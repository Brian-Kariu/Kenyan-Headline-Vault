const express = require("express");
const app = express();
const scraperRoutes = require("./api/routes/scraper.routes");
const port = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/scrape", scraperRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
