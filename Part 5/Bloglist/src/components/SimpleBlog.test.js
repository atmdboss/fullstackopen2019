import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

test("renders title,author and likes", () => {
	const testBlog = {
		author: "Test Author",
		likes: 3,
		title: "Test title"
	};
	const { container } = render(<SimpleBlog blog={testBlog} />);

	expect(container).toHaveTextContent("Test Author");
	expect(container).toHaveTextContent("Test title");
	expect(container).toHaveTextContent(3);
});

test("like button is called as many times as is clicked", () => {
	const testBlog = {
		author: "Test Author",
		likes: 3,
		title: "Test title"
	};
	const mockHandler = jest.fn();

	const { container } = render(
		<SimpleBlog blog={testBlog} onClick={mockHandler} />
	);
	const button = container.querySelector(".click-button");
	fireEvent.click(button);
	fireEvent.click(button);

	expect(mockHandler.mock.calls.length).toBe(2);
});

describe("Toggle", () => {
	const testBlog = {
		author: "Test Author",
		likes: 3,
		title: "Test title"
	};

	test("at start likes are not displayed", () => {
		const { container } = render(<SimpleBlog blog={testBlog} />);

		const likeDiv = container.querySelector(".like-div");

		expect(likeDiv).toHaveStyle("display: none");
	});

	test("after clicking the button, children are displayed", () => {
		const { container } = render(<SimpleBlog blog={testBlog} />);

		const titleDiv = container.querySelector(".title-div");
		fireEvent.click(titleDiv);

		const likeDIv = container.querySelector(".like-div");
		expect(likeDIv).not.toHaveStyle("display: none");
	});
});
