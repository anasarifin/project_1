const router = require("express").Router();
const user = require("../controllers/user");
const auth = require("../configs/auth.js");

router.get("/", user.getCart);
router.patch("/", user.addCart);
router.delete("/", user.reduceCart);
router.post("/", user.checkout);

module.exports = router;
