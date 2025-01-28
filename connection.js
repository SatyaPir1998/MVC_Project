const mongoose = require("mongoose");

async function connectToMongoDB() {
  // Connect to MongoDB
  return mongoose
    .connect("mongodb://127.0.0.1:27017/mydatabase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
    });
}

module.exports = connectToMongoDB;
