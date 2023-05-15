const router = require("express").Router();
const {
  get_trending_games,
  get_genre,
  get_games_by_genre,
  get_game,
  get_screenshot,
  search_games_by_name,
} = require("../controllers/GameApi.js");

router.get("/trending", get_trending_games);
router.get("/browse", get_genre);
router.get("/browse/:id", get_games_by_genre);
router.get("/:id", get_game);
router.get("/search/:name", search_games_by_name);

module.exports = router;
