const dotenv = require("dotenv");
const path = require("path");

dotenv.config({
  path: path.resolve(
    path.join(__dirname, "../../"),
    `.env.${process.env.NODE_ENV}`
  ),
});

module.exports = {
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGODB: process.env.MONGODB,
  DB_NAME: process.env.DB_NAME || "test",
  DB_USER: process.env.DB_USER,
  AUTH_AUDIENCE: process.env.AUTH_AUDIENCE,
  AUTH_URL: process.env.AUTH_URL,
  DB_PASSWORD: process.env.DB_PASSWORD,
  PORT: process.env.PORT,
};
