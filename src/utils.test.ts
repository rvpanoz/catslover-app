import { encryptAndStoreUserId, decryptUserId } from "./utils";
import CryptoJS from "crypto-js";

const STORAGE_KEY = "catslover";

jest.mock("crypto-js", () => ({
  AES: {
    encrypt: jest.fn((text, key) => ({ toString: () => `encrypted(${text})` })),
    decrypt: jest.fn((ciphertext, key) => ({
      toString: () => (ciphertext === "encrypted(hwbt009)" ? "hwbt009" : ""),
    })),
  },
  enc: { Utf8: "Utf8" },
}));

describe("Utilities", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });

    jest.clearAllMocks();
  });

  it("encryptAndStoreUserId should encrypt and store user ID", () => {
    encryptAndStoreUserId("hwbt009");

    expect(localStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY,
      JSON.stringify({ user_id: "encrypted(hwbt009)" })
    );
  });

  it("decryptUserId should return the decrypted user ID", () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(
      JSON.stringify({ user_id: "encrypted(hwbt009)" })
    );

    const userId = decryptUserId();

    expect(userId).toBe("hwbt009");
  });

  it("decryptUserId should return null if no data is stored", () => {
    (localStorage.getItem as jest.Mock).mockReturnValue(null);

    const userId = decryptUserId();
    expect(userId).toBeNull();
  });
});
