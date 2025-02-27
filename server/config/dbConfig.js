require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.mongo_url);

const connectionResult = mongoose.connection;

connectionResult.on("error", () => {
  console.log("Connection error");
});
connectionResult.on("connected", () => {
  console.log("Connected to MongoDB");
});

module.exports = connectionResult;
