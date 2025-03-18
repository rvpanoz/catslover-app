import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { useAppContext } from "./context/AppContext";
import App from "./App";

jest.mock("./context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("./views/breeds/Breeds", () => () => (
  <div data-testid="breeds-page">Breeds Page</div>
));
jest.mock("./views/cats/Cats", () => () => (
  <div data-testid="cats-page">Cats Page</div>
));
jest.mock("./views/favourites/Favourites", () => () => (
  <div data-testid="favourites-page">Favourites Page</div>
));
jest.mock(
  "./components/modal/Modal",
  () =>
    ({ isOpen, onClose }: any) =>
      isOpen ? (
        <div data-testid="modal">
          <button onClick={onClose}>Close</button>
        </div>
      ) : null
);

const mockDispatch = jest.fn();
const mockState = {
  modal: {
    title: "Test Modal",
    content: "This is a test modal",
    isOpen: false,
  },
};

describe("App Component", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: mockState,
      dispatch: mockDispatch,
    });
  });

  it("renders the Cats page by default", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("cats-page")).toBeInTheDocument();
  });

  it("navigates to the Breeds page", () => {
    render(
      <MemoryRouter initialEntries={["/breeds"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("breeds-page")).toBeInTheDocument();
  });

  it("navigates to the Favourites page", () => {
    render(
      <MemoryRouter initialEntries={["/favourites"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("favourites-page")).toBeInTheDocument();
  });

  it("shows and closes the modal", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: {
        modal: {
          title: "Test Modal",
          content: "This is a test modal",
          isOpen: true,
        },
      },
      dispatch: mockDispatch,
    });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    const modal = screen.getByTestId("modal");
    expect(modal).toBeInTheDocument();

    fireEvent.click(screen.getByText("Close"));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "TOGGLE_MODAL",
      payload: { title: "", content: null, isOpen: false },
    });
  });
});
