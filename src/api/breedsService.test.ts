import { fetchBreeds, fetchBreed } from "./breedsService";
import config from "../config";

jest.mock("../config", () => ({
  API_KEY: "mocked-api-key",
  API_URL: "https://mocked-api.com",
}));

global.fetch = jest.fn();

describe("API functions", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("fetchBreeds should return breed data on success", async () => {
    const mockResponse = [{ id: "1", name: "Bulldog" }];
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await fetchBreeds();

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("v1/breeds"), {
      headers: { "x-api-key": config.API_KEY },
    });
    expect(result).toEqual(mockResponse);
  });

  it("fetchBreeds should throw an error on failure", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 500 });

    await expect(fetchBreeds()).rejects.toThrow("Error: 500");
  });

  it("fetchBreed should return breed images on success", async () => {
    const userId = "hwbt-009";
    const breedId = "acysian";
    const mockResponse = [{ url: "https://api.com/image.jpg" }];

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await fetchBreed(userId, breedId);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(
        `v1/images/search?breed_id=${breedId}&sub_id=${userId}&limit=10`
      ),
      {
        headers: { "x-api-key": config.API_KEY },
      }
    );
    expect(result).toEqual(mockResponse);
  });

  it("fetchBreed should throw an error on failure", async () => {
    (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 404 });

    await expect(fetchBreed("user123", "bulldog")).rejects.toThrow(
      "Error: 404"
    );
  });
});
