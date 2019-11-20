import React from "react";

const SimpleBlog = ({ blog, onClick }) => {
	const [visible, setVisible] = React.useState(false);
	const flipVisible = () => {
		setVisible(!visible);
	};
	return (
		<div>
			<div className='title-div' onClick={flipVisible}>
				{blog.title} {blog.author}
			</div>
			<div className='like-div' style={{ display: visible ? "" : "none" }}>
				blog has {blog.likes} likes
				<button className='click-button' onClick={onClick}>
					like
				</button>
			</div>
		</div>
	);
};

export default SimpleBlog;
