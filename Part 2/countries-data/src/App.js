import React, { useState, useEffect } from "react";
import SearchField from "./components/SearchField";
import Countries from "./components/Countries";
import axios from "axios";

function App() {
	const [shownCountries, setShownCountries] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		axios
			.get(`https://restcountries.eu/rest/v2/name/${search}`)
			.then(response => {
				if (response.data.length > 0 && response.data.length < 11) {
					setShownCountries(response.data);
				} else {
					alert("Enter more letters to narrow your search");
				}
			});
	}, [search]);
	const handleSearch = event => {
		setSearch(event.target.value);
	};
	return (
		<div>
			<SearchField value={search} handleSearch={handleSearch} />
			<Countries countries={shownCountries} />
		</div>
	);
}

export default App;
