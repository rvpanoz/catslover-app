import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { useAppContext } from "../../context/AppContext";
import Cats from "./Cats";
import useFetch from "../../hooks/useFetch";

window.HTMLElement.prototype.scrollIntoView = jest.fn();
const mockDispatch = jest.fn();
const mockFetchData = jest.fn();

jest.mock("../../hooks/useFetch");
jest.mock("../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

describe("Cats Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      state: { user: { id: "user123" } },
      dispatch: mockDispatch,
    });
  });

  it("renders the component with loading state", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: [],
      loading: true,
      error: null,
      fetchData: mockFetchData,
    });

    render(
      <MemoryRouter>
        <Cats />
      </MemoryRouter>
    );

    expect(screen.getByText(/Cats/i)).toBeInTheDocument();
    expect(screen.getByText(/Loading../i)).toBeInTheDocument();
  });

  it("renders the component with fetched data", async () => {
    const mockCats = [
      { id: "1", url: "cat1.jpg", favourite: false, breeds: [] },
      { id: "2", url: "cat2.jpg", favourite: true, breeds: [] },
    ];

    (useFetch as jest.Mock).mockReturnValue({
      data: mockCats,
      loading: false,
      error: null,
      fetchData: mockFetchData,
    });

    render(
      <MemoryRouter>
        <Cats />
      </MemoryRouter>
    );

    expect(screen.getByText("Load more")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getAllByRole("img")).toHaveLength(2);
    });
  });

  it("handles error state", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: "Failed to fetch",
      fetchData: mockFetchData,
    });

    render(
      <MemoryRouter>
        <Cats />
      </MemoryRouter>
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Failed to fetch");
  });

  it("triggers fetchData on mount", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
      fetchData: mockFetchData,
    });

    render(
      <MemoryRouter>
        <Cats />
      </MemoryRouter>
    );

    expect(mockFetchData).toHaveBeenCalledTimes(1);
  });

  it("triggers next page load when 'Load more' is clicked", () => {
    (useFetch as jest.Mock).mockReturnValue({
      data: [],
      loading: false,
      error: null,
      fetchData: mockFetchData,
    });

    render(
      <MemoryRouter>
        <Cats />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Load more"));
    expect(mockFetchData).toHaveBeenCalled();
  });

  it("opens modal when a cat item is clicked", async () => {
    const mockCats = [{ id: "1", url: "cat1.jpg", favourite: false }];
    (useFetch as jest.Mock).mockReturnValue({
      data: mockCats,
      loading: false,
      error: null,
      fetchData: mockFetchData,
    });

    render(
      <MemoryRouter>
        <Cats />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByRole("img")[0]);
    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: "TOGGLE_MODAL" })
    );
  });

  it("disables 'Load more' button while loading", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: true,
      data: [],
      error: null,
      fetchData: jest.fn(),
    });

    await act(async () => {
      render(
        <MemoryRouter>
          <Cats />
        </MemoryRouter>
      );
    });

    expect(screen.getByText("Loading..")).toBeDisabled();
  });
});
