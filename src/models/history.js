const conn = require("../configs/database");

module.exports = {
	getHistory: query => {
		let page = query.page ? "LIMIT " + (query.page * 5 - 5) + ", 5" : "";
		let dir = query.dir ? "DESC" : "ASC";
		let sort = query.sort || "updated_at";
		let type = query.type || "username";
		let search = query.search ? "AND " + type + " LIKE '%" + query.search + "%'" : "";
		let start = query.start || "0001-01-01";
		let end = query.end || "9999-12-12";
		return new Promise(resolve => {
			conn.query(`SELECT h.username, p.name, p.price, h.quantity, h.updated_at FROM history h LEFT JOIN product p ON h.product_id = p.id WHERE h.updated_at <= '${end}' AND h.updated_at >= '${start}' ${search} ORDER BY ${sort} ${dir} ${page}`, (err, result) => {
				if (err) console.log(err);
				resolve(result);
			});
		});
	},
};
