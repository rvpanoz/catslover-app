import CryptoJS from "crypto-js";
import config from "./config";

const STORAGE_KEY = "catslover";
const { SECRET_KEY } = config;

export const encryptAndStoreUserId = (id: string) => {
  try {
    const encryptedId = CryptoJS.AES.encrypt(id, SECRET_KEY).toString();
    const userProperties = JSON.stringify({
      user_id: encryptedId,
    });

    localStorage.setItem(STORAGE_KEY, userProperties);
  } catch (error) {
    throw new Error("Failed to encrypt and store user id");
  }
};

export const decryptUserId = () => {
  try {
    const storage = localStorage.getItem(STORAGE_KEY);
    const { user_id: encryptedId } = storage ? JSON.parse(storage) : {};

    if (encryptedId) {
      const bytes = CryptoJS.AES.decrypt(encryptedId, SECRET_KEY);
      const decryptedId = bytes.toString(CryptoJS.enc.Utf8);
      return decryptedId;
    }

    return null;
  } catch (error) {
    throw new Error("Failed to decrypt user id");
  }
};
