import React from "react";
import { render, screen } from "@testing-library/react";
import TableHeader from "./TableHeader";

describe("TableHeader Component", () => {
  it("renders table header with correct columns", () => {
    render(
      <table>
        <TableHeader />
      </table>
    );

    expect(
      screen.getByRole("columnheader", { name: /id/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /adaptability/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /origin/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /life span/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /image/i })
    ).toBeInTheDocument();
  });

  it("renders the correct number of columns", () => {
    render(
      <table>
        <TableHeader />
      </table>
    );

    const columnHeaders = screen.getAllByRole("columnheader");
    expect(columnHeaders).toHaveLength(6);
  });
});
