const User = require("../models/User");
const bcrypt = require("bcrypt");
const user_controller = {
  // get users
  async get_users(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).send("Server error");
    }
  },

  // create user
  async create_user(req, res) {
    try {
      const { email, username, password } = req.body;
      const salt_rounds = 10;

      const salt = await bcrypt.genSalt(salt_rounds);
      const hash_password = await bcrypt.hash(password, salt);

      const new_user = new User({
        email,
        username,
        password: hash_password,
      });
      req.session.user = {
        id: new_user._id,
        username: new_user.username,
        email: new_user.email,
      };
      await new_user.save();
      res.status(201).json({ message: "User created!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = user_controller;
