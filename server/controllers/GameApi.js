const dotenv = require("dotenv");
dotenv.config();

const game_api_controller = {
  get_trending_games(req, res) {
    // make a post request to https://api.igdb.com/v4/games
    // with the following body: fields name, cover.url; where genres = (7) & cover != null; limit 20;
    fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.client_id,
        Authorization: process.env.secret_auth,
      },
      body: "fields name, rating, first_release_date, screenshots.*, cover.*; where rating > 81 & first_release_date > 1672561472 & cover != null; sort release_dates desc; limit 6;",
    })
      .then((response) => response.json())
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  get_genre(req, res) {
    fetch("https://api.igdb.com/v4/genres/", {
      method: "POST",
      headers: {
        "Client-ID": process.env.client_id,
        Authorization: process.env.secret_auth,
      },
      body: "fields *;",
    })
      .then((response) => response.json())
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  get_games_by_genre(req, res) {
    fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.client_id,
        Authorization: process.env.secret_auth,
      },
      body: `fields name, storyline, cover.*; where genres = (${req.params.id}) & cover != null & rating > 81; sort first_release_date desc; limit 30; offset 0;`,
    })
      .then((response) => response.json())
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },
  get_game(req, res) {
    fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.client_id,
        Authorization: process.env.secret_auth,
      },
      body: `fields name, summary, platforms.name, screenshots.*; where id = (${req.params.id}) & screenshots != null; `,
    })
      .then((response) => response.json())
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  },

  search_games_by_name(req, res) {
    fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": process.env.client_id,
        Authorization: process.env.secret_auth,
      },
      body: `search "${req.params.name}"; fields name, storyline, cover.*; where cover != null; limit 350;`,
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
