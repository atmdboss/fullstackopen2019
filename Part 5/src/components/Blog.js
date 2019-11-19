import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ loggedInUser, blog, id, updateBlog, removeBlog }) => {
	const [full, setFull] = useState(false);

	const showDelete =
		blog.user.username === loggedInUser.username ? true : false;

	const handleHide = () => {
		setFull(!full);
	};

	const handleLike = event => {
		event.stopPropagation();
		updateBlog(id, { ...blog, likes: blog.likes + 1 });
	};

	const handleDelete = event => {
		event.stopPropagation();
		removeBlog(id);
	};

	return (
		<div className='Blog' onClick={handleHide}>
			{blog.title} - {blog.author} <br />
			<span style={{ display: full ? "" : "none" }}>
				<br />
				<a href={blog.url}>Go to link</a>
				<br />
				{blog.likes}
				{blog.likes === 1 ? "Like" : "Likes"}{" "}
				<button onClick={handleLike}>Like</button>
				<br />
				Added by {blog.user.name}
				<br />
				<button
					style={{ display: showDelete ? "" : "none" }}
					onClick={handleDelete}>
					Delete
				</button>
			</span>
		</div>
	);
};

Blog.propTypes = {
	updateBlog: PropTypes.func.isRequired,
	removeBlog: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	blog: PropTypes.object.isRequired,
	loggedInUser: PropTypes.object.isRequired
};

export default Blog;
