require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
	const connection = mongoose
		.connect(process.env.MONGODB_URI)
		.then((result) => console.log("Base de datos conectada"))
		.catch((err) => console.log("could not connect to database"));
};
