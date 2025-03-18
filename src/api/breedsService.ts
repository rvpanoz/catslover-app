import config from "../config";

export const fetchBreeds = async () => {
  const endpoint = new URL("v1/breeds", config.API_URL);

  const response = await fetch(endpoint.href, {
    headers: { "x-api-key": config.API_KEY },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};

export const fetchBreed = async (userId: string, id: string) => {
  const endpoint = new URL(
    `v1/images/search?breed_id=${id}&sub_id=${userId}`,
    config.API_URL
  );

  const response = await fetch(endpoint.href, {
    headers: { "x-api-key": config.API_KEY },
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  return response.json();
};
