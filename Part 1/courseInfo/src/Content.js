import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
	const [first, second, third] = parts;
	return (
		<div>
			<Part name={first.name} exercise={first.exercise} />
			<Part name={second.name} exercise={second.exercise} />
			<Part name={third.name} exercise={third.exercise} />
		</div>
	);
};

export default Content;
