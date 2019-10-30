import React from "react";
import Button from "./Button";

const Buttons = ({ good, bad, neutral }) => {
	return (
		<div>
			<Button text='Good' handleClick={good} />
			<Button text='Neutral' handleClick={neutral} />
			<Button text='Bad' handleClick={bad} />
		</div>
	);
};

export default Buttons;
