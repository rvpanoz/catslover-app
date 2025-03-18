import { reducer, initialState, AppAction } from "./appReducer";

describe("appReducer", () => {
  it("should return initial state when given the reset action", () => {
    expect(reducer(initialState, { type: "RESET" })).toEqual(initialState);
  });

  it("should set user ID", () => {
    const newState = reducer(initialState, {
      type: "SET_USER_ID",
      payload: "user123",
    });
    expect(newState.user.id).toBe("user123");
  });

  it("should toggle modal state", () => {
    const action = {
      type: "TOGGLE_MODAL",
      payload: {
        title: "Test Modal",
        content: "Content",
        isOpen: true,
      },
    };
    const newState = reducer(initialState, action as AppAction);
    expect(newState.modal).toEqual(action.payload);
  });

  it("should reset to initial state", () => {
    const modifiedState = { ...initialState, user: { id: "user123" } };
    const newState = reducer(modifiedState, { type: "RESET" });
    expect(newState).toEqual(initialState);
  });
});
