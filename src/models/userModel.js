const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 10,
    },
    lastName: {
      type: String,
    },
    age: {
      type: Number,
      min: 18,
      max: 55,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "{VALUE} is not a valid gender",
      },
    },
    bio: {
      type: String,
      default: "Employee at Dunder Mifflin",
    },
    profilePic: {
      type: String,
      default:
        "https://www.imdb.com/title/tt0386676/mediaviewer/rm2849806081/?ref_=tt_ov_i",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = {
  User,
};
