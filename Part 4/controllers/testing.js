const router = require("express").Router();
const User = require("../model/user");
const Blog = require("../model/blog");

router.post("/reset", async (request,response)=>{
	await User.deleteMany({});
	await Blog.deleteMany({});

	response.status(204).end()
});

module.exports = router;