const express = require("express");
const scraper = require("../controllers/scraper.controller");
const router = express();

router.get("/", scraper);

module.exports = router;
