import { Box } from "@mui/material";

export function SeaFoamDivider() {
  const isLightTheme = true;
  return (
    <Box
      sx={(theme) => ({
        backgroundImage: isLightTheme && `url(/theme/sea-foam-border.svg)`,
        height: theme.spacing(8),
        backgroundColor: "darkGrey.main",
        backgroundRepeat: "repeat-x",
        backgroundSize: "contain",
        backgroundPositionX: "center",
        minWidth: 500,
      })}
    />
  );
}
