import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { encryptAndStoreUserId, decryptUserId } from "../utils";
import {
  AppAction,
  reducer as appReducer,
  AppState,
  initialState,
} from "../state/reducers/appReducer";

const AppContext = createContext<
  { state: AppState; dispatch: React.Dispatch<AppAction> } | undefined
>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  React.useEffect(() => {
    const storedUserId = decryptUserId();

    if (storedUserId) {
      dispatch({ type: "SET_USER_ID", payload: storedUserId });
    } else {
      const newUserId = uuidv4();
      encryptAndStoreUserId(newUserId);

      const userIdDecrypted = decryptUserId();
      if (userIdDecrypted) {
        dispatch({ type: "SET_USER_ID", payload: userIdDecrypted });
      }
    }
  }, []);

  if (!state.user.id) {
    return null;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
};
