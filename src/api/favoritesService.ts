import config from "../config";

export const fetchFavourites = async (userId: string) => {
  const endpoint = new URL("v1/favourites", config.API_URL);
  const url = `${endpoint.href}?sub_id=${userId}`;

  const response = await fetch(url, {
    headers: { "x-api-key": config.API_KEY },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const createFavourite = async (userId: string, imageId: string) => {
  const endpoint = new URL("v1/favourites", config.API_URL);

  const response = await fetch(endpoint.href, {
    method: "POST",
    headers: {
      Accept: "application/json,",
      "Content-type": "application/json; charset=UTF-8",
      "x-api-key": config.API_KEY,
    },
    body: JSON.stringify({
      image_id: imageId,
      sub_id: userId,
    } as unknown as BodyInit),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const removeFavourite = async (userId: string, id: string) => {
  const endpoint = new URL(
    `v1/favourites/${id}?sub_id=${userId}`,
    config.API_URL
  );

  const response = await fetch(endpoint.href, {
    method: "DELETE",
    headers: {
      "x-api-key": config.API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
