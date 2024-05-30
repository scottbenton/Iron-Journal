import { PropsWithChildren, useCallback, useState } from "react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { getTheme } from "./themes";
import { ThemeContext } from "./ThemeContext";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { ThemeType, Themes } from "./themes/theme.types";

export function ThemeProvider(props: PropsWithChildren) {
  const { children } = props;

  const defaultTheme = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: Themes.Hinterlands,
    [GAME_SYSTEMS.STARFORGED]: Themes.SeaFoam,
  });
  const [theme, setTheme] = useState<Themes>(defaultTheme);
  const [currentThemeType, setCurrentThemeType] = useState<ThemeType>(
    localStorage.getItem("themeType") === ThemeType.Dark
      ? ThemeType.Dark
      : ThemeType.Light
  );

  const toggleTheme = useCallback(() => {
    setCurrentThemeType((prevType) => {
      let nextThemeType = ThemeType.Dark;
      if (prevType === ThemeType.Dark) {
        nextThemeType = ThemeType.Light;
      }

      localStorage.setItem("themeType", nextThemeType);

      return nextThemeType;
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{ themeType: currentThemeType, toggleTheme, theme, setTheme }}
    >
      <MuiThemeProvider theme={getTheme(theme, currentThemeType)}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
