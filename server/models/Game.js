const { Schema, model } = require("mongoose");

const game_schema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  storyline: {
    type: String,
    trim: true,
  },
  cover: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
    trim: true,
  },
  first_release_date: {
    type: Number,
    trim: true,
  },
});

const Game = model("Game", game_schema);

module.exports = Game;
