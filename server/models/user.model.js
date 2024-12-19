const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "please enter user email"],
    unique: true,
  },
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
