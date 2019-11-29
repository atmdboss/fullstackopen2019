import React from "react";
import PropTypes from "prop-types";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import User from "./components/User";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Message } from "semantic-ui-react";

function App({ blogs, allUsers, notification }) {
	const getBlog = id => {
		const found = blogs.find(blog => blog.id === id);
		return found;
	};
	const getUser = id => {
		const found = allUsers.find(user => user.id === id);
		return found;
	};
	return (
		<Container>
			{notification && <Message>{notification}</Message>}
			<Router>
				<Navbar />
				<Route
					exact
					path='/'
					render={({ history }) => <LoginForm history={history} />}
				/>
				<Route exact path='/users' render={() => <UserList />} />
				<Route
					exact
					path='/users/:id'
					render={({ match }) => <User user={getUser(match.params.id)} />}
				/>
				<Route exact path='/blogs' render={() => <BlogList />} />
				<Route
					exact
					path='/blogs/:id'
					render={({ match }) => (
						<Blog blog={getBlog(match.params.id)} id={match.params.id} />
					)}
				/>
			</Router>
		</Container>
	);
}
const mapStateToProps = ({ blogs, allUsers, notification }) => {
	return {
		blogs,
		allUsers,
		notification
	};
};
App.propTypes = {
	notification: PropTypes.string,
	blogs: PropTypes.array.isRequired,
	allUsers: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(App);
