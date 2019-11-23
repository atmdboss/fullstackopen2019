import React from "react";
import Anecdote from "./Anecdote";
import { connect } from "react-redux";

const AnecdoteList = props => {
	const { anecdotes } = props;
	return (
		<div>
			<h2>Anecdotes</h2>
			{anecdotes
				.sort((a, b) => a.votes - b.votes)
				.map(anecdote => {
					return (
						<Anecdote
							key={anecdote.id}
							id={anecdote.id}
							content={anecdote.content}
							votes={anecdote.votes}
						/>
					);
				})}
		</div>
	);
};
const anecdotesToShow = ({ filter, anecdotes }) => {
	if (!filter) {
		return anecdotes;
	}

	return anecdotes.filter(anecdote =>
		anecdote.content.toLowerCase().includes(filter.toLowerCase())
	);
};
const mapStateToProps = state => {
	return {
		anecdotes: anecdotesToShow(state)
	};
};
export default connect(mapStateToProps)(AnecdoteList);
