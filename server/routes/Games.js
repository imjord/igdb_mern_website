const router = require("express").Router();
const {
  get_trending_games,
  get_genre,
  get_games_by_genre,
  get_game,
  search_games_by_name,
} = require("../controllers/GameApi.js");
const { auth } = require("../controllers/AuthController.js");

router.get("/trending", auth, get_trending_games);
router.get("/browse", auth, get_genre);
router.get("/browse/:id", auth, get_games_by_genre);
router.get("/:id", auth, get_game);
router.get("/search/:name", auth, search_games_by_name);

module.exports = router;
