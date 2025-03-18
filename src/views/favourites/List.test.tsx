import React from "react";
import { render, screen } from "@testing-library/react";
import List from "./List";

describe("List Component", () => {
  it("renders children correctly", () => {
    render(
      <List>
        <li data-testid="list-item-1">Item 1</li>
        <li data-testid="list-item-2">Item 2</li>
      </List>
    );

    expect(screen.getByTestId("list-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-2")).toBeInTheDocument();
  });

  it("renders an empty list without crashing", () => {
    render(<List />);

    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("list").childNodes.length).toBe(0);
  });
});
