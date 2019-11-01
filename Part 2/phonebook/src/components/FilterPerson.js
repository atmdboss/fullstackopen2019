import React from "react";

const FilterPerson = ({ filtered, handleFilter }) => {
	return (
		<>
			<label htmlFor='filter'>Filter names: </label>
			<input type='text' id='filter' value={filtered} onChange={handleFilter} />
		</>
	);
};

export default FilterPerson;
