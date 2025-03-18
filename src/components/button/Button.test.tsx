import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button component", () => {
  it("renders with the correct label", () => {
    render(<Button label="Click me" onClick={jest.fn()} />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("is disabled when the disabled prop is true", () => {
    render(<Button label="Click me" onClick={jest.fn()} disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("does not call onClick when disabled", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} disabled />);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
