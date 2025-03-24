import React from "react";
import { render, act, screen } from "@testing-library/react";
import { AppProvider, useAppContext } from "../context/AppContext";
import { decryptUserId, encryptAndStoreUserId } from "../utils";
import { v4 as uuidv4 } from "uuid";

jest.mock("../utils", () => ({
  encryptAndStoreUserId: jest.fn(),
  decryptUserId: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

const TestComponent = () => {
  const { state } = useAppContext();
  return <div data-testid="user-id">{state.user.id}</div>;
};

describe("AppProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("uses stored user ID if available", async () => {
    (decryptUserId as jest.Mock).mockReturnValue("hwbt-001");

    await act(async () => {
      render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );
    });

    expect(screen.getByTestId("user-id").textContent).toBe("hwbt-001");
  });

  test("creates a new user ID if none is stored", async () => {
    (decryptUserId as jest.Mock).mockReturnValue(null);
    (uuidv4 as jest.Mock).mockReturnValue("new-user-id");
    (decryptUserId as jest.Mock).mockReturnValue("new-user-id");

    await act(async () => {
      render(
        <AppProvider>
          <TestComponent />
        </AppProvider>
      );
    });

    expect(screen.getByTestId("user-id").textContent).toBe("new-user-id");
  });

  test("throws error when useAppContext is used outside of AppProvider", () => {
    const renderOutsideProvider = () =>
      render(
        <div>
          <TestComponent />
        </div>
      );

    expect(renderOutsideProvider).toThrow(
      "useAppContext must be used within an AppProvider"
    );
  });
});
