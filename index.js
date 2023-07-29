const express = require("express");
const app = express();
const morgan = require("morgan");
const { auth } = require("express-oauth2-jwt-bearer");
const ErrorHandler = require("./middleware/ErrorHandler");
const connectDB = require("./api/config/db_conn");
// TODO: Look into more efficient imports for routes
const headlinesRoutes = require("./api/routes/headlines.routes");
const scraperRoutes = require("./api/routes/scraper.routes");
const config = require("./api/config/config");
const PORT = config.PORT || 4000;
const jwtCheck = auth({
  audience: config.AUTH_AUDIENCE,
  issuerBaseURL: `https://${config.AUTH_URL}/`,
  tokenSigningAlg: "RS256",
});
const customLogFormat =
  ":custom-date :method :url :status :response-time ms - :res[content-length]";
morgan.token("custom-date", () => new Date().toISOString());
connectDB();
app.use(jwtCheck);
app.use(morgan(customLogFormat));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/scrape", scraperRoutes);
app.use("/headlines", headlinesRoutes);
app.use(ErrorHandler);

app.listen(PORT, () => {
  console.info(`Server running at http://localhost:${PORT}/`);
});
