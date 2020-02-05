const router = require("express").Router();
const products = require("./products");
const user = require("./user");
const login = require("./login");
const history = require("./history");

router.use("/", products);
router.use("/user", user);
router.use("/", login);
router.use("/history", history);

module.exports = router;
