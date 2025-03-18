import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import CatDetails from "./CatDetails";
import { useAppContext } from "../../context/AppContext";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router";

jest.mock("../../hooks/useFetch");
jest.mock("../../context/AppContext");
jest.mock("react-router", () => ({
  useNavigate: jest.fn(),
}));

describe("CatDetails Component", () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { user: { id: "hwbt-099" } },
      dispatch: mockDispatch,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("renders loading state", () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: true,
      data: null,
      error: null,
      fetchData: jest.fn(),
    });

    render(<CatDetails catId="cat-1" isFavourite={false} />);
    expect(screen.getByText(/Loading image../i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useFetch as jest.Mock).mockReturnValue({
      loading: false,
      data: null,
      error: "Error fetching cat details",
      fetchData: jest.fn(),
    });

    render(<CatDetails catId="cat-1" isFavourite={false} />);
    expect(screen.getByText(/Error fetching cat details/i)).toBeInTheDocument();
  });

  it("adds to favourites", async () => {
    const mockAddFavourite = jest.fn();

    (useFetch as jest.Mock)
      .mockReturnValueOnce({
        loading: false,
        data: { url: "https://api.com/cat.jpg", breeds: [] },
        error: null,
        fetchData: jest.fn(),
      })
      .mockReturnValueOnce({
        loading: false,
        data: [],
        error: null,
        fetchData: jest.fn(),
      })
      .mockReturnValueOnce({
        loading: false,
        data: null,
        error: null,
        fetchData: mockAddFavourite,
      });

    render(<CatDetails catId="cat-1" isFavourite={false} />);

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /Add to favourites/i })
      ).toBeInTheDocument()
    );

    fireEvent.click(screen.getByRole("button", { name: /Add to favourites/i }));
    await waitFor(() => expect(mockAddFavourite).toHaveBeenCalled());
  });

  it("navigates to breed details when clicking breed name", () => {
    (useFetch as jest.Mock)
      .mockReturnValueOnce({
        loading: false,
        data: {
          url: "https://example.com/cat.jpg",
          breeds: [{ id: "bengal", name: "Bengal" }],
        },
        error: null,
        fetchData: jest.fn(),
      })
      .mockReturnValueOnce({
        loading: false,
        data: [],
        error: null,
        fetchData: jest.fn(),
      });

    render(<CatDetails catId="cat-1" isFavourite={false} />);

    const breedLink = screen.getByText("Bengal");
    fireEvent.click(breedLink);

    expect(mockNavigate).toHaveBeenCalledWith("/breeds/bengal");
  });
});
