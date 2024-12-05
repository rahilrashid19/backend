const express = require("express");
const { validateSignUpApi } = require("../validations/authValidator");
const bcrypt = require("bcrypt");
const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/api/signup", async (req, res) => {
  try {
    validateSignUpApi(req);
    const {
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      profilePic,
      bio,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      bio,
      gender,
      age,
      profilePic,
      password: hashedPassword,
    });
    await user.save();
    res.status(201).json({
      message: "User saved successfully",
      user,
    });
  } catch (error) {
    res.status(401).json({
      message: "Bad request",
      error: error.message,
    });
  }
});

authRouter.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    isValidUser = await bcrypt.compare(password, user.password);
    if (!isValidUser) {
      return res.status(404).json({
        message: "Invalid username or password",
      });
    }
    const token = await jwt.sign({ id: user._id }, "EXPRESS@2024");
    res.cookie("token", token);
    res.status(200).json({
      message: "User Logged In Successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad Request",
      error: error.message,
    });
  }
});

authRouter.post("/api/logout", (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.status(200).json({
    message: "User Logged Out Successfully",
  });
});

module.exports = {
  authRouter,
};
