const { headlineModel } = require("../models/scraper.model");

async function getHeadlineById(req, res, next) {
  const { id } = req.params;

  try {
    const headline = await headlineModel.findById(id);
    res.status(200).send(headline);
  } catch (error) {
    next(error);
  }
}

async function getHeadlines(req, res, next) {
  const {
    title,
    created,
    page = 1,
    limit = 100,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = req.query;
  const query = {};

  if (title) {
    query.title = { $regex: title, $options: "i" };
  }
  if (created) {
    query.createdAt = { $gte: new Date(created) };
  }

  try {
    const headlinesCount = await headlineModel.countDocuments({});
    const sortOptions = {};
    // fix sort asc
    sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    const headlineResult = await headlineModel
      .find(query)
      .sort(sortOptions)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).send({
      total: headlinesCount,
      page: Number(page),
      limit: Number(limit),
      data: headlineResult,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getHeadlineById,
  getHeadlines,
};
