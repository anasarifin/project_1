const conn = require("../configs/database");

function getQuantity(x, username) {
	return new Promise(resolve => {
		conn.query(`SELECT quantity FROM cart WHERE product_id = '${x}' AND username = '${username}'`, (err, data) => {
			if (err) throw err;
			resolve(data[0]);
		});
	});
}
function checkExist(x) {
	return new Promise(resolve => {
		conn.query(`SELECT id FROM product WHERE id = '${x}'`, (err, data) => {
			if (err) throw err;
			resolve(data[0]);
		});
	});
}
function getCartList(username) {
	return new Promise(resolve => {
		conn.query(`SELECT product_id, quantity FROM cart WHERE username = '${username}'`, (err, data) => {
			if (err) throw err;
			resolve(data);
		});
	});
}
function checkStock(id, qty) {
	return new Promise(resolve => {
		conn.query(`SELECT stock FROM product WHERE id = '${id}'`, (err, data) => {
			if (err) throw err;
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
		conn.query(`SELECT c.quantity, p.id AS product_id, p.name, p.price, p.category_id, p.description, c.updated_at FROM cart c LEFT JOIN product p ON c.product_id = p.id WHERE product_id = '${id}'`, (err, data) => {
			if (err) throw err;
			resolve(data[0]);
		});
	});
}

module.exports = {
	getCart: (username, page, sort) => {
		if (!page) {
			limit = "";
		} else {
			limit = " LIMIT " + (page * 5 - 5) + ", 5";
		}
		if (!sort) {
			order = "product_id";
		} else {
			order = sort;
		}
		return new Promise(resolve => {
			conn.query(`SELECT c.quantity, p.id AS product_id, p.name, p.price, p.category_id, p.description, c.updated_at FROM cart c LEFT JOIN product p ON c.product_id = p.id WHERE username = '${username}' ORDER BY ${order}${limit}`, (err, data) => {
				if (err) throw err;
				resolve([username, data]);
			});
		});
	},
	addCart: async (username, data) => {
		for (const x in data) {
			console.log(data[x]);
			if ((await checkExist(x)) && data[x] > 0) {
				const qty = await getQuantity(x, username);
				if (qty == undefined) {
					conn.query(`INSERT INTO cart (username, product_id, quantity) VALUES ('${username}', '${x}', '${data[x]}')`, (err, data) => {
						if (err) throw err;
					});
				} else {
					conn.query(`UPDATE cart SET quantity = '${parseFloat(qty.quantity) + parseFloat(data[x])}' WHERE username = '${username}' AND product_id = '${x}'`, (err, data) => {
						if (err) throw err;
					});
				}
			}
		}
		return new Promise(resolve => {
			resolve("Finish");
		});
	},
	reduceCart: async (username, data) => {
		for (const x in data) {
			const qty = await getQuantity(x, username);
			if (qty != undefined && data[x] > 0) {
				if (qty.quantity - data[x] <= 0) {
					console.log("ada nih");
					conn.query(`DELETE FROM cart WHERE product_id = '${x}' AND username = '${username}'`, err => {
						if (err) throw err;
					});
				} else {
					conn.query(`UPDATE cart SET quantity = '${parseFloat(qty.quantity) - parseFloat(data[x])}' WHERE username = '${username}' AND product_id = '${x}'`, err => {
						if (err) throw err;
					});
				}
			}
		}
		return new Promise(resolve => {
			resolve("Finish");
		});
	},
	checkout: async username => {
		const cartList = await getCartList(username);
		let stockEmpty = [];
		for (const x in cartList) {
			const stock = await checkStock(cartList[x].product_id, cartList[x].quantity);
			if (stock !== false) {
				conn.query(`INSERT INTO history (username, product_id, quantity) VALUES ('${username}', '${cartList[x].product_id}', '${cartList[x].quantity}')`, err => {
					if (err) throw err;
				});
				conn.query(`UPDATE product SET stock = ${stock} WHERE id = '${cartList[x].product_id}'`, err => {
					if (err) throw err;
				});
			} else if (stock === false) {
				stockEmpty.push(await outOfStock(cartList[x].product_id));
			}
		}
		conn.query(`DELETE FROM cart WHERE username = '${username}'`, err => {
			if (err) throw err;
		});
		return new Promise(resolve => {
			resolve(stockEmpty);
		});
	},
};
