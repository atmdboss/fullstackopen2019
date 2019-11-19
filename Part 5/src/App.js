import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import services from "./services/blogs";

function App() {
	const [loggedOutUser, setLoggedOutUser] = useState({
		username: "",
		password: ""
	});
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [userBlogs, setUserBlogs] = useState([]);
	const [message, setMessage] = useState(null);

	useEffect(() => {
		const user = window.localStorage.getItem("user");
		if (user) {
			const parsedUser = JSON.parse(user);
			setLoggedInUser(parsedUser);
			services.setToken(parsedUser.token);
		}
	}, []);
	useEffect(() => {
		const setUp = async () => {
			window.localStorage.setItem("user", JSON.stringify(loggedInUser));
			services.setToken(loggedInUser.token);
			const blogs = await services.getAll();
			setUserBlogs(blogs);
		};
		if (loggedInUser) {
			setUp();
		}
	}, [loggedInUser]);

	const updateLogout = event => {
		setLoggedOutUser({
			...loggedOutUser,
			[event.target.name]: event.target.value
		});
	};

	const createNewBlog = async blogObj => {
		try {
			const response = await services.create(blogObj);
			setUserBlogs(userBlogs.concat(response));
			showNotification(
				`${response.title} by ${response.author} added`,
				"success"
			);
		} catch (error) {
			showNotification(error.response.data.error, "err");
		}
	};

	const updateBlog = async (id, updatedBlog) => {
		try {
			const response = await services.update(id, updatedBlog);
			if (response.error) {
				showNotification(response.error, "err");
			}
			setUserBlogs(
				userBlogs.map(blog => {
					return blog.title === response.title &&
						blog.user.name === response.user.name
						? response
						: blog;
				})
			);
		} catch (error) {
			showNotification(error.response.data.error, "err");
		}
	};

	const removeBlog = async id => {
		try {
			if (window.confirm("Are you sure you want to delete this blog?")) {
				await services.remove(id);
				setUserBlogs(userBlogs.filter(blog => blog.id !== id));
				showNotification("Removed successfully", "success");
			}
		} catch (error) {
			showNotification(error.response.data.error, "err");
		}
	};

	const loginUser = async event => {
		event.preventDefault();
		try {
			const user = await services.login(loggedOutUser);
			setLoggedInUser(user);
			setLoggedOutUser({ username: "", password: "" });
			showNotification("Successfully logged in", "success");
		} catch (error) {
			showNotification(error.response.data.error, "err");
		}
	};

	const showNotification = (msg, type) => {
		setMessage({ msg, type });
		setTimeout(() => {
			setMessage(null);
		}, 5000);
	};
	const blogRef = React.createRef();
	return (
		<>
			<Notification message={message} />
			{loggedInUser === null ? (
				<LoginForm
					loginUser={loginUser}
					updateLogout={updateLogout}
					loggedOutUser={loggedOutUser}
				/>
			) : (
				<>
					<BlogList
						setUserBlogs={setUserBlogs}
						setLoggedInUser={setLoggedInUser}
						loggedInUser={loggedInUser}
						blogs={userBlogs}
						showNotification={showNotification}
						updateBlog={updateBlog}
						removeBlog={removeBlog}
					/>

					<Toggable ref={blogRef}>
						<CreateBlog
							showNotification={showNotification}
							blogRef={blogRef}
							createNewBlog={createNewBlog}
						/>
					</Toggable>
				</>
			)}
		</>
	);
}

export default App;
