import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { themes } from "./themes";

export function useThemeValue(
  key: "background" | "iconPath" | "emptyStateImage"
) {
  const { theme: themeKey } = useContext(ThemeContext);
  const theme = themes[themeKey];

  if (key === "background") {
    return theme.background;
  } else if (key === "iconPath") {
    return theme.iconPath;
  } else if (key === "emptyStateImage") {
    return theme.emptyStateImage;
  }
}
