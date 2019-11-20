import React from "react";
import { useField } from "../hooks/index";

const LoginForm = ({ loginUser }) => {
	const username = useField("text", "username");
	const password = useField("password", "password");
	const handleSubmit = event => {
		event.preventDefault();
		loginUser({
			username: username.input.value,
			password: password.input.value
		});
		username.reset();
		password.reset();
	};
	return (
		<>
			<h2>Log in</h2>

			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>
					Username:
					<input {...username.input} />
				</label>
				<br />
				<label htmlFor='password'>
					Password:
					<input {...password.input} />
				</label>
				<button type='submit'>Login</button>
			</form>
		</>
	);
};

export default LoginForm;
