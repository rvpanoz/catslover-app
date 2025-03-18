import { reducer, initialState, State, Action } from "./catsReducer";

describe("catsReducer", () => {
  it("should set cats data", () => {
    const newState = reducer(initialState, {
      type: "FETCH_CATS_SUCCESS",
      payload: [
        {
          id: "1",
          url: "cat1.jpg",
          width: 10,
          height: 10,
        },
        {
          id: "2",
          url: "cat2.jpg",
          width: 10,
          height: 10,
        },
      ],
    });

    expect(newState.data).toEqual([
      {
        id: "1",
        url: "cat1.jpg",
        width: 10,
        height: 10,
      },
      {
        id: "2",
        url: "cat2.jpg",
        width: 10,
        height: 10,
      },
    ]);
  });

  it("should go to next page", () => {
    const newState = reducer(initialState, { type: "NEXT_PAGE" });
    expect(newState.page).toBe(1);
  });

  it("should reset to initial state", () => {
    const modifiedState = {
      ...initialState,
      data: [
        {
          id: "3",
          url: "cat3.jpg",
          width: 10,
          height: 10,
        },
      ],
      page: 2,
    };

    const newState = reducer(modifiedState, { type: "RESET" });
    expect(newState).toEqual(initialState);
  });
});
