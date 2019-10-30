import React, { useState } from "react";
import Anecdote from "./Anecdote";

let anecdotes = [
	{ content: "If it hurts, do it more often", vote: 0 },
	{
		content: "Adding manpower to a late software project makes it later!",
		vote: 0
	},
	{
		content:
			"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
		vote: 0
	},
	{
		content:
			"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
		vote: 1
	},
	{ content: "Premature optimization is the root of all evil.", vote: 0 },
	{
		content:
			"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
		vote: 0
	}
];

const App = () => {
	const [selected, setSelected] = useState(0);
	const [anecdotez, setAnecdotez] = useState(anecdotes);

	const upvote = () => {
		const updatedAnecdotes = anecdotez.map((anecdote, idx) => {
			if (idx === selected) {
				return { ...anecdote, vote: anecdote.vote + 1 };
			}
			return anecdote;
		});
		setAnecdotez(updatedAnecdotes);
	};
	const pickNew = () => {
		const randNum = Math.floor(Math.random() * anecdotes.length);
		setSelected(randNum);
	};

	return (
		<div>
			<Anecdote
				upvote={upvote}
				pickNew={pickNew}
				selected={selected}
				type='daily'
				anecdotes={anecdotez}
			/>
			<Anecdote type='popular' anecdotes={anecdotez} />
		</div>
	);
};

export default App;
