import React, { useState } from "react";
import Persons from "./components/Persons";
import FilterPerson from "./components/FilterPerson";
import PersonForm from "./components/PersonForm";

function App() {
	const [filtered, setFiltered] = useState("");
	const [persons, setPersons] = useState([]);
	const [newPerson, setNewPerson] = useState({ name: "", number: "" });
	const handleNewPerson = event => {
		setNewPerson({ ...newPerson, [event.target.name]: event.target.value });
	};
	const handleFilter = event => {
		setFiltered(event.target.value);
	};
	const addPerson = event => {
		event.preventDefault();
		if (newPerson.name === "" || newPerson.number === "") {
			alert("Please input a name AND a number");
		} else {
			persons.findIndex(person => person.name === newPerson.name) === -1
				? setPersons(persons.concat({ ...newPerson, id: persons.length + 1 }))
				: alert(`${newPerson.name} is already in the phonebook`);
		}

		setNewPerson({ name: "", number: "" });
	};
	return (
		<div>
			<h1>Phonebook</h1>
			<FilterPerson filtered={filtered} handleFilter={handleFilter} />
			<PersonForm
				newPerson={newPerson}
				addPerson={addPerson}
				handleNewPerson={handleNewPerson}
			/>
			<Persons filtered={filtered} persons={persons} />
		</div>
	);
}

export default App;
