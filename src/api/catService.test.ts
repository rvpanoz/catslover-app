import { fetchCats, fetchCatDetails } from "./catsService";
import config from "../config";

jest.mock("../config", () => ({
  API_KEY: "mocked-api-key",
  API_URL: "https://mocked-api.com",
}));

global.fetch = jest.fn();

describe("Cats API Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchCats", () => {
    it("calls the correct API endpoint with userId and page", async () => {
      const mockResponse = [
        { id: "cat123", url: "https://mocked-cat.com/image.jpg" },
      ];
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const userId = "user123";
      const page = 2;
      const result = await fetchCats(userId, page);

      expect(fetch).toHaveBeenCalledWith(
        `https://mocked-api.com/v1/images/search?sub_id=user123&limit=10&page=2`,
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

      await expect(fetchCats("user123", 1)).rejects.toThrow("Error: 500");
    });
  });

  describe("fetchCatDetails", () => {
    it("calls the correct API endpoint with userId and catId", async () => {
      const mockResponse = {
        id: "cat123",
        url: "https://mocked-cat.com/image.jpg",
      };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await fetchCatDetails("user123", "cat123");

      expect(fetch).toHaveBeenCalledWith(
        `https://mocked-api.com/v1/images/cat123?sub_id=user123`,
        {
          headers: { "x-api-key": "mocked-api-key" },
        }
      );
      expect(result).toEqual(mockResponse);
    });

    it("throws an error when response is not ok", async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
      });

      await expect(fetchCatDetails("user123", "cat123")).rejects.toThrow(
        "Error: 404"
      );
    });
  });
});
