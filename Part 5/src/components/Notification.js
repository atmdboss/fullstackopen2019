import React from "react";

const Notification = ({ message }) => {
	const chooseType = () => {
		return message.type === "err" ? "error" : "success";
	};
	return message !== null ? (
		<div className={`notification ${chooseType()}`}>{message.msg}</div>
	) : (
		""
	);
};

export default Notification;
