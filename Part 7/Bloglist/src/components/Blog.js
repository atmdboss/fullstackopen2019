import React, { useState } from "react";
import PropTypes from "prop-types";
import { updateBlogs } from "../reducers/blogReducer";
import { connect } from "react-redux";
import {
	Button,
	Icon,
	Label,
	Form,
	Header,
	Segment,
	Comment
} from "semantic-ui-react";

const Blog = ({ blog, id, updateBlogs }) => {
	const [comment, setComment] = useState("");
	const handleComment = event => {
		event.preventDefault();
		updateBlogs(id, { comment }, "comment");
		setComment("");
	};
	const handleLike = () => {
		updateBlogs(id, { ...blog, likes: blog.likes + 1 }, "like");
	};
	return (
		<div>
			<Segment>
				<Header size='huge'>
					{blog.title} - {blog.author}
				</Header>
				<Button as='a' href={blog.url}>
					Checkout link
				</Button>

				<Button as='div' labelPosition='right'>
					<Button onClick={handleLike} color='blue'>
						<Icon name='heart' />
						Like
					</Button>
					<Label as='a' basic color='blue' pointing='left'>
						{blog.likes}
					</Label>
				</Button>
				<small>Added by {blog.user.name}</small>
			</Segment>

			<Comment.Group>
				<Header as='h3' dividing>
					Comments
				</Header>
				{blog.comments.map((comment, index) => (
					<Comment key={index}>
						<Comment.Content>
							<Comment.Text>{comment}</Comment.Text>
						</Comment.Content>
					</Comment>
				))}

				<Form onSubmit={handleComment}>
					<Form.Field>
						<Form.TextArea
							fluid
							id='comment'
							placeholder='Enter comment'
							style={{ minHeight: 100 }}
							value={comment}
							data-cy='comment'
							onChange={event => setComment(event.target.value)}
						/>
					</Form.Field>
					<Button
						content='Add Comment'
						labelPosition='left'
						icon='edit'
						primary
					/>
				</Form>
			</Comment.Group>
		</div>
	);
};

Blog.propTypes = {
	id: PropTypes.string.isRequired,
	blog: PropTypes.object.isRequired,
	updateBlogs: PropTypes.func.isRequired
};

export default connect(null, { updateBlogs })(Blog);
