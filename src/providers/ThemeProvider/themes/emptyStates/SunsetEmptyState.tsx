import { Box } from "@mui/material";

export function SunsetEmptyState() {
  return (
    <Box
      width={200}
      height={200}
      sx={{
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(/theme/sunset-empty-state.svg)`,
      }}
    />
  );
}
