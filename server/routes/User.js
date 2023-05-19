const router = require("express").Router();
const { get_users, create_user } = require("../controllers/UserController");
const {
  get_user_library,
  add_to_library,
} = require("../controllers/GameController");
const { auth } = require("../controllers/AuthController.js");

router.get("/", auth, get_users);
router.post("/", create_user);
router.get("/library", auth, get_user_library);
router.post("/library", auth, add_to_library);

module.exports = router;
