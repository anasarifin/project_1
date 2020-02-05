const login = require("../models/login");

module.exports = {
	login: (req, res) => {
		const username = req.body.username;
		const password = req.body.password;
		login.login(username, password).then(resolve => {
			res.json({ token: resolve });
		});
	},
	register: (req, res) => {
		const username = req.body.username;
		const password = req.body.password;

		login.register(username, password).then(resolve => {
			res.json(resolve);
		});
	}
};