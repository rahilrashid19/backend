const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(400).json({
      message: "User not logged in",
    });
  }
  const { id } = jwt.verify(token, "EXPRESS@2024");
  const user = await User.findOne({ _id: id });
  req.user = user;
  next();
};

module.exports = {
  authMiddleware,
};
