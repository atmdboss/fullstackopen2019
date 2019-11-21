import React from "react";
import { useField } from "../hooks/index";
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = ({ store }) => {
	const textField = useField("text");
	const handleSubmit = event => {
		event.preventDefault();
		store.dispatch(addAnecdote(textField.input.value));
		textField.reset();
	};
	return (
		<form onSubmit={handleSubmit}>
			<input {...textField.input} />
			<button type='submit'>Create</button>
		</form>
	);
};

export default AnecdoteForm;
