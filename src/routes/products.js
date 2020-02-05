const router = require("express").Router();
const products = require("../controllers/products");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./public/img");
	},
	filename: function(req, file, callback) {
		callback(null, file.originalname);
	}
});
const upload = multer({ storage });

router.get("/products", products.getProducts);
router.get("/products/:page", products.getProducts);
router.get("/products/sort/:sort", products.getProducts);
router.get("/product/:id", products.getOneProduct);
router.post("/products", upload.single("image"), products.insertProduct);
router.patch("/product/:id", upload.single("image"), products.updateProduct);
router.delete("/product/:id", products.deleteProduct);

module.exports = router;
