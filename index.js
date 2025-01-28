const express = require("express");
const { connectToMongoDB } = require("./connection");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose
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
// Middleware
app.use(bodyParser.json());

// Routes
app.use(userRoutes);

// Mongoose model
// const User = mongoose.model("User");

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
