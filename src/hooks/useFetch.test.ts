import { renderHook, act } from "@testing-library/react";
import useFetch from "./useFetch";

describe("useFetch hook", () => {
  const mockData = { message: "Success" };

  test("should initialize with default state", () => {
    const fetchFn = jest.fn();
    const { result } = renderHook(() => useFetch(fetchFn));

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  test("should handle successful fetch", async () => {
    const fetchFn = jest.fn().mockResolvedValue(mockData);
    const { result } = renderHook(() => useFetch(fetchFn));

    await act(async () => {
      result.current.fetchData();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  test("should handle fetch error", async () => {
    const fetchFn = jest
      .fn()
      .mockRejectedValue(new Error("Something went wrong. Please try again"));
    const { result } = renderHook(() => useFetch(fetchFn));

    await act(async () => {
      result.current.fetchData();
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Something went wrong. Please try again");
  });

  test("should update loading state after fetching", async () => {
    const fetchFn = jest.fn().mockResolvedValue(mockData);
    const { result } = renderHook(() => useFetch(fetchFn));

    await act(async () => {
      result.current.fetchData();
    });

    expect(result.current.loading).toBe(false);
  });
});
