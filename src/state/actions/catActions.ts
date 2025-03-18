import { Cat } from "../../types/catTypes";

export const fetchCatsSuccess = (cats: Cat[]) => ({
  type: "FETCH_CATS_SUCCESS" as const,
  payload: cats,
});

export const fetchCatsError = (error: string) => ({
  type: "FETCH_CATS_ERROR" as const,
  payload: error,
});

export const nextPage = () => ({
  type: "NEXT_PAGE" as const,
});

export type CatsAction =
  | ReturnType<typeof fetchCatsSuccess>
  | ReturnType<typeof fetchCatsError>
  | ReturnType<typeof nextPage>;
