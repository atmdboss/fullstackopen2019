import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
	render,
	waitForElement,
	waitForDomChange
} from "@testing-library/react";
jest.mock("./services/blogs");
import App from "./App";

describe("<App />", () => {
	test("if no user logged, blogs are not rendered", async () => {
		const component = render(<App />);
		component.rerender(<App />);

		await waitForElement(() => component.getByText("Login"));

		const blog = component.container.querySelector(".Blog");
		expect(blog).not.toBeInTheDocument();
	});

	test("if logged in, show blogs", async () => {
		const user = {
			username: "tester",
			token: "1231231214",
			name: "Donald Tester"
		};

		const component = render(<App />);
		component.rerender(<App />);

		localStorage.setItem("user", JSON.stringify(user));

		//Timed out in waitForElement
		//I have googled the hells out of this problem and can't find a way to get around it
		//I feel strongly that this would work if waitForElement wasn't stuck, but i have no way to test that hypothesis
		await waitForElement(() => component.container.querySelector(".Blog"));

		const blogs = component.container.querySelectorAll(".Blog");

		expect(blogs.length).toBe(3);

		expect(component.container).toHaveTextContent("React patterns");
		expect(component.container).toHaveTextContent(
			"Go To Statement Considered Harmful"
		);
		expect(component.container).toHaveTextContent("Canonical string reduction");
	});
});
