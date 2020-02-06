const router = require("express").Router();
const category = require("../controllers/category");

router.get("/", category.getCategory);
router.post("/", category.insertCategory);
router.patch("/:id", category.updateCategory);
router.delete("/:id", category.deleteCategory);

module.exports = router;
