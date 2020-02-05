const products = require("../models/products.js");

function helper(data) {
	const json = {};
	json.total_products = data.length;
	json.product_list = data;
	return json;
}

module.exports = {
	getProducts: (req, res) => {
		const page = req.params.page;
		const sort = req.params.sort;
		const desc = req.params.desc;
		const search = req.params.search;
		products.getProducts(sort, page, desc, search).then(result => {
			res.json(helper(result));
		});
	},
	getOneProduct: (req, res) => {
		const id = req.params.id;
		products.getOneProduct(id).then(result => {
			res.json(result);
		});
	},
	insertProduct: (req, res) => {
		const { name, description, price, stock, image, category_id } = req.body;
		const data = {
			name: name,
			description: description,
			price: parseFloat(price),
			stock: parseFloat(stock),
			image: req.file ? req.file.filename : image,
			category_id: parseFloat(category_id),
		};
		products.insertProduct(data).then(result => {
			res.json(result);
		});
	},
	updateProduct: (req, res) => {
		const id = req.params.id;
		const { name, description, price, stock, image, category_id } = req.body;
		const data = {
			name: name,
			description: description,
			price: parseFloat(price),
			stock: parseFloat(stock),
			image: req.file ? req.file.filename : image,
			category_id: parseFloat(category_id),
		};
		products.updateProduct(id, data).then(result => {
			res.json(result);
		});
	},
	deleteProduct: (req, res) => {
		const id = req.params.id;
		products.deleteProduct(id).then(result => {
			res.json(result);
		});
	},
};
