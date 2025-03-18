import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Favourites from "./Favourites";
import { useAppContext } from "../../context/AppContext";
import useFetch from "../../hooks/useFetch";
import { Loader } from "../../components/loader/Loader";
import { fetchFavourites, removeFavourite } from "../../api/favoritesService";

jest.mock("../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("../../hooks/useFetch", () => jest.fn());

jest.mock("../../api/favoritesService", () => ({
  fetchFavourites: jest.fn(),
  removeFavourite: jest.fn(),
}));

jest.mock("../../components/loader/Loader", () => ({
  Loader: () => <div data-testid="loader" />,
}));

jest.mock(
  "../../components/confirmation/Confirmation",
  () =>
    ({
      onConfirm,
      onAbort,
    }: {
      onConfirm: () => void;
      onAbort: () => void;
    }) => (
      <div>
        <button data-testid="confirm-btn" onClick={onConfirm}>
          Confirm
        </button>
        <button data-testid="abort-btn" onClick={onAbort}>
          Abort
        </button>
      </div>
    )
);

jest.mock("./List", () => ({ children }: { children: React.ReactNode }) => (
  <ul data-testid="list">{children}</ul>
));

jest.mock(
  "./ListItem",
  () =>
    ({ item, onRemove }: { item: any; onRemove: () => void }) => (
      <li data-testid={`list-item-${item.id}`}>
        {item.name}
        <button data-testid={`remove-btn-${item.id}`} onClick={onRemove}>
          Remove
        </button>
      </li>
    )
);

describe("Favourites Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      state: { user: { id: "user123" } },
      dispatch: mockDispatch,
    });
  });

  it("displays loader when data is loading", () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: true,
      data: null,
      error: null,
      fetchData: jest.fn(),
    });

    render(<Favourites />);

    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("renders list when data is available", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      data: [
        { id: "1", name: "Cat 1" },
        { id: "2", name: "Cat 2" },
      ],
      error: null,
      fetchData: jest.fn(),
    });

    render(<Favourites />);

    expect(screen.getByTestId("list")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-1")).toBeInTheDocument();
    expect(screen.getByTestId("list-item-2")).toBeInTheDocument();
  });

  it("opens confirmation modal when removing an item", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      data: [{ id: "1", name: "Cat 1" }],
      error: null,
      fetchData: jest.fn(),
    });

    render(<Favourites />);

    const removeButton = screen.getByTestId("remove-btn-1");
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "TOGGLE_MODAL",
      payload: {
        isOpen: true,
        title: "Corfirmation",
        content: expect.any(Object),
      },
    });
  });

  it("displays error messages", () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      data: null,
      error: "Failed to fetch data",
      fetchData: jest.fn(),
    });

    render(<Favourites />);

    expect(screen.getByText("Failed to fetch data")).toBeInTheDocument();
  });
});
