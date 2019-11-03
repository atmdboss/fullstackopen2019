import React, { useState, useEffect } from "react";
import database from "./database";
import Notification from "./components/Notification";
import Persons from "./components/Persons";
import FilterPerson from "./components/FilterPerson";
import PersonForm from "./components/PersonForm";

function App() {
	useEffect(() => {
		database.get().then(response => setPersons(response));
	}, []);
	const [filtered, setFiltered] = useState("");
	const [message, setMessage] = useState(null);
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
		database
			.remove(id)
			.then(() =>
				showMessage(
					"success",
					"delete",
					persons.find(person => person.id === id)
				)
			)
			.catch(() =>
				showMessage("error", "delete", persons.find(person => person.id === id))
			);
		setPersons(persons.filter(person => person.id !== id));
	};

	const handlePeople = () => {
		if (persons.findIndex(person => person.name === newPerson.name) === -1) {
			database
				.post(newPerson)
				.then(result => setPersons(persons.concat(result)))
				.catch(() => showMessage("error", "add", newPerson));
			showMessage("success", "add", newPerson);
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
					)
					.catch(() => showMessage("error", "edit", newPerson));
				showMessage("success", "edit", newPerson);
			}
		}
	};

	const showMessage = (type, action, person) => {
		if (type === "success") {
			if (action === "add") {
				setMessage({
					message: `${person.name} has been added to the list`,
					type
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			} else if (action === "edit") {
				setMessage({
					message: `Contact ${person.name} has been changed`,
					type
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			} else if (action === "delete") {
				setMessage({
					message: `Contact ${person.name} has been removed from your contacts`,
					type
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			}
		} else if (type === "error") {
			if (action === "add") {
				setMessage({
					message: `Something went worng. ${person.name} was not added`,
					type
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			} else if (action === "edit" || action === "delete") {
				setMessage({
					message: `Information on ${person.name} has already been removed`,
					type
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			}
		}
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<Notification message={message} />
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
