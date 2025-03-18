export interface AppState {
  user: {
    id: string;
  };
  modal: {
    title: string;
    content: React.ReactNode;
    isOpen: boolean;
  };
}

export type AppAction =
  | { type: "SET_USER_ID"; payload: string }
  | {
      type: "TOGGLE_MODAL";
      payload: {
        title: string;
        content: React.ReactNode;
        isOpen: boolean;
      };
    }
  | { type: "RESET" };

export const initialState: AppState = {
  user: {
    id: "",
  },
  modal: {
    title: "",
    content: null,
    isOpen: false,
  },
};

export function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER_ID":
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload,
        },
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        modal: {
          title: action.payload?.title,
          content: action.payload?.content,
          isOpen: action.payload.isOpen,
        },
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
