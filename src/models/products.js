const conn = require("../configs/database");

module.exports = {
	getProducts: (sort, page, desc, search) => {
		if (!page) {
			limit = "";
		} else {
			limit = "LIMIT " + (page * 5 - 5) + ", 5";
		}
		if (desc == "desc") {
			sortDir = "DESC";
		} else {
			sortDir = "ASC";
		}
		if (!search) {
			keyword = "";
		} else {
			keyword = "WHERE name LIKE '%" + search + "%'";
		}

		return new Promise((resolve, reject) => {
			conn.query(`SELECT * FROM product ${keyword} ORDER BY ${sort || "id"} ${sortDir} ${limit}`, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	},
	getProductsLimit: page => {
		return new Promise((resolve, reject) => {
			const limit = "LIMIT " + (page * 5 - 5) + ", 5";
			conn.query(`SELECT * FROM product ORDER BY "id" ASC ${limit}`, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	},
	getOneProduct: id => {
		return new Promise((resolve, reject) => {
			conn.query(`SELECT * FROM product WHERE id = ${id}`, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	},
	insertProduct: data => {
		return new Promise((resolve, reject) => {
			conn.query(`INSERT INTO product SET ?`, data, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	},
	updateProduct: (id, data) => {
		return new Promise((resolve, reject) => {
			conn.query(`UPDATE product SET ? WHERE id = ${id}`, data, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	},
	deleteProduct: id => {
		return new Promise((resolve, reject) => {
			conn.query(`DELETE FROM product WHERE id = ${id}`, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	},
};
