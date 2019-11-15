const dummy = blogs => {
	return 1;
};

const totalLikes = blogs => {
	return blogs.length === 0
		? 0
		: blogs.reduce((acc, curr) => {
				return acc + curr.likes;
		  }, 0);
};

const favoriteBlog = blogs => {
	return blogs.find(
		blog => blog.likes === Math.max(...blogs.map(blog => blog.likes))
	);
};

const mostBlogs = blogs => {
	const authors = {};
	let authorsArr = [];
	for (let blog of blogs) {
		authors[blog.author] = authors[blog.author] + 1 || 1;
	}
	for (let author in authors) {
		authorsArr = authorsArr.concat({ author, blogs: authors[author] });
	}
	const blogNums = authorsArr.map(author => author.blogs);
	return authorsArr.find(author => author.blogs === Math.max(...blogNums));
};

const mostLikes = blogs => {
	let authorNames = [];
	let sortedAuthors = [];
	for (let blog of blogs) {
		if (authorNames.indexOf(blog.author) === -1) {
			authorNames = authorNames.concat(blog.author);
		}
	}
	for (let author of authorNames) {
		sortedAuthors.push(blogs.filter(blog => blog.author === author));
	}
	const reducedAuthors = sortedAuthors.map(authorArr => {
		const likes = authorArr.reduce((acc, curr) => acc + curr.likes, 0);
		return { author: authorArr[0].author, likes };
	});
	return reducedAuthors.find(
		author =>
			author.likes === Math.max(...reducedAuthors.map(author => author.likes))
	);
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
};
