const router = require("express").Router();
const { get_users, create_user } = require("../controllers/UserController");
const {
  get_library,
  add_to_library,
  delete_from_library,
} = require("../controllers/GameController");
const { auth } = require("../controllers/AuthController.js");

router.get("/", auth, get_users);
router.post("/", auth, create_user);
router.get("/library", auth, get_library);
router.post("/library/:gameId", auth, add_to_library);
router.delete("/library:gameId", auth, delete_from_library);

module.exports = router;
