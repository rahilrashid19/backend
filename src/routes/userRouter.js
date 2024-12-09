const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const { User } = require("../models/userModel");
const { validateUpadeFields } = require("../validations/authValidator");

const userRouter = express.Router();

userRouter.get("/api/getAllUsers", authMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad request - No Users found",
      error: error.message,
    });
  }
});

userRouter.get("/api/viewProfile", authMiddleware, async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad request - No Users found",
      error: error.message,
    });
  }
});

userRouter.patch("/api/editProfile", authMiddleware, async (req, res) => {
  const loggedInUser = req.user;
  try {
    if (!validateUpadeFields(req)) {
      return res.status(400).json({
        message: "Trying to update wrong fields",
      });
    }
    Object.keys(req.body).map((key) => {
      loggedInUser[key] = req.body[key];
    });
    loggedInUser.save();
    res.status(202).json({
      message: "User updated successfully",
      loggedInUser,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bad request - No Users found",
      error: error.message,
    });
  }
});

module.exports = {
  userRouter,
};
