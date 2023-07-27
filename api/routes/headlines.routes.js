const express = require("express");
const {
  getHeadlines,
  getHeadlineById,
} = require("../controllers/headlines.controllers");
const headlineRouter = express.Router();

headlineRouter.get("/", getHeadlines);
headlineRouter.get("/:id", getHeadlineById);

module.exports = headlineRouter;
