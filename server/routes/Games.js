const router = require("express").Router();
const { get_trending_games } = require("../controllers/GameApi.js");

router.get("/trending", get_trending_games);

module.exports = router;
