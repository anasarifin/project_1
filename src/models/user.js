const conn = require("../configs/database");

function getQuantity(x, username) {
	return new Promise(resolve => {
		conn.query(`SELECT quantity FROM cart WHERE product_id = '${x}' AND username = '${username}'`, (err, data) => {
			if (err) console.log(err);
			resolve(data[0]);
		});
	});
}
function checkExist(x) {
	return new Promise(resolve => {
		conn.query(`SELECT id FROM product WHERE id = '${x}'`, (err, data) => {
			if (err) console.log(err);
			resolve(data[0]);
		});
	});
}
function getCartList(username) {
	return new Promise(resolve => {
		conn.query(`SELECT product_id, quantity FROM cart WHERE username = '${username}'`, (err, data) => {
			if (err) console.log(err);
			resolve(data);
		});
	});
}
function checkStock(id, qty) {
	return new Promise(resolve => {
		conn.query(`SELECT stock FROM product WHERE id = '${id}'`, (err, data) => {
			if (err) console.log(err);
			if (data[0].stock - qty >= 0) {
				resolve(data[0].stock - qty);
			} else {
				resolve(false);
			}
		});
	});
}
function outOfStock(id) {
	return new Promise(resolve => {
		conn.query(`SELECT p.id AS product_id, p.name, p.price, c.quantity,p.category_id, p.description, c.updated_at FROM cart c LEFT JOIN product p ON c.product_id = p.id WHERE product_id = '${id}'`, (err, data) => {
			if (err) console.log(err);
			resolve(data[0]);
		});
	});
}

module.exports = {
	getCart: query => {
		let page = query.page ? "LIMIT " + (query.page * 5 - 5) + ", 5" : "";
		let dir = query.dir ? "DESC" : "ASC";
		let sort = query.sort || "product_id";
		let type = query.type || "username";
		let search = query.search ? "AND " + type + " LIKE '%" + query.search + "%'" : "";
		return new Promise(resolve => {
			conn.query(`SELECT p.id AS product_id, p.name, p.price, c.quantity, p.category_id, p.description, c.updated_at FROM cart c LEFT JOIN product p ON c.product_id = p.id WHERE username = '${query.username}' ${search} ORDER BY ${sort} ${dir} ${page}`, (err, result) => {
				if (err) console.log(err);
				resolve(result);
			});
		});
	},
	addCart: async query => {
		// check if product id available in database or not
		if ((await checkExist(query.id)) && query.qty > 0) {
			// to retrieve quantity from cart database
			const qtyCompare = await getQuantity(query.id, query.username);
			if (qtyCompare == undefined) {
				conn.query(`INSERT INTO cart (username, product_id, quantity) VALUES ('${query.username}', '${query.id}', '${query.qty}')`, (err, result) => {
					if (err) console.log(err);
				});
			} else {
				conn.query(`UPDATE cart SET quantity = '${parseFloat(qtyCompare.quantity) + parseFloat(query.qty)}' WHERE username = '${query.username}' AND product_id = '${query.id}'`, (err, result) => {
					if (err) console.log(err);
				});
			}
		}
		return new Promise(resolve => {
			resolve("Finish");
		});
	},
	reduceCart: async query => {
		// to retrieve quantity from cart database
		const qtyCompare = await getQuantity(query.id, query.username);
		if (qtyCompare != undefined && query.qty > 0) {
			if (qtyCompare.quantity - query.qty <= 0) {
				conn.query(`DELETE FROM cart WHERE product_id = '${query.id}' AND username = '${query.username}'`, err => {
					if (err) console.log(err);
				});
			} else {
				conn.query(`UPDATE cart SET quantity = '${parseFloat(qtyCompare.quantity) - parseFloat(query.qty)}' WHERE username = '${query.username}' AND product_id = '${query.id}'`, err => {
					if (err) console.log(err);
				});
			}
		}
		return new Promise(resolve => {
			resolve("Finish");
		});
	},
	checkout: async username => {
		// to retrieve a detail of product_id and quantity in cart
		const cartList = await getCartList(username);
		let stockEmpty = [];
		for (const x in cartList) {
			// to check if stock is available or not
			const stock = await checkStock(cartList[x].product_id, cartList[x].quantity);
			if (stock !== false) {
				conn.query(`INSERT INTO history (username, product_id, quantity) VALUES ('${username}', '${cartList[x].product_id}', '${cartList[x].quantity}')`, err => {
					if (err) console.log(err);
				});
				conn.query(`UPDATE product SET stock = ${stock} WHERE id = '${cartList[x].product_id}'`, err => {
					if (err) console.log(err);
				});
			} else if (stock === false) {
				stockEmpty.push(await outOfStock(cartList[x].product_id));
			}
		}
		conn.query(`DELETE FROM cart WHERE username = '${username}'`, err => {
			if (err) console.log(err);
		});
		return new Promise(resolve => {
			resolve(stockEmpty);
		});
	},
};
