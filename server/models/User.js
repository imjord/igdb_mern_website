const { Schema, model } = require("mongoose");

const user_schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  library: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
});

const User = model("User", user_schema);

module.exports = User;
