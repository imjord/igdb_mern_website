const Game = require("../models/Game");
const User = require("../models/User");
const dotenv = require("dotenv");
const { fetchGameDetails } = require("../helpers/functions.js");
dotenv.config();

const game_controller = {
  // get user's game library
  // get single user and populate with their library
  async get_user_library(req, res) {
    try {
      const user = await User.findOne({
        username: req.session.user.username,
      }).populate("library");
      res.json(user);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
  // add game to library
  async add_to_library(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { username: req.session.user.username },
        { $push: { library: req.body.gameId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Game added to library successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },

  async getAllGamesInUserLibrary(req, res) {
    try {
      const user = await User.findOne({ username: req.session.user.username })
        .lean()
        .exec();
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const library = user.library;

      const gameDetailsPromises = library.map((gameId) =>
        fetchGameDetails(gameId)
      );
      const gameDetails = await Promise.all(gameDetailsPromises);

      res.json(gameDetails);
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to fetch game details");
    }
  },
};

module.exports = game_controller;
