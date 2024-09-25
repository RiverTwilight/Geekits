import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Mimetype, { Result } from "./index";
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";

// Mock the mimeTypes dictionary
jest.mock("./dictionary", () => ({
	html: "text/html",
	jpg: "image/jpeg",
	json: "application/json",
	txt: "text/plain",
	mp3: "audio/mpeg",
}));

describe("Mimetype component", () => {
	test("renders input field and updates on change", () => {
		render(<Mimetype />);
		const input = screen.getByLabelText(
			"输入类型/扩展名"
		) as HTMLInputElement;

		expect(input).toBeInTheDocument();

		fireEvent.change(input, { target: { value: "html" } });
		expect(input.value).toBe("html");
	});

	test("Result component renders correct output for different inputs", () => {
		const testCases = [
			{ input: "html", expected: ["html", "text/html"] },
			{ input: "image", expected: ["jpg", "image/jpeg"] },
			{ input: "json", expected: ["json", "application/json"] },
		];

		testCases.forEach(({ input, expected }) => {
			render(<Result kwd={input} />);

			const [expectedExtension, expectedType] = expected;

			expect(screen.getByText(expectedExtension)).toBeInTheDocument();
			expect(screen.getByText(expectedType)).toBeInTheDocument();

			// Clean up after each render
			cleanup();
		});
	});

	test("Result component renders nothing for empty input", () => {
		const { container } = render(<Result kwd="" />);
		expect(container.firstChild).toBeNull();
	});
});
