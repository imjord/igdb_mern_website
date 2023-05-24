const Game = require("../models/Game");
const User = require("../models/User");

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
      const name = req.body.name;
      const image_id = req.body.image_id;
      const gameId = req.body.gameId;

      // Find the user
      const user = await User.findOne({
        username: req.session.user.username,
      }).populate("library");

      if (!user) {
        return res.status(404).send("User not found");
      }

      // Check if the game already exists in the user's library
      const gameExists = user.library.some((game) => game.name === name);

      if (gameExists) {
        return res.status(400).json({ message: "Game already in library" });
      }

      // Create a new game
      const newGame = new Game({
        name,
        image_id,
        gameId,
      });

      const savedGame = await newGame.save();

      // Add the game to the user's library
      user.library.push(savedGame._id);
      await user.save();

      res.json({ message: "Game added to library!!!" });
    } catch (error) {
      console.error(error);
      res.status(500).send("Server error");
    }
  },
  // remove game from library
  async remove_game(req, res) {
    User.findOneAndUpdate(
      { username: req.session.user.username },
      { $pull: { library: req.body._id } },
      { new: true }
    )
      .then((results) => res.json(results))
      .catch((err) => res.status(422).json(err));
  },
};

module.exports = game_controller;
