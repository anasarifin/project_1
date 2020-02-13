const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
	console.log(req.headers);
	const token = req.headers["usertoken"];
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.username = decoded.username;
		next();
	} catch (err) {
		console.log(err);
		res.json({
			msg: "Access denied!",
		});
	}
};
