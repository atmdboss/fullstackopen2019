import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logIn, updateUserState } from "../reducers/userReducer";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

const LoginForm = props => {
	const { user, logIn, updateUserState, history } = props;

	const handleLogin = event => {
		event.preventDefault();
		logIn(user);
		history.push("/blogs");
	};
	const handleChange = event => {
		updateUserState({ ...user, [event.target.name]: event.target.value });
	};
	return (
		<Grid textAlign='center' style={{ height: "100vh" }} verticalAlign='middle'>
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='teal' textAlign='center'>
					Log-in to your account
				</Header>
				<Form onSubmit={handleLogin} size='large'>
					<Segment stacked>
						<Form.Input
							fluid
							icon='user'
							iconPosition='left'
							placeholder='Username'
							type='text'
							data-cy='username'
							name='username'
							onChange={handleChange}
						/>

						<Form.Input
							fluid
							icon='lock'
							iconPosition='left'
							placeholder='Password'
							type='password'
							name='password'
							data-cy='password'
							onChange={handleChange}
						/>

						<Button color='teal' fluid size='large'>
							Login
						</Button>
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	);
};
const mapStateToProps = ({ user }) => {
	return {
		user
	};
};
const mapDispatchToProps = {
	logIn,
	updateUserState
};
LoginForm.propTypes = {
	user: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
	logIn: PropTypes.func.isRequired,
	updateUserState: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
