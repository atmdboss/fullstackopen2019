const initialState = {
	good: 0,
	ok: 0,
	bad: 0
};

const counterReducer = (state, action) => {
	if (!state) {
		return initialState;
	}

	switch (action.type) {
		case "GOOD":
			return { ...state, good: state.good + 1 };
			break;
		case "BAD":
			return { ...state, bad: state.bad + 1 };
			break;
		case "NEUTRAL":
			return { ...state, ok: state.ok + 1 };
			break;
		case "RESET":
			return initialState;
			break;
		default:
			return state;
			break;
	}
};

export default counterReducer;
