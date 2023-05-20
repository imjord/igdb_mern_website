const { login, logout } = require("../controllers/AuthController");

const router = require("express").Router();

router.post("/login", login);
router.get("/logout", logout);
module.exports = router;
