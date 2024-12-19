const mongoose = require("mongoose");

const kudosSchema = mongoose.Schema({
  toperson: {
    type: String,
    required: [true, "please enter person's name"],
  },
  badge: {
    type: String,
    required: [true, "please enter badge"],
  },
  reason: {
    type: String,
    required: [true, "please enter reason"],
  },
  user: {
    type: String,
  },
  likedBy: [{ type: String }],
});

const Kudos = mongoose.model("kudos", kudosSchema);

module.exports = Kudos;
