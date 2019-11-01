import React from "react";

const Weather = ({ weather }) => {
	return (
		<div>
			<h3>Weather in {weather.name}</h3>
			<p>Temperature: {weather.main.temp} kelvin</p>
			<img
				src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
				alt='Weather icon'
			/>
			<p>Description: {weather.weather[0].description}</p>
			<p>Wind Speed: {weather.wind.speed} kph</p>
		</div>
	);
};

export default Weather;
