import { createContext } from "react";

export const AppProvide = createContext();

export const AppContext = ({ children }) => {
  return <AppProvide.Provider value="app">{children}</AppProvide.Provider>;
};
