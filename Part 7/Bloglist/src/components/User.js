import React from "react";
import PropTypes from "prop-types";
import { List, Header } from "semantic-ui-react";

const User = ({ user }) => {
	if (!user) {
		return null;
	}
	return (
		<div>
			<Header size='huge'>{user.name.toUpperCase()}</Header>
			<Header size='medium'>Added blogs</Header>
			<div>
				<List as='ul' divided verticalAlign='middle'>
					{user.blogs.map(blog => (
						<List.Item as='li' key={blog.id}>
							<List.Content>
								<List.Description>{blog.title}</List.Description>
							</List.Content>
						</List.Item>
					))}
				</List>
			</div>
		</div>
	);
};
User.propTypes = {
	user: PropTypes.object.isRequired
};

export default User;
