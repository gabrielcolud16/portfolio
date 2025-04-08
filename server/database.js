require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/";

const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
};

let client;
const connectToMongoDB = async () => {
  if (!client) {
    try {
      client = await MongoClient.connect(uri, options);
      // Verify the connection
      await client.db("admin").command({ ping: 1 });
      console.log("Successfully connected to MongoDB.");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error; // Re-throw the error to handle it in the calling code
    }
  }
  return client;
};

const getConnectedClient = () => {
  if (!client) {
    throw new Error("MongoDB client is not connected. Call connectToMongoDB() first.");
  }
  return client;
};

module.exports = { connectToMongoDB, getConnectedClient };