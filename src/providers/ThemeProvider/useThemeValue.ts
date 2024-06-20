import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { themes } from "./themes";
import { Themes } from "./themes/theme.types";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { GAME_SYSTEMS } from "types/GameSystems.type";

export function useThemeValue(
  key: "background" | "iconPath" | "emptyStateImage"
) {
  const { theme: themeKey } = useContext(ThemeContext);
  const defaultTheme = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: Themes.Sunset,
    [GAME_SYSTEMS.STARFORGED]: Themes.Eidolon,
  });
  const theme = themes[themeKey] ?? themes[defaultTheme];

  if (key === "background") {
    return theme.background;
  } else if (key === "iconPath") {
    return theme.iconPath;
  } else if (key === "emptyStateImage") {
    return theme.emptyStateImage;
  }
}
