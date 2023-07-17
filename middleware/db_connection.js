const { MongoClient } = require("mongodb");

// TODO: Temporarily disabled look to add it back
DB_NAME = process.env.DB_NAME;
DB_USER = process.env.DB_USER;
DB_PASSWORD = process.env.DB_PASSWORD;

async function getClient() {
  const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_NAME}.mongodb.net/?retryWrites=true&w=majority`;
  const client = await new MongoClient(uri);
  console.log("Successfully connected to Atlas");
  return client;
}

module.exports = getClient;
