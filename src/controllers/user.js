const user = require("../models/user");

function helper(data) {
	const json = {};
	json.username = data[0];
	json.total_items = data[1].reduce((sum, x) => {
		return (sum += 1 * x.quantity);
	}, 0);
	json.total_price = data[1].reduce((sum, x) => {
		return (sum += x.price * x.quantity);
	}, 0);
	json.item_list = data[1];
	return json;
}
function filter(data1, data2) {
	const outOfStock = data2.map(x => (x = x.product_id));
	return new Promise(resolve => {
		resolve(data1.filter(x => !outOfStock.includes(x.product_id)));
	});
}

module.exports = {
	getCart: (req, res) => {
		const username = req.params.username;
		const page = req.params.page;
		const sort = req.params.sort;
		user.getCart(username, page, sort).then(resolve => {
			res.json(helper(resolve));
		});
	},
	addCart: (req, res) => {
		const username = req.username;
		const data = req.body;
		user.addCart(username, data).then(() => {
			res.redirect(301, "/user/" + username);
		});
	},
	reduceCart: (req, res) => {
		const username = req.username;
		const data = req.body;
		user.reduceCart(username, data).then(() => {
			res.redirect(301, "/user/" + username);
		});
	},
	checkout: (req, res) => {
		const username = req.username;
		// const password = req.body.password
		user.getCart(username).then(resolve => {
			resolve[1].forEach(x => {
				delete x.updated_at;
			});
			user.checkout(username).then(async resolve2 => {
				resolve2.forEach(x => {
					delete x.updated_at;
				});
				const filterBuy = await filter(resolve[1], resolve2);
				const payment = { status: "Transaction success", purchased_date: new Date().toISOString(), ...helper([username, filterBuy]) };
				payment.item_bought = payment.item_list;
				delete payment.item_list;
				payment.out_of_stock = resolve2;
				res.json(payment);
			});
		});
	},
};
