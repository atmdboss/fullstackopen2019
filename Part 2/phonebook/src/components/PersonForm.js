import React from "react";

const PersonForm = ({ newPerson, addPerson, handleNewPerson }) => {
	const { name, number } = newPerson;
	return (
		<form onSubmit={addPerson}>
			<h2>Add new People</h2>
			<label htmlFor='name'>Name: </label>
			<input
				name='name'
				id='name'
				type='text'
				value={name}
				onChange={handleNewPerson}
			/>
			<br />
			<label htmlFor='number'>Number: </label>
			<input
				id='number'
				name='number'
				type='text'
				value={number}
				onChange={handleNewPerson}
			/>
			<button>Submit</button>
		</form>
	);
};

export default PersonForm;
