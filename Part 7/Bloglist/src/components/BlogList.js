import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Toggable from "./Toggable";
import CreateBlog from "./CreateBlog";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { initBlogs } from "../reducers/blogReducer";
import { Header, Menu, Table } from "semantic-ui-react";

const BlogList = ({ blogs, initBlogs }) => {
	useEffect(() => {
		initBlogs();
	}, []);
	const blogRef = React.createRef();
	return (
		<>
			<Header size='large'>Blogs</Header>
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Title</Table.HeaderCell>
						<Table.HeaderCell>Author</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{blogs
						.sort((a, b) => a.likes - b.likes)
						.map(blog => (
							<Table.Row key={blog.id}>
								<Table.Cell>
									<Menu.Item as={Link} to={`/blogs/${blog.id}`}>
										{blog.title}
									</Menu.Item>
								</Table.Cell>
								<Table.Cell>{blog.author}</Table.Cell>
							</Table.Row>
						))}
				</Table.Body>
			</Table>

			<Toggable ref={blogRef}>
				<CreateBlog blogRef={blogRef} />
			</Toggable>
		</>
	);
};
const mapStateToProps = ({ blogs }) => {
	return {
		blogs
	};
};
BlogList.propTypes = {
	blogs: PropTypes.array.isRequired,
	initBlogs: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { initBlogs })(BlogList);
