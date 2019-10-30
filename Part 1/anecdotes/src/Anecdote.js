import React from "react";

const Anecdote = ({ type, anecdotes, selected, upvote, pickNew }) => {
	let voteNums = [];
	anecdotes.forEach(anecdote => {
		voteNums = voteNums.concat(anecdote.vote);
	});
	const popular = anecdotes.find(
		anecdote => anecdote.vote === Math.max(...voteNums)
	);

	const random = anecdotes[selected];

	if (type === "popular") {
		return (
			<>
				<h1>Anecdote with most votes</h1>
				<p>{popular.content}</p>
				<p>Has {popular.vote} votes</p>
			</>
		);
	}

	return (
		<>
			<h1>Anecdote of the day</h1>
			<p>{random.content}</p>
			<p>Has {random.vote} votes</p>
			<button onClick={upvote}>Vote</button>
			<button onClick={pickNew}>New Anecdote</button>
		</>
	);
};

export default Anecdote;
