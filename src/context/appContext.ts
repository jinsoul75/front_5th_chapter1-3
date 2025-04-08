import { createContext } from "react";
import { AppContextType, ThemeContextType } from "../types/types";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
