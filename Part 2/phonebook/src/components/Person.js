import React from "react";

const Person = ({ name, number, id, removePerson }) => {
	const remove = () => {
		if (
			window.confirm(
				`Are you sure you want to remove ${name} from your contacts?`
			)
		) {
			removePerson(id);
		}
	};
	return (
		<tr>
			<td>{name}</td>
			<td>{number}</td>
			<td>
				<button onClick={remove}>Delete</button>
			</td>
		</tr>
	);
};

export default Person;
