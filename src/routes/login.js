const router = require("express").Router();
const login = require("../controllers/login");

router.use("/login", login.login);
router.use("/register", login.register);

module.exports = router;
