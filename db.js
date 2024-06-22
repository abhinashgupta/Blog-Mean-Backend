require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error("The MONGODB_URI environment variable is not set.");
}

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

module.exports = mongoose;
