const Game = require("../models/Game");
const User = require("../models/User");
const game_controller = {
  // get user's game library
  async get_library(req, res) {
    try {
      const userId = req.session.user.id; // req.session.user.id

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findById(userId).populate("library");

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json(user.library);
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
  // add game to library
  async add_to_library(req, res) {
    try {
      const userId = req.session.user.id; // req.session.user.id
      const { gameId } = req.params;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized poop" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      //   const game = await Game.findById(gameId);

      //   if (!game) {
      //     return res.status(404).json({ message: "Game not found" });
      //   }

      // Check if the game already exists in the user's library
      const gameExistsInLibrary = user.library.includes(gameId);

      if (gameExistsInLibrary) {
        return res
          .status(400)
          .json({ message: "Game already exists in the library" });
      }

      user.library.push(gameId);
      await user.save();

      res.json({ message: "Game added to library successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
  // delete game from library
  async delete_from_library(req, res) {
    try {
      const userId = req.session.user.id; // req.session.user.id
      const { gameId } = req.params;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const game = await Game.findById(gameId);

      if (!game) {
        return res.status(404).json({ message: "Game not found" });
      }

      // Check if the game exists in the user's library
      const gameIndex = user.library.indexOf(gameId);

      if (gameIndex === -1) {
        return res
          .status(400)
          .json({ message: "Game does not exist in the library" });
      }

      user.library.splice(gameIndex, 1);
      await user.save();

      res.json({ message: "Game deleted from library successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Server error");
    }
  },
};

module.exports = game_controller;
