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
		const query = { username: req.params.username || req.username, ...req.query };
		user.getCart(query).then(resolve => {
			res.json(resolve);
		});
	},
	addCart: (req, res) => {
		user.addCart(req.body.id).then(() => {
			res.json("Success");
		});
	},
	reduceCart: (req, res) => {
		user.reduceCart(req.body.id).then(() => {
			res.json("Success");
		});
	},
	checkout: (req, res) => {
		user.getCart(req.username).then(resolve => {
			resolve[1].forEach(x => {
				delete x.updated_at;
			});
			user.checkout(req.username).then(async resolve2 => {
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
