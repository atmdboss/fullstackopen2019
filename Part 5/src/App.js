import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
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
			setLoggedInUser(JSON.parse(user));
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
					/>

					<CreateBlog createNewBlog={createNewBlog} />
				</>
			)}
		</>
	);
}

export default App;
