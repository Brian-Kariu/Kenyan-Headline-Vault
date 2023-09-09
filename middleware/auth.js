const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.query.token ||
      req.headers["authorization"].split(" ")[1];

    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
