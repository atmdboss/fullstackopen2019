import React from "react";
import Blog from "./Blog";

const BlogList = ({
	blogs,
	loggedInUser,
	setLoggedInUser,
	setUserBlogs,
	showNotification,
	updateBlog,
	removeBlog
}) => {
	const handleLogout = () => {
		window.localStorage.removeItem("user");
		setLoggedInUser(null);
		setUserBlogs([]);
		showNotification("Logged out", "success");
	};
	return (
		<>
			<h2>Blogs</h2>
			<p>
				{loggedInUser.name} is logged in
				<button onClick={handleLogout}>logout</button>
			</p>
			<div>
				{blogs
					.sort((a, b) => a.likes - b.likes)
					.map(blog => (
						<Blog
							blog={blog}
							key={blog.id}
							id={blog.id}
							updateBlog={updateBlog}
							removeBlog={removeBlog}
							loggedInUser={loggedInUser}
						/>
					))}
			</div>
		</>
	);
};

export default BlogList;
