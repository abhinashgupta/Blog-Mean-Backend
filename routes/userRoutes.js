require("dotenv").config();
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const secret = process.env.Secret_Token;

// Register a new user
router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  try {
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(200).send({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ message: "Error registering user" });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ email: user.email }, secret, {
        expiresIn: "1h",
      });
      res.status(200).send({ token });
    } else {
      res.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({ message: "Error logging in" });
  }
});

module.exports = router;
