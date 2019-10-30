import React, { useState } from "react";
import Statistics from "./Statistics";
import Buttons from "./Buttons";

const App = () => {
	const [good, setGood] = useState(0);
	const [bad, setBad] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [total, setTotal] = useState(0);
	const [positive, setPositive] = useState(0);
	const [average, setAverage] = useState(0);
	const calcOthers = () => {
		calculatePos();
		calculateAvg();
		calcTotal();
	};
	const handleGood = () => {
		setGood(good + 1);
		calcOthers();
	};
	const handleNeutral = () => {
		setNeutral(neutral + 1);
		calcOthers();
	};
	const handleBad = () => {
		setBad(bad + 1);
		calcOthers();
	};
	const calculateAvg = () => {
		setAverage(parseFloat((total / 3).toFixed(2)));
	};
	const calculatePos = () => {
		const calc = ((good / total) * 100).toFixed(2);
		setPositive(parseFloat(calc));
	};
	const calcTotal = () => {
		setTotal(total + 1);
	};
	const stats = {
		good,
		bad,
		neutral,
		total,
		average,
		positive
	};

	return (
		<div>
			<h1>Give Feedback</h1>
			<Buttons good={handleGood} bad={handleBad} neutral={handleNeutral} />
			<Statistics stats={stats} />
		</div>
	);
};

export default App;
