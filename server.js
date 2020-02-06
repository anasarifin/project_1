const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const router = require("./src/routes/index.js");
const cors = require("cors");
require("dotenv").config();

app.use("/public", express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api/v1", router);
const corsOptions = {
	origin: "http://localhost:9999",
	optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.listen(process.env.SERVER_PORT, () => {
	console.log(`\n Server is running on port ${process.env.SERVER_PORT} ...\n`);
});
