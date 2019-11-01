import React from "react";
import Person from "./Person";

const Persons = ({ persons, filtered }) => {
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
										key={person.id}
										name={person.name}
										number={person.number}
									/>
								))
						: persons.map(person => (
								<Person
									key={person.id}
									name={person.name}
									number={person.number}
								/>
						  ))}
				</tbody>
			</table>
		</>
	);
};

export default Persons;
