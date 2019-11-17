import React, { useState } from "react";

const CreateBlog = ({ createNewBlog }) => {
	const [blog, setBlog] = useState({ title: "", author: "", url: "" });
	const { title, author, url } = blog;
	const handleChange = event => {
		setBlog({ ...blog, [event.target.name]: event.target.value });
	};
	const postBlog = event => {
		event.preventDefault();
		createNewBlog(blog);
		setBlog({ title: "", author: "", url: "" });
	};
	return (
		<>
			<h2>Create new blogs</h2>

			<form onSubmit={postBlog}>
				<label htmlFor='title'>
					Title:
					<input
						type='text'
						id='title'
						name='title'
						value={title}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label htmlFor='author'>
					Author:
					<input
						type='text'
						id='author'
						name='author'
						value={author}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label htmlFor='url'>
					Url:
					<input
						type='text'
						id='url'
						name='url'
						value={url}
						onChange={handleChange}
					/>
				</label>
				<br />
				<button type='submit'>Create blog</button>
			</form>
		</>
	);
};

export default CreateBlog;
