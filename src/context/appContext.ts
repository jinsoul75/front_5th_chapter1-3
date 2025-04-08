import { createContext } from "react";
import {
  ThemeContextType,
  UserContextType,
  NotificationContextType,
} from "../types/types";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);
