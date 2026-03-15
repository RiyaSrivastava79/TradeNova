const express = require("express");
const router = express.Router();
const User = require("../model/UserModel");
const bcrypt = require("bcryptjs");

const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
const PASSWORD_REGEX = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

router.post("/signup", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    console.log(req.body);

    if (!email || !username || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!GMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid Gmail address",
      });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters and include a special character",
      });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username already exists",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }

    const createdUser = await User.create({
      email,
      username,
      password,
    });

    return res.status(201).json({
      success: true,
      message: "Signup successful",
      user: {
        id: createdUser._id,
        email: createdUser.email,
        username: createdUser.username,
      },
    });
  } catch (err) {
    console.error(err);
    if (err && err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    if (!GMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid Gmail address",
      });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters and include a special character",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Login successful
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
