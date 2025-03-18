import { LIMIT } from "../constants";
import config from "../config";

export const fetchCats = async (userId: string, page: number) => {
  const endpoint = new URL("v1/images/search", config.API_URL);
  const url = `${endpoint.href}?sub_id=${userId}&limit=${LIMIT}&page=${page}`;

  const response = await fetch(url, {
    headers: { "x-api-key": config.API_KEY },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const fetchCatDetails = async (userId: string, catId: string) => {
  const endpoint = new URL(`v1/images/${catId}`, config.API_URL);
  const url = `${endpoint.href}?sub_id=${userId}`;

  const response = await fetch(url, {
    headers: { "x-api-key": config.API_KEY },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
