import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Confirmation from "./Confirmation";

describe("Confirmation component", () => {
  it("renders with the correct text", () => {
    render(
      <Confirmation
        text="Are you sure?"
        onConfirm={jest.fn()}
        onAbort={jest.fn()}
      />
    );
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
  });

  it("calls onConfirm when the confirm button is clicked", () => {
    const handleConfirm = jest.fn();
    render(
      <Confirmation
        text="Are you sure?"
        onConfirm={handleConfirm}
        onAbort={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText("Yes, I'm sure"));
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  it("calls onAbort when the cancel button is clicked", () => {
    const handleAbort = jest.fn();
    render(
      <Confirmation
        text="Are you sure?"
        onConfirm={jest.fn()}
        onAbort={handleAbort}
      />
    );
    fireEvent.click(screen.getByText("No, cancel"));
    expect(handleAbort).toHaveBeenCalledTimes(1);
  });
});
