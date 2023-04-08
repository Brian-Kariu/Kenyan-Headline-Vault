
const express = require('express');
const scraperController = require('./scraper.controller');

const router = express.Router();

router
  .route('/')
  .get(scraperController.scrapeSite)

module.exports = router;
