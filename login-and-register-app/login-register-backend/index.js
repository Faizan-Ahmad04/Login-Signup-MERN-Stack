// Import required packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Create an Express application
const app = express();
const PORT = 80;

// Middleware configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/myLoginRegisterDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo Error", err));

// Define the user schema for MongoDB
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a User model based on the schema
const User = new mongoose.model("user", userSchema);

// Routes

// Registration route
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  // Check if the user with the same email already exists
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    return res.json({ message: "User already exists" });
  }

  // Create a new user and save it to the database
  const newUser = await User.create({
    name,
    email,
    password,
  });

  return res.json({ message: "User created", user: newUser });
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Find the user by their email
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({ message: "User not registered" });
  } else {
    // Check if the provided password matches the stored password
    if (password === user.password) {
      return res.json({ message: "Successfully logged in", user:user });
    } else {
      res.json({ message: "Incorrect password" });
    }
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
