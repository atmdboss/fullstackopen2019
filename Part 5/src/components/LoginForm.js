import React from "react";

const LoginForm = ({ loggedOutUser, updateLogout, loginUser }) => {
	const { username, password } = loggedOutUser;
	return (
		<>
			<h2>Log in</h2>

			<form onSubmit={loginUser}>
				<label htmlFor='username'>
					Username:
					<input
						type='text'
						name='username'
						id='username'
						value={username}
						onChange={updateLogout}
					/>
				</label>
				<br />
				<label htmlFor='password'>
					Password:
					<input
						type='password'
						name='password'
						id='password'
						value={password}
						onChange={updateLogout}
					/>
				</label>
				<button type='submit'>Login</button>
			</form>
		</>
	);
};

export default LoginForm;
