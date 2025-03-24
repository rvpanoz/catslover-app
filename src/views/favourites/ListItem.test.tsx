import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ListItem from "./ListItem";
import { Favourite } from "../../types/favouritesTypes";

describe("ListItem Component", () => {
  const mockItem: Favourite = {
    id: "995",
    created_at: "2025-03-17T12:00:00Z",
    user_id: "hwbt-009",
    image_id: "cat009",
    sub_id: "hwtv",
    image: {
      id: "cat009",
      url: "https://example.com/cat.jpg",
    },
  };

  const mockOnRemove = jest.fn();

  it("renders correctly with provided data", () => {
    render(<ListItem item={mockItem} onRemove={mockOnRemove} />);

    expect(screen.getByText(/Identity: cat009/i)).toBeInTheDocument();
    expect(screen.getByText(/added on:/i)).toBeInTheDocument();
    expect(screen.getByAltText(/cat image/i)).toHaveAttribute(
      "src",
      mockItem.image.url
    );
  });

  it("calls onRemove when remove button is clicked", () => {
    render(<ListItem item={mockItem} onRemove={mockOnRemove} />);

    const removeButton = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(removeButton);

    expect(mockOnRemove).toHaveBeenCalledTimes(1);
    expect(mockOnRemove).toHaveBeenCalledWith("995");
  });
});
