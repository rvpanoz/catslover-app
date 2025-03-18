import React from "react";
import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  it("renders the title correctly", () => {
    const testTitle = "Catslover";
    render(<Header title={testTitle} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });
});
