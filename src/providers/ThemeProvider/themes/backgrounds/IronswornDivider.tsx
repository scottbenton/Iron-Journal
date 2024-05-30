import { Box } from "@mui/material";

export function IronswornDivider() {
  const isLightTheme = true;
  return (
    <Box
      sx={(theme) => ({
        backgroundImage: isLightTheme && `url(/theme/ironsworn-border.svg)`,
        height: theme.spacing(8),
        backgroundRepeat: "repeat-x",
        backgroundSize: "contain",
        backgroundPositionX: "center",
        minWidth: 1000,
      })}
    />
  );
}
