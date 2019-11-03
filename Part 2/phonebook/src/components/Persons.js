import React from "react";
import Person from "./Person";

const Persons = ({ persons, filtered, removePerson }) => {
	return (
		<>
			<h2>People</h2>
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Number</th>
					</tr>
				</thead>
				<tbody>
					{filtered
						? persons
								.filter(person =>
									person.name.toLowerCase().includes(filtered.toLowerCase())
								)
								.map(person => (
									<Person
										id={person.id}
										key={person.id}
										name={person.name}
										number={person.number}
										removePerson={removePerson}
									/>
								))
						: persons.map(person => (
								<Person
									id={person.id}
									key={person.id}
									name={person.name}
									number={person.number}
									removePerson={removePerson}
								/>
						  ))}
				</tbody>
			</table>
		</>
	);
};

export default Persons;
