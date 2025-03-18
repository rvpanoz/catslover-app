import React from "react";
import { render, screen } from "@testing-library/react";
import TableRow from "./TableRow";
import { Adaptability } from "../../types/appTypes";

const mockClick = jest.fn();
const mockBreed = {
  id: "1",
  name: "A breed",
  adaptability: 5,
  origin: "UK",
  image: { url: "https://img.com/goo.jpg", id: "xcv" },
  country_codes: "UK",
  life_span: "14-15",
  description: "description of the breed",
};

describe("TableRow Component", () => {
  test("renders breed's ID, name, adaptability, and origin", () => {
    render(
      <table>
        <tbody>
          <TableRow breed={mockBreed} onClick={mockClick} />
        </tbody>
      </table>
    );

    expect(screen.getByText(mockBreed.id)).toBeInTheDocument();
    expect(screen.getByText(mockBreed.name)).toBeInTheDocument();
    expect(screen.getByText(mockBreed.origin)).toBeInTheDocument();
  });

  test("renders the breed's image correctly", () => {
    render(
      <table>
        <tbody>
          <TableRow breed={mockBreed} onClick={mockClick} />
        </tbody>
      </table>
    );

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", mockBreed.image.url);
    expect(img).toHaveAttribute("alt", mockBreed.name);
  });

  test("applies hover class", () => {
    const { container } = render(
      <table>
        <tbody>
          <TableRow breed={mockBreed} onClick={mockClick} />
        </tbody>
      </table>
    );

    const row = container.querySelector("tr");

    expect(row).toHaveClass("hover:bg-gray-100");
    expect(row).toHaveClass("dark:hover:bg-gray-700");
  });
});
