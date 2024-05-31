import { Box } from "@mui/material";
import { useToggleTheme } from "providers/ThemeProvider/useToggleTheme";
import { ThemeType } from "../theme.types";

export function MyriadDivider() {
  const { themeType } = useToggleTheme();
  const isLightTheme = themeType === ThemeType.Light;
  return (
    <Box
      sx={(theme) => ({
        backgroundImage: isLightTheme
          ? `url(/theme/myriad-border.svg)`
          : undefined,
        height: theme.spacing(4),
        backgroundColor: isLightTheme ? "darkGrey.main" : undefined,
        backgroundRepeat: "repeat-x",
        backgroundSize: "contain",
        backgroundPositionX: "center",
        minWidth: 500,
      })}
    />
  );
}
