import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { initUsers } from "../reducers/allUsersReducer";
import { Link } from "react-router-dom";
import { Header, Menu, Table } from "semantic-ui-react";

const UserList = ({ initUsers, allUsers }) => {
	useEffect(() => {
		initUsers();
	}, []);
	return (
		<>
			<Header size='large'>Users</Header>
			<Table celled>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Blogs Added</Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{allUsers.map(user => {
						return (
							<Table.Row key={user.id}>
								<Table.Cell>
									<Menu.Item as={Link} to={`/users/${user.id}`}>
										{user.name}
									</Menu.Item>
								</Table.Cell>
								<Table.Cell>{user.blogs.length}</Table.Cell>
							</Table.Row>
						);
					})}
				</Table.Body>
			</Table>
		</>
	);
};
const mapStateToProps = ({ allUsers }) => {
	return {
		allUsers
	};
};
UserList.propTypes = {
	allUsers: PropTypes.array.isRequired,
	initUsers: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { initUsers })(UserList);
