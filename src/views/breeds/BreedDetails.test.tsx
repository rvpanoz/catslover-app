import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import userEvent from "@testing-library/user-event";
import { useAppContext } from "../../context/AppContext";
import useFetch from "../../hooks/useFetch";
import BreedDetails from "./BreedDetails";

jest.mock("../../context/AppContext");
jest.mock("../../hooks/useFetch");

const mockNavigate = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockNavigate,
}));

describe("BreedDetails Component", () => {
  const mockFetchData = jest.fn();

  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { user: { id: "user123" } },
      dispatch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: true,
      data: null,
      error: null,
      fetchData: mockFetchData,
    });

    render(
      <BrowserRouter>
        <BreedDetails id="breed123" />
      </BrowserRouter>
    );

    expect(screen.getByText("Loading..")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      data: null,
      error: "Failed to fetch",
      fetchData: mockFetchData,
    });

    render(
      <BrowserRouter>
        <BreedDetails id="breed123" />
      </BrowserRouter>
    );

    expect(screen.getByText("Failed to fetch")).toBeInTheDocument();
  });

  it("renders breed details correctly", async () => {
    const mockData = [
      {
        id: "cat123",
        url: "https://example.com/cat.jpg",
        breeds: [
          {
            name: "Siamese",
            origin: "Thailand",
            life_span: "12-15",
            description: "Elegant and intelligent breed.",
          },
        ],
      },
    ];

    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      data: mockData,
      error: null,
      fetchData: mockFetchData,
    });

    render(
      <BrowserRouter>
        <BreedDetails id="breed123" />
      </BrowserRouter>
    );

    expect(screen.getByText("Breed Siamese")).toBeInTheDocument();
    expect(screen.getByText(/Origin/i)).toBeInTheDocument();
    expect(screen.getByText(/Life span/i)).toBeInTheDocument();
    expect(screen.getByText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      "https://example.com/cat.jpg"
    );
  });

  it("navigates to cat details on image click", async () => {
    const mockData = [
      {
        id: "cat123",
        url: "https://example.com/cat.jpg",
        breeds: [
          {
            name: "Siamese",
            origin: "Thailand",
            life_span: "12-15",
            description: "Elegant and intelligent breed.",
          },
        ],
      },
    ];

    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      data: mockData,
      error: null,
      fetchData: mockFetchData,
    });

    render(
      <BrowserRouter>
        <BreedDetails id="breed123" />
      </BrowserRouter>
    );

    const image = screen.getByRole("img");
    await userEvent.click(image);

    expect(mockNavigate).toHaveBeenCalledWith("/cats/cat123");
  });
});
