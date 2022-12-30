const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: String,
  backgound: String,
  about: String,
  livesin: String,
  worksat: String,
  followers: [],
  following: [],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
