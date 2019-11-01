import React from "react";

const SearchField = ({ value, handleSearch }) => {
	return (
		<>
			<label htmlFor='search'>Find Countries: </label>
			<input id='search' type='text' value={value} onChange={handleSearch} />
		</>
	);
};

export default SearchField;
