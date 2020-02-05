const categories = require("../models/categories.js");

module.exports = {
	getcategories: (req, res) => {
		categories.getcategories().then(result => {
			helper.response(res, result, 200);
		});
	},
	getOneCategory: (req, res) => {
		const id = req.params.id;
		categories.getOneCategory(id).then(result => {
			helper.response(res, result, 200);
		});
	},
	insertCategory: (req, res) => {
		const name = req.body.name;
		categories.insertCategory(name).then(result => {
			helper.response(res, result, 200);
		});
	},
	updateCategory: (req, res) => {
		const id = req.params.id;
		const name = req.body.name;
		categories.updateCategory(id, name).then(result => {
			helper.response(res, result, 200);
		});
	},
	deleteCategory: (req, res) => {
		const id = req.params.id;
		categories.deleteCategory(id).then(result => {
			helper.response(res, result, 200);
		});
	},
};
