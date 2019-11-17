const usersRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../model/user");

usersRouter.get("/", async (request, response) => {
	const users = await User.find({}).populate("blogs");
	response.json(users.map(u => u.toJSON()));
});

usersRouter.get("/:id", async (request, response, next) => {
	const { id } = request.params;
	try {
		const user = await User.findById(id).populate("blogs");
		response.json(user.toJSON());
	} catch (error) {
		next(error);
	}
});

usersRouter.post("/", async (request, response, next) => {
	const { body } = request;

	if (!body.password || body.password.length < 3) {
		return response
			.status(400)
			.json({ error: "password must be 3 characters at least" });
	}

	const salt = await bcrypt.genSalt(10);
	const passwordHash = await bcrypt.hash(body.password, salt);

	try {
		const user = new User({
			name: body.name,
			username: body.username,
			passwordHash
		});
		const savedUser = await user.save();
		return response.status(201).json(savedUser.toJSON());
	} catch (error) {
		next(error);
	}
});

module.exports = usersRouter;
