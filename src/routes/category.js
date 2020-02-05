const router = require("express").Router();
const category = require("../controllers/category");

router.get("/", category.getCategory);
router.post("/", category.insertCategory);
router.patch("/", category.updateCategory);
router.delete("/", category.deleteCategory);

module.exports = router;
