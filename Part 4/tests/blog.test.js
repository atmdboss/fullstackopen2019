const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const blogs = require("../utils/blogList");
const Blog = require("../model/blog");

beforeEach(async () => {
	await Blog.deleteMany({});

	const blogObjects = blogs.map(blog => new Blog(blog));
	const promiseArray = blogObjects.map(blog => blog.save());
	await Promise.all(promiseArray);
});
describe("getting from db", () => {
	test("get all blogs", async () => {
		await api
			.get("/api/blogs")
			.expect(200)
			.expect("Content-Type", /application\/json/);
	});

	test("verify id is not mongoose _id", async () => {
		const returnedBlogs = await Blog.find({});
		const changedBlogs = returnedBlogs.map(blog => blog.toJSON());

		for (let blog of changedBlogs) {
			expect(blog.id).toBeDefined();
			expect(typeof blog.id).toEqual(String);
		}
	});
});

describe("adding to db", () => {
	test("adding new blog to db", async () => {
		const newBlog = {
			title: "Fake Title",
			author: "Fakey mcFakerton",
			url: "http://the-fakest-website-known-to-man.html",
			likes: 3
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const blogsAtEnd = await Blog.find({});
		const content = blogsAtEnd.map(blog => blog.author);

		expect(blogsAtEnd.length).toBe(blogs.length + 1);
		expect(content).toContain(newBlog.author);
	});

	test("add likes property of zero if ommitted", async () => {
		const newBlog = {
			title: "Fake title",
			author: "Fake Author",
			url: "http://fake_site.html"
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const blogs = await Blog.find({});
		const found = blogs.find(blog => blog.title === newBlog.title);

		expect(found.likes).toBeDefined();
	});

	test("if title and url are missing, 404", async () => {
		const newBlog = {
			author: "Fake Author"
		};

		await api
			.post("/api/blogs")
			.send(newBlog)
			.expect(400);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
