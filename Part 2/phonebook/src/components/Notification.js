import React from "react";

const Notification = ({ message }) => {
	if (message === null) {
		return null;
	}
	const pickClass = () => {
		return message.type === "success" ? "success" : "error";
	};
	return (
		<div className={pickClass()}>
			<p>{message.message}</p>
		</div>
	);
};

export default Notification;
