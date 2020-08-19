const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  caption: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  postedTime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Posts", userSchema);
