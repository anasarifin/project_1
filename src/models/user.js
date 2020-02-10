const conn = require("../configs/database");

function getQuantity(id) {
	return new Promise(resolve => {
		conn.query(`SELECT quantity FROM cart WHERE product_id = '${id}'`, (err, data) => {
			if (err) console.log(err);
			if (data[0] !== undefined) {
				resolve(parseFloat(data[0].quantity));
			} else {
				resolve(undefined);
			}
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
function getCartList() {
	return new Promise(resolve => {
		conn.query(`SELECT product_id, quantity FROM cart`, (err, data) => {
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
		// let page = query.page ? "LIMIT " + (query.page * 5 - 5) + ", 5" : "";
		return new Promise(resolve => {
			conn.query(`SELECT p.id AS product_id, p.name, p.price, p.stock, c.quantity, p.category_id, p.description, c.updated_at FROM cart c LEFT JOIN product p ON c.product_id = p.id`, (err, result) => {
				if (err) console.log(err);
				resolve(result);
			});
		});
	},
	addCart: async id => {
		// check if product id available in database or not
		if (await checkExist(id)) {
			// to retrieve quantity from cart database
			const qty = await getQuantity(id);
			if (qty == undefined) {
				conn.query(`INSERT INTO cart (product_id, quantity) VALUES ('${id}', ${1})`, (err, result) => {
					if (err) console.log(err);
				});
			} else {
				conn.query(`UPDATE cart SET quantity = '${qty + 1}' WHERE product_id = '${id}'`, (err, result) => {
					if (err) console.log(err);
				});
			}
		}
		return new Promise(resolve => {
			resolve("Finish");
		});
	},
	reduceCart: async id => {
		// to retrieve quantity from cart database
		if (id !== "all") {
			const qty = await getQuantity(id);
			if (qty != undefined) {
				if (qty - 1 <= 0) {
					conn.query(`DELETE FROM cart WHERE product_id = '${id}'`, err => {
						if (err) console.log(err);
					});
				} else {
					conn.query(`UPDATE cart SET quantity = '${qty - 1}' WHERE product_id = '${id}'`, err => {
						if (err) console.log(err);
					});
				}
			}
			return new Promise(resolve => {
				resolve("Finish");
			});
		} else {
			conn.query(`TRUNCATE TABLE cart`, err => {
				if (err) console.log(err);
			});
		}
	},
	checkout: async username => {
		// to retrieve a detail of product_id and quantity in cart
		const cartList = await getCartList();
		let stockEmpty = [];
		for (const x in cartList) {
			// to check if stock is available or not
			const stock = await checkStock(cartList[x].product_id, cartList[x].quantity);
			if (stock !== false) {
				conn.query(`INSERT INTO history (username, product_id, quantity) VALUES ('contoh', '${cartList[x].product_id}', '${cartList[x].quantity}')`, err => {
					if (err) console.log(err);
				});
				conn.query(`UPDATE product SET stock = ${stock} WHERE id = '${cartList[x].product_id}'`, err => {
					if (err) console.log(err);
				});
			} else if (stock === false) {
				stockEmpty.push(await outOfStock(cartList[x].product_id));
			}
		}
		conn.query(`TRUNCATE TABLE cart`, err => {
			if (err) console.log(err);
		});
		return new Promise(resolve => {
			resolve(stockEmpty);
		});
	},
};
