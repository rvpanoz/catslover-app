import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal component", () => {
  it("renders when isOpen is true", () => {
    render(
      <Modal
        title="Test Modal"
        content={<p>Modal content</p>}
        isOpen={true}
        onClose={jest.fn()}
      />
    );
    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Modal content")).toBeInTheDocument();
  });

  it("does not render when isOpen is false", () => {
    render(
      <Modal
        title="Test Modal"
        content={<p>Modal content</p>}
        isOpen={false}
        onClose={jest.fn()}
      />
    );
    expect(screen.queryByText("Test Modal")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <Modal
        title="Test Modal"
        content={<p>Modal content</p>}
        isOpen={true}
        onClose={handleClose}
      />
    );
    fireEvent.click(screen.getByRole("button"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
