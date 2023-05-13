const router = require("express").Router();
const { get_users, create_user } = require("../controllers/UserController");

router.get("/", get_users);
router.post("/", create_user);

module.exports = router;
