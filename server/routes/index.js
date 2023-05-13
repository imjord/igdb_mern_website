const router = require("express").Router();
const user_routes = require("./User");
const auth_routes = require("./Auth");
const game_routes = require("./Games");

router.use("/users", user_routes);
router.use("/games", game_routes);
router.use("/auth", auth_routes);

module.exports = router;
