const blogRouter = require("express").Router();
const Blog = require("../model/blog");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const SECRET = require("../utils/config").SECRET;

blogRouter.get("/", async (request, response, next) => {
	try {
		const data = await Blog.find({}).populate("user");
		const modifiedData = data.map(blog => blog.toJSON());
		return response.json(modifiedData);
	} catch (err) {
		next(err);
	}
});

blogRouter.get("/:id", async (request, response, next) => {
	try {
		const { id } = request.params;
		const blog = await Blog.findById(id);
		return response.json(blog.toJSON());
	} catch (error) {
		next(error);
	}
});

blogRouter.post("/", async (request, response, next) => {
	const { body, token } = request;

	try {
		const decodedToken = jwt.verify(token, SECRET);
		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: "token missing or invalid" });
		}

		const user = await User.findById(decodedToken.id);

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user._id
		});

		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();
		return response.status(201).json(savedBlog.toJSON());
	} catch (err) {
		next(err);
	}
});

blogRouter.put("/:id", async (request, response, next) => {
	try {
		const { id } = request.params;
		const modifiedBlog = request.body;
		const updatedBlog = await Blog.findByIdAndUpdate(id, modifiedBlog, {
			new: true
		});
		return response.json(updatedBlog.toJSON());
	} catch (err) {
		next(err);
	}
});

blogRouter.delete("/:id", async (request, response, next) => {
	const { id } = request.params;
	const { token } = request;

	try {
		const decodedToken = jwt.verify(token, SECRET);
		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: "token missing or invalid" });
		}
		const blog = await Blog.findById(id);

		if (blog.user.toString() === decodedToken.id.toString()) {
			await Blog.findByIdAndRemove(id);
			response.status(204).end();
		} else {
			return response
				.status(401)
				.json({ error: "You do not have authorization to delete this" });
		}
	} catch (err) {
		next(err);
	}
});

module.exports = blogRouter;
