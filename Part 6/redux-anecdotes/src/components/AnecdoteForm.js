import React from "react";
import { connect } from "react-redux";
import { useField } from "../hooks/index";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = ({ addAnecdote, setNotification }) => {
	const textField = useField("text");

	const handleSubmit = event => {
		event.preventDefault();
		addAnecdote(textField.input.value);
		setNotification(`You added "${textField.input.value}"`, 5);
		textField.reset();
	};

	return (
		<>
			<h2>create new</h2>
			<form onSubmit={handleSubmit}>
				<input {...textField.input} />
				<button type='submit'>Create</button>
			</form>
		</>
	);
};

const mapDispatchToProps = {
	addAnecdote,
	setNotification
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
