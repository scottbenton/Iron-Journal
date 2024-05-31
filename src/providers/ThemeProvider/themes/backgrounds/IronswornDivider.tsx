import { Box } from "@mui/material";
import { useToggleTheme } from "providers/ThemeProvider/useToggleTheme";
import { ThemeType } from "../theme.types";

export function IronswornDivider() {
  const { themeType } = useToggleTheme();
  const isLightTheme = themeType === ThemeType.Light;

  return (
    <Box
      sx={(theme) => ({
        backgroundImage: isLightTheme
          ? `url(/theme/ironsworn-border.svg)`
          : undefined,
        height: theme.spacing(8),
        backgroundRepeat: "repeat-x",
        backgroundSize: "contain",
        backgroundPositionX: "center",
        minWidth: 1000,
      })}
    />
  );
}
