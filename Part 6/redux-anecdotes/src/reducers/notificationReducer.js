const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case "SHOW_NOTIFICATION":
			return action.data;
			break;
		case "HIDE_NOTIFICATION":
			return null;
			break;
		default:
			return state;
			break;
	}
};
// **************ACTION CREATORS*****************//
export const upvoteMessage = (anecdotes, id) => {
	const found = anecdotes.find(anecdote => anecdote.id === id);
	return {
		type: "SHOW_NOTIFICATION",
		data: `You just voted "${found.content}"`
	};
};
export const createMessage = title => {
	return {
		type: "SHOW_NOTIFICATION",
		data: `You just created ${title}`
	};
};
export const hideMessages = () => {
	return {
		type: "HIDE_NOTIFICATION"
	};
};
// **************ACTION CREATORS*****************//
export default notificationReducer;
