const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "FirstName should not be blank"],
  },
  lastName: {
    type: String,
    required: [true, "LastName should not be blank"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  loginType: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
  },
});

module.exports = mongoose.model("Users", userSchema);
