const User = require("../models/User");
const bcrypt = require("bcrypt");

const auth_controller = {
  // login
  async login(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const valid_password = await bcrypt.compare(password, user.password);

      if (!valid_password) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      req.session.user = {
        id: user._id,
        username: user.username,
        email: user.email,
      };

      res.json({ message: "Logged in!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server Error" });
    }
  },
};

module.exports = auth_controller;
