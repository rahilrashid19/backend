const validator = require("validator");

const validateSignUpApi = (req) => {
  const { firstName, email, password, gender } = req.body;
  if (!firstName) throw new Error("First Name must be provided");
  if (gender !== "Male" && gender !== "Female")
    throw new Error("Not a valid gender");
  if (firstName.length < 3 || firstName.length > 15)
    throw new Error("First Name must be between 3 and 15 characters");
  if (!validator.isEmail(email)) throw new Error("Email is not a valid");
  if (!validator.isStrongPassword(password))
    throw new Error("Please enter a secure password");
};

module.exports = {
  validateSignUpApi,
};
