const conn = require("../configs/database");

module.exports = {
	getProducts: query => {
		const page = query.page ? "LIMIT " + (query.page * 5 - 5) + ", 5" : "";
		const dir = query.dir ? "DESC" : "ASC";
		const sort = query.sort || "name";
		const name = query.name ? "WHERE name LIKE '%" + query.name + "%'" : "";
		const id = query.id ? "WHERE id = '" + query.id + "'" : "";
		const helper = query.name ? "AND " : "WHERE ";
		const type = query.type ? helper + "category_id = '" + query.type + "'" : "";

		return new Promise(resolve => {
			conn.query(`SELECT * FROM product ${name} ${type} ${id} ORDER BY ${sort} ${dir} ${page}`, (err, result) => {
				if (err) console.log(err);
				if (!result[0]) result = { msg: "Page empty..." };
				resolve(result);
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
