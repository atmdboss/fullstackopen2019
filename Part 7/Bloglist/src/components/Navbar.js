import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavLink, withRouter } from "react-router-dom";
import { logOut } from "../reducers/userReducer";
import { removeBlogs } from "../reducers/blogReducer";
import { Menu, Button } from "semantic-ui-react";

const Navbar = ({ user, logOut, removeBlogs, history }) => {
	const [activeItem, setActiveItem] = useState("blogs");

	if (!Object.prototype.hasOwnProperty.call(user, "token")) {
		return null;
	}
	const handleItemClick = event => {
		setActiveItem(event.target.name);
	};
	const handleLogout = () => {
		logOut();
		removeBlogs();
		history.push("/");
	};
	return (
		<Menu as='nav'>
			<Menu.Item
				as={NavLink}
				to='/blogs'
				name='blogs'
				active={activeItem === "blogs"}
				onClick={handleItemClick}>
				Blogs
			</Menu.Item>
			<Menu.Item
				as={NavLink}
				to='/users'
				name='users'
				active={activeItem === "users"}
				onClick={handleItemClick}>
				Users
			</Menu.Item>
			<Menu.Item style={{ marginLeft: "auto" }}>Welcome {user.name}</Menu.Item>

			<Button color='red' onClick={handleLogout}>
				Logout
			</Button>
		</Menu>
	);
};
const mapStateToProps = ({ user }) => {
	return {
		user
	};
};
const mapDispatchToProps = {
	logOut,
	removeBlogs
};

Navbar.propTypes = {
	user: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	logOut: PropTypes.func.isRequired,
	removeBlogs: PropTypes.func.isRequired
};

const RoutedNavbar = withRouter(Navbar);
export default connect(mapStateToProps, mapDispatchToProps)(RoutedNavbar);
