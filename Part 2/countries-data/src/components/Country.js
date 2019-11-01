import React, { useState } from "react";
import CountryFull from "./CountryFull";
import axios from "axios";
const API_KEY = "3e9b197120a9606055de735db1e2b431";

const Country = ({ country }) => {
	const [showFull, setShowFull] = useState(false);
	const [weather, setWeather] = useState("");

	const handleClick = async () => {
		setShowFull(!showFull);
		const data = await axios.get(
			`http://api.openweathermap.org/data/2.5/weather?q=${country.name}&APPID=${API_KEY}`
		);
		setWeather(data.data);
	};
	return (
		<div>
			{showFull ? (
				<CountryFull weather={weather} country={country} />
			) : (
				<span>{country.name} </span>
			)}
			<span>
				<button onClick={handleClick}>{showFull ? "Hide" : "Show"}</button>
			</span>
		</div>
	);
};

export default Country;
