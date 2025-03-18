import React from "react";
import { render, screen } from "@testing-library/react";
import List from "./List";

describe("List Component", () => {
  test("renders children correctly", () => {
    render(
      <List>
        <div data-testid="child-1">Item 1</div>
        <div data-testid="child-2">Item 2</div>
      </List>
    );

    expect(screen.getByTestId("child-1")).toBeInTheDocument();
    expect(screen.getByTestId("child-2")).toBeInTheDocument();
  });

  test("renders with correct class names", () => {
    const { container } = render(<List>Test</List>);

    expect(container.firstChild).toHaveClass(
      "grid grid-cols-5 gap-4 divide-y divide-gray-200 dark:divide-gray-700"
    );
  });

  test("renders empty when no children are provided", () => {
    const { container } = render(<List></List>);
    expect(container.firstChild?.childNodes.length).toBe(0);
  });
});
