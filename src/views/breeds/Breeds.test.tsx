import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import Breeds from "./Breeds";
import { useAppContext } from "../../context/AppContext";
import useFetch from "../../hooks/useFetch";
import { fetchBreeds } from "../../api/breedsService";
import { Loader } from "../../components/loader/Loader";

jest.mock("../../context/AppContext", () => ({
  useAppContext: jest.fn(),
}));

jest.mock("../../hooks/useFetch", () => jest.fn());

jest.mock("../../api/breedsService", () => ({
  fetchBreeds: jest.fn(),
}));

jest.mock("../../components/loader/Loader", () => ({
  Loader: () => <div data-testid="loader-a" />,
}));

jest.mock("./BreedDetails", () => () => <div data-testid="breed-details" />);
jest.mock("./TableHeader", () => () => <thead data-testid="table-header" />);
jest.mock(
  "./TableRow",
  () =>
    ({ breed, onClick }: { breed: any; onClick: () => void }) => (
      <tr data-testid={`table-row-${breed.id}`} onClick={onClick}>
        <td>{breed.name}</td>
      </tr>
    )
);

describe("Breeds Component", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      state: { modal: { isOpen: false } },
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

    render(
      <MemoryRouter>
        <Breeds />
      </MemoryRouter>
    );

    expect(screen.getByTestId("loader-a")).toBeInTheDocument();
  });

  it("renders breed table with data", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      data: [
        { id: "1", name: "Breed 1" },
        { id: "2", name: "Breed 2" },
      ],
      error: null,
      fetchData: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Breeds />
      </MemoryRouter>
    );

    expect(screen.getByTestId("table-header")).toBeInTheDocument();
    expect(screen.getByTestId("table-row-1")).toBeInTheDocument();
    expect(screen.getByTestId("table-row-2")).toBeInTheDocument();
  });

  it("opens modal when clicking a breed row", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      data: [{ id: "1", name: "Breed 1" }],
      error: null,
      fetchData: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Breeds />
      </MemoryRouter>
    );

    const breedRow = screen.getByTestId("table-row-1");
    fireEvent.click(breedRow);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "TOGGLE_MODAL",
      payload: {
        isOpen: true,
        title: "Cat images",
        content: expect.any(Object),
      },
    });
  });

  it("navigates and opens modal when URL has breed ID", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      data: [{ id: "1", name: "Breed 1" }],
      error: null,
      fetchData: jest.fn(),
    });

    render(
      <MemoryRouter initialEntries={["/breeds/1"]}>
        <Routes>
          <Route path="/breeds/:id" element={<Breeds />} />
        </Routes>
      </MemoryRouter>
    );

    expect(mockDispatch).toHaveBeenCalledWith({
      type: "TOGGLE_MODAL",
      payload: {
        isOpen: true,
        title: "Cat images",
        content: expect.any(Object),
      },
    });
  });
});
