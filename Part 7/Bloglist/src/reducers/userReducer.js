import services from "../services/blogs";
import { hideNotif, showNotif } from "./notificationReducer";
import store from "../store";
const user = { username: "", password: "" };

export const updateUserState = data => {
	return dispatch => {
		dispatch({
			type: "UPDATE_USER",
			data
		});
	};
};

export const logIn = user => {
	return async dispatch => {
		try {
			const response = await services.login(user);
			dispatch({
				type: "LOG_IN",
				data: response
			});
			services.setToken(response.token);
			store.dispatch(showNotif("Logged in"));
			setTimeout(() => {
				store.dispatch(hideNotif());
			}, 5000);
		} catch (error) {
			console.log(error);
		}
	};
};

export const logOut = () => {
	return dispatch => {
		dispatch({
			type: "LOG_OUT"
		});
		store.dispatch(showNotif("Logged out"));
		setTimeout(() => {
			store.dispatch(hideNotif());
		}, 5000);
	};
};

const userReducer = (state = user, action) => {
	switch (action.type) {
		case "LOG_IN":
			return action.data;
			break;
		case "LOG_OUT":
			return user;
			break;
		case "UPDATE_USER":
			return action.data;
		default:
			return state;
			break;
	}
};

export default userReducer;
