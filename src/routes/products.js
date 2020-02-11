const router = require("express").Router();
const products = require("../controllers/products");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./public/img");
	},
	filename: function(req, file, callback) {
		callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
	},
});
const upload = multer({
	storage: storage,
});

router.get("/products", products.getProducts);
router.post("/products", upload.single("image"), products.insertProduct);
router.patch("/products/:id", upload.single("image"), products.updateProduct);
router.delete("/products/:id", products.deleteProduct);

module.exports = router;
