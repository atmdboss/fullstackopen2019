import services from "../services/blogs";
import store from "../store";
import { showNotif, hideNotif } from "./notificationReducer";
export const removeBlogs = () => {
	return dispatch => {
		dispatch({
			type: "REMOVE_BLOGS"
		});
	};
};
export const initBlogs = () => {
	return async dispatch => {
		const data = await services.getBlogs();
		dispatch({
			type: "INIT_BLOGS",
			data
		});
	};
};

export const updateBlogs = (id, objBody, action) => {
	const chooseAction = () => {
		return action === "like"
			? services.update(id, objBody)
			: services.createComment(id, objBody);
	};
	return async dispatch => {
		try {
			const data = await chooseAction();
			dispatch({
				type: "UPDATE_BLOGS",
				data
			});
		} catch (error) {
			error.response.data.error === "invalid token"
				? store.dispatch(showNotif("You must be logged in to edit blogs"))
				: store.dispatch(showNotif(error.response.data.error));
			setTimeout(() => {
				store.dispatch(hideNotif());
			}, 5000);
		}
	};
};

export const createNewBlog = blog => {
	return async dispatch => {
		try {
			const data = await services.create(blog);
			dispatch({
				type: "CREATE_BLOG",
				data
			});
			store.dispatch(showNotif(`Blog Created`));
			setTimeout(() => {
				store.dispatch(hideNotif());
			}, 5000);
		} catch (error) {
			error.response.data.error === "invalid token"
				? store.dispatch(showNotif("You must be logged in to create blogs"))
				: store.dispatch(showNotif(error.response.data.error));
			setTimeout(() => {
				store.dispatch(hideNotif());
			}, 5000);
		}
	};
};

const blogReducer = (state = [], action) => {
	switch (action.type) {
		case "INIT_BLOGS":
			return action.data;
			break;
		case "REMOVE_BLOGS":
			return [];
			break;
		case "UPDATE_BLOGS":
			return state.map(blog =>
				blog.id === action.data.id ? action.data : blog
			);
			break;
		case "CREATE_BLOG":
			return [...state, action.data];
			break;
		default:
			return state;
			break;
	}
};

export default blogReducer;
