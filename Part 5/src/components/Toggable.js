import React, { useState, useImperativeHandle } from "react";

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
			<button onClick={handleClick}>{visible ? "Cancel" : "Create"}</button>
		</>
	);
});

export default Toggable;
