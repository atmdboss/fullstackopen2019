import React from "react";
import Weather from "./Weather";

const CountryFull = ({ country, weather }) => {
	return (
		<div>
			<div>
				<h1>{country.name}</h1>
				<p>Capital: {country.capital}</p>
				<p>Population: {country.population}</p>
				<h3>Languages</h3>
				<ul>
					{country.languages.map((language, i) => (
						<li key={i}>{language.name}</li>
					))}
				</ul>
				<img src={country.flag} alt={`Flag of ${country.name}`} />
				{weather !== "" ? <Weather weather={weather} /> : ""}
			</div>
		</div>
	);
};

export default CountryFull;
