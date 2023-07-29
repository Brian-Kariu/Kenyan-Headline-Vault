const mongoose = require("mongoose");
const config = require("./config");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@knv-test.iffoemr.mongodb.net/?retryWrites=true&w=majority`,
      {
        dbName: config.DB_NAME,
      }
    );
    console.info(`MongoDB Connected to ${config.NODE_ENV} DB`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
