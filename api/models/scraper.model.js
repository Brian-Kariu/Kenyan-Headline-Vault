const mongoose = require("mongoose");
/**
 * TODO: Placeholder comment for eslint JSDOC, replace later
 */
const headlineSchema = new mongoose.Schema(
  {
    title: String,
    paragraph: String,
    imageUrl: String,
    topic: String,
    date: String,
    link: String,
    article_id: String,
  },
  { timestamps: true }
);

const articleSchema = new mongoose.Schema(
  {
    link: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const headlineModel = new mongoose.model("headlines", headlineSchema);
const articleModel = new mongoose.model("articles", articleSchema);
module.exports = { headlineModel, articleModel };
