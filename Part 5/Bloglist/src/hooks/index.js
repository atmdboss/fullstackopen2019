import { useState } from "react";

export const useField = (type, id) => {
	const [value, setValue] = useState("");
	const onChange = event => {
		setValue(event.target.value);
	};
	const reset = () => {
		setValue("");
	};
	return {
		input: {
			value,
			type,
			onChange,
			id
		},
		reset
	};
};
