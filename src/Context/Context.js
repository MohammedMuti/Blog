import { createContext } from "react";

const ContextProvider = createContext({
  user: null,
  isFetching: false,
  error: false,
});

export default ContextProvider;
