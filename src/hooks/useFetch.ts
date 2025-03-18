import { useCallback, useReducer, useRef, useEffect } from "react";
import config from "../config";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const initialState = {
  data: null,
  loading: false,
  error: null,
};

function reducer(state: FetchState<any>, action: any) {
  switch (action.type) {
    case "FETCHING":
      return { ...state, loading: true, error: null };
    case "FETCHED":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const useFetch = <T>(fetchFn: () => Promise<T>) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCHING" });
    try {
      const result = await fetchFn();
      dispatch({ type: "FETCHED", payload: result });
    } catch (err) {
      dispatch({
        type: "FETCH_ERROR",
        payload: "Something went wrong. Please try again",
      });
    }
  }, [fetchFn]);

  return { ...state, fetchData };
};

export default useFetch;
