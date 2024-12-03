const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://rahil_rashid:df4lb4TOi30e3RgF@namastenodejs.g8sia.mongodb.net/full_stack_project"
  );
};

module.exports = {
  connectDB,
};
