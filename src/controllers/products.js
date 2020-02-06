const products = require("../models/products.js");

module.exports = {
	getProducts: (req, res) => {
		const page = req.params.page;
		const sort = req.params.sort;
		const desc = req.params.desc;
		const search = req.params.search;
		if (!page) {
			products.getProducts(sort, page, desc, search).then(result => {
				const final = {};
				final.total_products = result.length;
				final.product_list = result;
				res.json(final);
			});
		} else {
			products.getProducts(sort).then(result => {
				products.getProductsLimit(page).then(result2 => {
					const final = {};
					final.current_page = parseFloat(page);
					final.total_page = Math.ceil(result.length / 5);
					final.prev_page = page == 1 ? null : "http://localhost:9999/api/v1/products/" + (page - 1);
					final.next_page = page == Math.ceil(result.length / 5) ? null : "http://localhost:9999/api/v1/products/" + (parseFloat(page) + 1);
					final.total_products = result.length;
					final.product_list = result2;
					res.json(final);
				});
			});
		}
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
			image: req.file ? "http://localhost:9999/public/img/" + req.file.filename : image,
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
			image: req.file ? "http://localhost:9999/public/img/" + req.file.filename : image,
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
