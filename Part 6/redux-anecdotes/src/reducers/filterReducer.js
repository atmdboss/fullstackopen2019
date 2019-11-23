const filterReducer = (state = "", action) => {
	switch (action.type) {
		case "FILTER":
			return action.data;
			break;
		default:
			return state;
			break;
	}
};
export const filter = value => {
	return {
		type: "FILTER",
		data: value
	};
};

export default filterReducer;
