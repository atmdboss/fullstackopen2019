import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
	return (
		<div>
			{countries.map((country, i) => (
				<Country key={i} country={country} />
			))}
		</div>
	);
};

export default Countries;
