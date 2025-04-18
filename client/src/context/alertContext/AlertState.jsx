import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import AlertReducer from "./AlertReducer";
import { SET_ALERT, REMOVE_ALERT } from "./types";

export default function AlertState({ children }) {
  const initialState = null;

  const [state, dispatch] = useReducer(AlertReducer, initialState);

  const setAlert = (msg, type) => {
    dispatch({
      type: SET_ALERT,
      payload: { msg, type },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT }), 6000);
  };

  const removeAlert = () => {
    dispatch({
      type: REMOVE_ALERT,
    });
  };

  return (
    <AlertContext.Provider value={{ alerts: state, setAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}
