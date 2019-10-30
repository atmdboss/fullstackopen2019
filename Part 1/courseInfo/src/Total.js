import React from "react";

const Total = ({ parts }) => {
	const sum = parts.reduce((acc, curr) => {
		return acc + curr.exercise;
	}, 0);
	return <div>Total: {sum}</div>;
};

export default Total;
