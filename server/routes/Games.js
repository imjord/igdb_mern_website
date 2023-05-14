const router = require("express").Router();
const {
  get_trending_games,
  get_genre,
  get_games_by_genre,
} = require("../controllers/GameApi.js");

router.get("/trending", get_trending_games);
router.get("/browse", get_genre);
router.get("/browse/:id", get_games_by_genre);

module.exports = router;
