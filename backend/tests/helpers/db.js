// tests/helpers/db.js
// Supports two modes:
//   1. MONGO_URL env var set → use that (CI with service container)
//   2. Otherwise → use mongodb-memory-server (local dev)
const mongoose = require("mongoose");

let mongoServer;

const connect = async () => {
  if (process.env.MONGO_URL) {
    await mongoose.connect(process.env.MONGO_URL);
  } else {
    const { MongoMemoryServer } = require("mongodb-memory-server");
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  }
};

const disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  if (mongoServer) await mongoServer.stop();
};

const clearDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};

module.exports = { connect, disconnect, clearDB };
