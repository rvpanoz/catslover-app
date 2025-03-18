import {
  fetchFavourites,
  createFavourite,
  removeFavourite,
} from "./favoritesService";
import config from "../config";

jest.mock("../config", () => ({
  API_KEY: "mocked-api-key",
  API_URL: "https://mocked-api.com",
}));

global.fetch = jest.fn();

describe("Favourites API Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchFavourites", () => {
    it("calls the correct API endpoint with userId", async () => {
      const mockResponse = [{ id: "fav123", image_id: "cat123" }];
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const userId = "user123";
      const result = await fetchFavourites(userId);

      expect(fetch).toHaveBeenCalledWith(
        `https://mocked-api.com/v1/favourites?sub_id=user123`,
        {
          headers: { "x-api-key": "mocked-api-key" },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("throws an error when response is not ok", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(fetchFavourites("user123")).rejects.toThrow("Error: 500");
    });
  });

  describe("createFavourite", () => {
    it("calls the correct API endpoint with userId and imageId", async () => {
      const mockResponse = { id: "fav456" };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const userId = "user123";
      const imageId = "cat789";
      const result = await createFavourite(userId, imageId);

      expect(fetch).toHaveBeenCalledWith(
        `https://mocked-api.com/v1/favourites`,
        {
          method: "POST",
          headers: {
            Accept: "application/json,",
            "Content-type": "application/json; charset=UTF-8",
            "x-api-key": "mocked-api-key",
          },
          body: JSON.stringify({
            image_id: imageId,
            sub_id: userId,
          }),
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("throws an error when response is not ok", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 400,
      });

      await expect(createFavourite("user123", "cat789")).rejects.toThrow(
        "Error: 400"
      );
    });
  });

  describe("removeFavourite", () => {
    it("calls the correct API endpoint with userId and favouriteId", async () => {
      const mockResponse = { message: "Deleted" };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const userId = "user123";
      const favId = "fav456";
      const result = await removeFavourite(userId, favId);

      expect(fetch).toHaveBeenCalledWith(
        `https://mocked-api.com/v1/favourites/fav456?sub_id=user123`,
        {
          method: "DELETE",
          headers: {
            "x-api-key": "mocked-api-key",
          },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("throws an error when response is not ok", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(removeFavourite("user123", "fav456")).rejects.toThrow(
        "Error: 404"
      );
    });
  });
});
