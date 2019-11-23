import React from "react";
import { connect } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const Anecdote = ({
	id,
	content,
	votes,
	anecdotes,
	upvoteAnecdote,
	setNotification
}) => {
	const handleVote = () => {
		upvoteAnecdote(anecdotes, id);
		setNotification(`You upvoted "${content}"`, 5);
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
const mapStateToProps = state => {
	return {
		anecdotes: state.anecdotes
	};
};
const mapDispatchToProps = {
	upvoteAnecdote,
	setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(Anecdote);
