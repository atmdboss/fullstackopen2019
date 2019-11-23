import React from "react";
import { connect } from "react-redux";
import { upvoteAnecdote } from "../reducers/anecdoteReducer";
import { upvoteMessage, hideMessages } from "../reducers/notificationReducer";

const Anecdote = props => {
	const {
		id,
		content,
		votes,
		anecdotes,
		upvoteAnecdote,
		upvoteMessage,
		hideMessages
	} = props;
	const handleVote = () => {
		upvoteAnecdote(anecdotes, id);
		upvoteMessage(anecdotes, id);
		setTimeout(() => {
			hideMessages();
		}, 5000);
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
	upvoteMessage,
	hideMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(Anecdote);
