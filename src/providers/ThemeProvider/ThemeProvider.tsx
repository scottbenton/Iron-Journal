import { PropsWithChildren, useCallback, useState } from "react";
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  Theme,
} from "@mui/material";
import { THEME_TYPE } from "./themes";
import { ThemeContext } from "./ThemeContext";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { GAME_SYSTEMS, GameSystemChooser } from "types/GameSystems.type";
import { useNewSunderedIslesTheme } from "hooks/featureFlags/useNewSunderedIslesTheme";
import { ironswornLightTheme } from "./themes/ironsworn-light";
import { ironswornDarkTheme } from "./themes/ironsworn-dark";
import { starforgedLightTheme } from "./themes/starforged-light";
import { starforgedDarkTheme } from "./themes/starforged-dark";
import { sunderedIslesLightTheme } from "./themes/sundered-isles-light";
import { sunderedIslesDarkTheme } from "./themes/sundered-isles-dark";
import { useNewHinterlandsTheme } from "hooks/featureFlags/useNewHinterlandsTheme";
import { hinterlandsLightTheme } from "./themes/hinterlands-light";
import { hinterlandsDarkTheme } from "./themes/hinterlands-dark";

export function ThemeProvider(props: PropsWithChildren) {
  const { children } = props;

  const showHinterlandsTheme = useNewHinterlandsTheme();
  const showSunderedIslesTheme = useNewSunderedIslesTheme();

  let ironswornTheme: Record<THEME_TYPE, Theme> = {
    [THEME_TYPE.LIGHT]: ironswornLightTheme,
    [THEME_TYPE.DARK]: ironswornDarkTheme,
  };
  if (showHinterlandsTheme) {
    ironswornTheme = {
      [THEME_TYPE.LIGHT]: hinterlandsLightTheme,
      [THEME_TYPE.DARK]: hinterlandsDarkTheme,
    };
  }

  let starforgedTheme: { [key in THEME_TYPE]: Theme } = {
    [THEME_TYPE.LIGHT]: starforgedLightTheme,
    [THEME_TYPE.DARK]: starforgedDarkTheme,
  };
  if (showSunderedIslesTheme) {
    starforgedTheme = {
      [THEME_TYPE.LIGHT]: sunderedIslesLightTheme,
      [THEME_TYPE.DARK]: sunderedIslesDarkTheme,
    };
  }

  const gameThemes: GameSystemChooser<{
    [THEME_TYPE.LIGHT]: Theme;
    [THEME_TYPE.DARK]: Theme;
  }> = {
    [GAME_SYSTEMS.IRONSWORN]: ironswornTheme,
    [GAME_SYSTEMS.STARFORGED]: starforgedTheme,
  };

  const themes = useGameSystemValue(gameThemes);

  const [currentThemeType, setCurrentThemeType] = useState<THEME_TYPE>(
    localStorage.getItem("themeType") === THEME_TYPE.DARK
      ? THEME_TYPE.DARK
      : THEME_TYPE.LIGHT
  );

  const toggleTheme = useCallback(() => {
    setCurrentThemeType((prevType) => {
      let nextThemeType = THEME_TYPE.DARK;
      if (prevType === THEME_TYPE.DARK) {
        nextThemeType = THEME_TYPE.LIGHT;
      }

      localStorage.setItem("themeType", nextThemeType);

      return nextThemeType;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ themeType: currentThemeType, toggleTheme }}>
      <MuiThemeProvider theme={themes[currentThemeType]}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
