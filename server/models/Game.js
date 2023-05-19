const { Schema, model } = require("mongoose");

const game_schema = new Schema({
  gameId: {
    type: String,
  },
  name: {
    type: String,
  },
  image_id: {
    type: String,
  },
});

const Game = model("Game", game_schema);

module.exports = Game;
