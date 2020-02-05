const conn = require("../configs/database");

module.exports = {
	getHistory: (start, end, sort) => {
		if (!start) {
			startDate = "0001-01-01";
		} else {
			startDate = start + " 23.59.59";
		}
		if (!end) {
			endDate = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString();
		} else {
			endDate = end + " 23.59.59";
		}
		console.log(endDate);
		console.log(end);
		return new Promise(resolve => {
			conn.query(`SELECT h.username, p.name, p.price, h.quantity, h.updated_at FROM history h LEFT JOIN product p ON h.product_id = p.id WHERE h.updated_at <= '${endDate}' AND h.updated_at >= '${startDate}' ORDER BY ${sort || "updated_at"} DESC`, (err, result) => {
				if (err) throw err;
				resolve(result);
			});
		});
	},
};
