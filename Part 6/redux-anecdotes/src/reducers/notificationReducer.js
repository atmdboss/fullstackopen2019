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
export const setNotification = (message, time) => {
	return async dispatch => {
		dispatch({
			type: "SHOW_NOTIFICATION",
			data: message
		});
		setTimeout(() => {
			dispatch({
				type: "HIDE_NOTIFICATION"
			});
		}, time.toFixed(2) * 1000);
	};
};
// **************ACTION CREATORS*****************//
export default notificationReducer;
