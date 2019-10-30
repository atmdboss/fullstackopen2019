import React from "react";

const Part = ({ name, exercise }) => {
	return (
		<div>
			<h2>{name}</h2>
			<p>{exercise}</p>
		</div>
	);
};

export default Part;
