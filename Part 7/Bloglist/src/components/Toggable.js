import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { Button } from "semantic-ui-react";

const Toggable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);
	const handleClick = () => {
		setVisible(!visible);
	};
	useImperativeHandle(ref, () => {
		return {
			handleClick
		};
	});
	return (
		<>
			<div style={{ display: visible ? "" : "none" }}>{props.children}</div>
			<br />
			<Button data-cy='create-btn' onClick={handleClick}>
				{visible ? "Cancel" : "Create"}
			</Button>
		</>
	);
});
Toggable.propTypes = {
	children: PropTypes.node.isRequired
};

export default Toggable;
