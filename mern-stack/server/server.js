const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/college-db")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
  name: String
});

const User = mongoose.model("User", UserSchema);

// GET Route
app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});


// POST Route
app.post("/users", async (req, res) => {
  const newUser = new User({ name: req.body.name });
  await newUser.save();
  res.json(newUser);
});

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});