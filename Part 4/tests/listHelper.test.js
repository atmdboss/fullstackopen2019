const listHelper = require("../utils/list_helper");
const blogs = require("../utils/blogList");

test("dummy returns one", () => {
	const blogs = [];

	const result = listHelper.dummy(blogs);
	expect(result).toBe(1);
});

describe("total likes", () => {
	test("when list has only one blog equals the likes of that", () => {
		const listWithOneBlog = [
			{
				_id: "5a422aa71b54a676234d17f8",
				title: "Go To Statement Considered Harmful",
				author: "Edsger W. Dijkstra",
				url:
					"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
				likes: 5,
				__v: 0
			}
		];

		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);
	});

	test("when list is empty is zero", () => {
		const result = listHelper.totalLikes([]);
		expect(result).toBe(0);
	});

	test("when list has multiple blogs is calculated right", () => {
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(36);
	});
});

describe("favorite blog", () => {
	test("of blogs should be one", () => {
		const result = listHelper.favoriteBlog(blogs);
		expect(result).toEqual(blogs[2]);
	});
});

describe("most", () => {
	test("blogs from authors", () => {
		const result = listHelper.mostBlogs(blogs);
		const answer = { author: "Robert C. Martin", blogs: 3 };
		expect(result).toEqual(answer);
	});
	test("likes of blogs", () => {
		const result = listHelper.mostLikes(blogs);
		const answer = { author: "Edsger W. Dijkstra", likes: 17 };
		expect(result).toEqual(answer);
	});
});
