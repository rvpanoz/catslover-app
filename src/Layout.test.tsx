import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Layout from "./Layout";

jest.mock("./components/header/Header", () => () => (
  <div data-testid="header">Header</div>
));

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("Layout Component", () => {
  it("renders the header", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div data-testid="children-content">Children Content</div>
        </Layout>
      </MemoryRouter>
    );

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("children-content")).toBeInTheDocument();
  });

  it("renders sidebar with correct links", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    );

    expect(screen.getByText(/Cats/i)).toBeInTheDocument();
    expect(screen.getByText(/Breeds/i)).toBeInTheDocument();
    expect(screen.getByText(/Favourites/i)).toBeInTheDocument();
  });

  it("navigates to the correct routes when sidebar links are clicked", () => {
    render(
      <MemoryRouter>
        <Layout>
          <div>content</div>
        </Layout>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("cats"));
    expect(mockNavigate).toHaveBeenCalledWith("/cats");

    fireEvent.click(screen.getByText(/Breeds/i));
    expect(mockNavigate).toHaveBeenCalledWith("/breeds");

    fireEvent.click(screen.getByText(/Favourites/i));
    expect(mockNavigate).toHaveBeenCalledWith("/favourites");
  });
});
