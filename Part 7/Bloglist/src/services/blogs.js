import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
	token = `bearer ${newToken}`;
};

const getBlogs = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const create = async newObject => {
	const config = {
		headers: { Authorization: token }
	};

	const response = await axios.post(baseUrl, newObject, config);
	return response.data;
};

const update = async (id, newObject) => {
	const config = {
		headers: { Authorization: token }
	};

	const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
	return response.data;
};
const createComment = async (id, newObject) => {
	const response = await axios.put(`${baseUrl}/${id}/comments`, newObject);
	return response.data;
};
const remove = async id => {
	const config = {
		headers: { Authorization: token }
	};

	const response = await axios.delete(`${baseUrl}/${id}`, config);
	return response.data;
};
const login = async user => {
	const response = await axios.post("/api/login", user);
	return response.data;
};

export default {
	getBlogs,
	login,
	setToken,
	create,
	createComment,
	update,
	remove
};
