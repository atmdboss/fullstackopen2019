export const showNotif = message => {
	return { type: "SHOW_NOTIFICATION", data: message };
};
export const hideNotif = () => {
	return { type: "HIDE_NOTIFICATION" };
};

const notificationReducer = (state = "", action) => {
	switch (action.type) {
		case "SHOW_NOTIFICATION":
			return action.data;
			break;
		case "HIDE_NOTIFICATION":
			return "";
			break;
		default:
			return state;
			break;
	}
};

export default notificationReducer;
