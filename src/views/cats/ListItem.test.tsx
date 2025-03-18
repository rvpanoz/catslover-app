import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ListItem from "./ListItem";

describe("ListItem Component", () => {
  const mockItem = {
    id: "hwbt",
    url: "https://cdn2.thecatapi.com/images/cat123.jpg",
  };
  const mockOnClick = jest.fn();

  it("renders the image with correct attributes", () => {
    render(<ListItem item={mockItem} onClick={mockOnClick} />);

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockItem.url);
    expect(image).toHaveAttribute("alt", mockItem.id);
  });

  it("calls onClick when image is clicked", () => {
    render(<ListItem item={mockItem} onClick={mockOnClick} />);

    const image = screen.getByRole("img");
    fireEvent.click(image);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
