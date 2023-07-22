const express = require("express");
const app = express();
const connectDB = require("./api/config/db_conn");
const scraperRoutes = require("./api/routes/scraper.routes");
const PORT = process.env.PORT || 4000;

connectDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/scrape", scraperRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
