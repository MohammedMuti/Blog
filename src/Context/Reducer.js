import { useReducer } from "react";
import ContextProvider from "./Context";

const defaultState = {
  user: JSON.parse(localStorage.getItem("BlogUsername")) || null,
  isFetching: false,
  error: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isFetching: true,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.user,
        isFetching: action.isFetching,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

const ContextReducer = (props) => {
  return (
    <ContextProvider.Provider value={useReducer(reducer, defaultState)}>
      {props.children}
    </ContextProvider.Provider>
  );
};

export default ContextReducer;
