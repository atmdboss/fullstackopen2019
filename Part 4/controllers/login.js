const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const loginRouter = require("express").Router();
const User = require("../model/user");
const SECRET = require("../utils/config").SECRET;

loginRouter.post("/", async (request, response) => {
	const { body } = request;

	const user = await User.findOne({ username: body.username });
	const passwordCorrect =
		user === null
			? false
			: await bcrypt.compare(body.password, user.passwordHash);

	if (!(user && passwordCorrect)) {
		return response.status(401).json({
			error: "invalid username or password"
		});
	}

	const userForToken = {
		username: user.username,
		id: user._id
	};

	const token = jwt.sign(userForToken, SECRET);

	response
		.status(200)
		.send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
