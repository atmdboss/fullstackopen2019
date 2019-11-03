import React, { useState, useEffect } from "react";
import database from "./database";
import Persons from "./components/Persons";
import FilterPerson from "./components/FilterPerson";
import PersonForm from "./components/PersonForm";

function App() {
	useEffect(() => {
		database.get().then(response => setPersons(response));
	}, []);
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
			handlePeople();
		}

		setNewPerson({ name: "", number: "" });
	};

	const removePerson = id => {
		database.remove(id);
		setPersons(persons.filter(person => person.id !== id));
	};

	const handlePeople = () => {
		if (persons.findIndex(person => person.name === newPerson.name) === -1) {
			database
				.post(newPerson)
				.then(result => setPersons(persons.concat(result)));
		} else {
			if (
				window.confirm(
					`${newPerson.name} is already in the phonebook. Would You like to update their contact info?`
				)
			) {
				database
					.update(
						persons.find(person => person.name === newPerson.name).id,
						newPerson
					)
					.then(result =>
						setPersons(
							persons.map(person =>
								person.name === result.name ? result : person
							)
						)
					);
			}
		}
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
			<Persons
				filtered={filtered}
				persons={persons}
				removePerson={removePerson}
			/>
		</div>
	);
}

export default App;
