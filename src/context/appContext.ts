import { createContext } from "react";
import {
  AppContextType,
  ThemeContextType,
  UserContextType,
} from "../types/types";

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);
