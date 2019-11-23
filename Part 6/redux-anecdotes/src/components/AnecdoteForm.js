import React from "react";
import { connect } from "react-redux";
import { useField } from "../hooks/index";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { createMessage, hideMessages } from "../reducers/notificationReducer";

const AnecdoteForm = props => {
	const { addAnecdote, createMessage, hideMessages } = props;
	const textField = useField("text");

	const handleSubmit = event => {
		event.preventDefault();
		addAnecdote(textField.input.value);
		createMessage(textField.input.value);
		setTimeout(() => {
			hideMessages();
		}, 5000);
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
	createMessage,
	hideMessages
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
