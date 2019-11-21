import React from "react";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";

const Anecdote = ({ id, content, votes, store }) => {
	const handleVote = () => {
		store.dispatch(upvoteAnecdote(store, id));
	};
	return (
		<div>
			<div>{content}</div>
			<div>
				has {votes} {votes === 1 ? "vote" : "votes"}
			</div>
			<button onClick={handleVote}>Vote</button>
		</div>
	);
};

const AnecdoteList = ({ store }) => {
	return (
		<div>
			{store
				.getState()
				.sort((a, b) => a.votes - b.votes)
				.map(anecdote => (
					<Anecdote
						key={anecdote.id}
						id={anecdote.id}
						content={anecdote.content}
						votes={anecdote.votes}
						store={store}
					/>
				))}
		</div>
	);
};

export default AnecdoteList;
