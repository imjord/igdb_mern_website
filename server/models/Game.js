const { Schema, model } = require("mongoose");

const game_schema = new Schema({
  game: {
    type: String,
    required: true,
    unique: true,
  },
});

const Game = model("Game", game_schema);

module.exports = Game;
