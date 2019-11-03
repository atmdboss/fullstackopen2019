import axios from "axios";
const BASE_URL = "http://localhost:3001/persons";

const get = () => {
	const data = axios.get(BASE_URL);
	return data.then(result => result.data);
};
const post = obj => {
	const data = axios.post(BASE_URL, obj);
	return data.then(response => response.data);
};
const update = (id, obj) => {
	const data = axios.put(`${BASE_URL}/${id}`, obj);
	return data.then(response => response.data);
};
const remove = id => {
	return axios.delete(`${BASE_URL}/${id}`);
};

export default { get, post, update, remove };
