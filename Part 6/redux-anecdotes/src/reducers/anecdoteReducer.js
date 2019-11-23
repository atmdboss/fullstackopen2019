import anecdoteService from "../services/anecdotes";

// **************ACTION CREATORS*****************//
export const addAnecdote = content => {
	return async dispatch => {
		const anecdote = { content, votes: 0 };
		const newAnecdote = await anecdoteService.create(anecdote);
		dispatch({
			type: "ADD_ANECDOTE",
			data: newAnecdote
		});
	};
};
export const upvoteAnecdote = (anecdotes, id) => {
	return async dispatch => {
		const found = anecdotes.find(anecdote => anecdote.id === id);
		const updatedObj = { ...found, votes: found.votes + 1 };
		const updatedAnecdote = await anecdoteService.update(id, updatedObj);
		dispatch({
			type: "UPDATE_ANECDOTE",
			data: updatedAnecdote
		});
	};
};
export const initAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteService.getAll();
		dispatch({
			type: "INIT_ANECDOTES",
			data: anecdotes
		});
	};
};
// **************ACTION CREATORS*****************//

const updateState = (state, newAnecdote) => {
	return state.map(anecdote =>
		anecdote.id === newAnecdote.id ? newAnecdote : anecdote
	);
};

const reducer = (state = [], action) => {
	// console.log("state now: ", state);
	// console.log("action", action);
	switch (action.type) {
		case "ADD_ANECDOTE":
			return [...state, action.data];
			break;
		case "UPDATE_ANECDOTE":
			return updateState(state, action.data);
			break;
		case "INIT_ANECDOTES":
			return action.data;
			break;
		default:
			return state;
			break;
	}
};

export default reducer;
