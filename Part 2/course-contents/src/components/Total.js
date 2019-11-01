import React from "react";

const Total = ({ parts }) => {
	const sum = parts.reduce((acc, curr) => {
		return acc + curr.exercises;
	}, 0);
	return <div>Total number of exercises: {sum}</div>;
};

export default Total;
