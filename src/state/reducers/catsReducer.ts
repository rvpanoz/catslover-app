import { Cat } from "../../types/catTypes";

export type State = {
  data: Cat[];
  page: number;
  error: string | null;
};

export type Action =
  | { type: "FETCH_CATS_SUCCESS"; payload: Cat[] }
  | { type: "FETCH_CATS_ERROR"; payload: string }
  | { type: "NEXT_PAGE" }
  | { type: "RESET" };

export const initialState = {
  data: [],
  page: 0,
  error: null,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_CATS_SUCCESS":
      return { ...state, data: [...state.data, ...action.payload] };
    case "FETCH_CATS_ERROR":
      return { ...state, error: action.payload };
    case "NEXT_PAGE":
      return { ...state, page: state.page + 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
