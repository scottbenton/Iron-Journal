import { createContext } from "react";
import { ThemeType, Themes } from "./themes/theme.types";

export interface IThemeContext {
  theme: Themes;
  setTheme: (theme: Themes) => void;
  themeType: ThemeType;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext>({
  themeType: ThemeType.Light,
  toggleTheme: () => {},
  theme: Themes.Sunset,
  setTheme: () => {},
});
