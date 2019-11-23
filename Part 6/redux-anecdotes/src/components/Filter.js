import React from "react";
import { connect } from "react-redux";
import { filter } from "../reducers/filterReducer";

const Filter = props => {
	const handleChange = event => {
		props.filter(event.target.value);
	};
	return (
		<div>
			Filter: <input type='text' onChange={handleChange} />
		</div>
	);
};

const mapDispatchToProps = {
	filter
};

export default connect(null, mapDispatchToProps)(Filter);
