import React, { useState } from "react";
import { createNewBlog } from "../reducers/blogReducer";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Form, Button, Header } from "semantic-ui-react";

const CreateBlog = ({ createNewBlog, blogRef }) => {
	const [blog, setBlog] = useState({ title: "", author: "", url: "" });
	const { title, author, url } = blog;
	const handleChange = event => {
		setBlog({ ...blog, [event.target.name]: event.target.value });
	};
	const postBlog = event => {
		event.preventDefault();
		if (!title || !author || !url) {
			window.alert("Please input all fields");
			return;
		}
		createNewBlog(blog);
		setBlog({ title: "", author: "", url: "" });
		blogRef.current.handleClick();
	};
	return (
		<>
			<Header as='h2'>Create new blogs</Header>

			<Form onSubmit={postBlog}>
				<Form.Group widths='equal'>
					<Form.Input
						fluid
						label='title'
						placeholder='Blog Title'
						type='text'
						id='title'
						name='title'
						value={title}
						data-cy='title'
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						label='author'
						placeholder='Blog Author'
						type='text'
						id='author'
						name='author'
						value={author}
						data-cy='author'
						onChange={handleChange}
					/>
					<Form.Input
						fluid
						label='url'
						placeholder='Blog URL'
						type='text'
						id='url'
						name='url'
						value={url}
						data-cy='url'
						onChange={handleChange}
					/>
				</Form.Group>

				<Button color='blue' type='submit'>
					Create blog
				</Button>
			</Form>
		</>
	);
};
CreateBlog.propTypes = {
	createNewBlog: PropTypes.func.isRequired,
	blogRef: PropTypes.object
};

export default connect(null, { createNewBlog })(CreateBlog);
