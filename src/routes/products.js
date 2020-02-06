const router = require("express").Router();
const products = require("../controllers/products");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./public/img");
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname);
	},
});
const upload = multer({
	fileFilter: function(req, file, callback) {
		var ext = path.extname(file.originalname);
		if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
			return callback(new Error("Only images are allowed"));
		}
		callback(null, true);
	},
	storage: storage,
	limits: { fileSize: 1024 },
});

router.get("/products", products.getProducts);
router.post("/products", upload.single("image"), products.insertProduct);
router.patch("/product/:id", upload.single("image"), products.updateProduct);
router.delete("/product/:id", products.deleteProduct);

module.exports = router;
