import React from "react";
import Statistic from "./Statistic";

const Statistics = ({ stats }) => {
	const { good, bad, neutral, total, positive, average } = stats;
	if (good === 0 && bad === 0 && neutral === 0) {
		return <div>No feedback given</div>;
	}
	return (
		<>
			<h2>Statistics</h2>
			<table>
				<tbody>
					<Statistic text='Good' value={good} />
					<Statistic text='Neutral' value={neutral} />
					<Statistic text='Bad' value={bad} />
					<Statistic text='Total' value={total} />
					<Statistic text='Average' value={average} />
					<Statistic text='Positive Percent' value={`${positive}%`} />
				</tbody>
			</table>
		</>
	);
};

export default Statistics;
