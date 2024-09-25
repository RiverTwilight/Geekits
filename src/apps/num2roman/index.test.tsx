import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Converter from "./index";

jest.mock("./api", () => ({
	__esModule: true,
	default: (num: number) => {
		const mockRoman: { [key: number]: string } = {
			1: "I",
			42: "XLII",
			3999: "MMMCMXCIX",
		};
		return mockRoman[num] || "";
	},
}));

describe("Converter component", () => {
	it("renders without crashing", () => {
		render(<Converter />);
		expect(screen.getByTestId("roman-numeral-input")).toBeInTheDocument();
	});

	it("converts 1 to I", () => {
		render(<Converter />);
		const input = screen.getByLabelText("输入整数");
		fireEvent.change(input, { target: { value: "1" } });
		expect(screen.getByText("I")).toBeInTheDocument();
	});

	it("converts 42 to XLII", () => {
		render(<Converter />);
		const input = screen.getByLabelText("输入整数");

		fireEvent.change(input, { target: { value: "42" } });
		expect(screen.getByText("XLII")).toBeInTheDocument();
	});

	it("converts 3999 to MMMCMXCIX", () => {
		render(<Converter />);
		const input = screen.getByLabelText("输入整数");
		fireEvent.change(input, { target: { value: "3999" } });
		expect(screen.getByText("MMMCMXCIX")).toBeInTheDocument();
	});
});
