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
			.then(() => {
				showMessage(
					"success",
					persons.find(person => person.id === id),
					"delete"
				);
				setPersons(persons.filter(person => person.id !== id));
			})
			.catch(err => {
				const error = err.response.data.error;
				showMessage("error", error);
			});
	};

	const handlePeople = () => {
		if (persons.findIndex(person => person.name === newPerson.name) === -1) {
			database
				.post(newPerson)
				.then(result => {
					setPersons(persons.concat(result));
					showMessage("success", newPerson, "add");
				})
				.catch(err => {
					const error = err.response.data.error;
					showMessage("error", error);
				});
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
					.then(result => {
						setPersons(
							persons.map(person =>
								person.name === result.name ? result : person
							)
						);
						showMessage("success", newPerson, "edit");
					})
					.catch(err => {
						const error = err.response.data.error;
						showMessage("error", error);
					});
			}
		}
	};

	const showMessage = (type, object, action) => {
		if (type === "success") {
			if (action === "add") {
				setMessage({
					message: `${object.name} has been added to the list`,
					type
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			} else if (action === "edit") {
				setMessage({
					message: `Contact ${object.name} has been changed`,
					type
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			} else if (action === "delete") {
				setMessage({
					message: `Contact ${object.name} has been removed from your contacts`,
					type
				});
				setTimeout(() => {
					setMessage(null);
				}, 5000);
			}
		} else if (type === "error") {
			setMessage({ message: object.message, type });
			setTimeout(() => {
				setMessage(null);
			}, 5000);
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
