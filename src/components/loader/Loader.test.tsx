import React from "react";
import { render } from "@testing-library/react";
import { Loader } from "./Loader";

describe("Loader Component", () => {
  it("renders the loader container", () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("renders three loading circles", () => {
    const { container } = render(<Loader />);
    const circles = container.querySelectorAll("span");
    expect(circles.length).toBe(3);
  });

  it("applies correct color based on prop", () => {
    const { container } = render(<Loader color="black" />);
    const firstCircle = container.querySelector("span");

    expect(firstCircle).toHaveStyle("background-color: black");
  });

  it("applies default white color if no color prop is provided", () => {
    const { container } = render(<Loader />);
    const firstCircle = container.querySelector("span");

    expect(firstCircle).toHaveStyle("background-color: white");
  });
});
