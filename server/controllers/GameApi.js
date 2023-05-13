const dotenv = require("dotenv");
dotenv.config();

const game_api_controller = {
  get_trending_games(req, res) {
    // make a post request to https://api.igdb.com/v4/games
    // with the following body: fields name, cover.url; where genres = (7) & cover != null; limit 20;
    const response = fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.client_id,
        Authorization: process.env.secret_auth,
      },
      body: "fields name, rating, first_release_date, screenshots, cover.url; where rating > 81 & first_release_date > 1672561472; sort release_dates desc; limit 6;",
    })
      .then((response) => response.json())
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
};

module.exports = game_api_controller;
