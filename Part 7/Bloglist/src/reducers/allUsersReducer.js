import services from "../services/users";

export const initUsers = () => {
	return async dispatch => {
		try {
			const data = await services.getUsers();
			dispatch({
				type: "INIT_ALL_USERS",
				data
			});
		} catch (error) {
			console.log(error);
		}
	};
};
const allUsersReducer = (state = [], action) => {
	switch (action.type) {
	case "INIT_ALL_USERS":
		return action.data;
		break;
	default:
		return state;
		break;
	}
};
export default allUsersReducer;
