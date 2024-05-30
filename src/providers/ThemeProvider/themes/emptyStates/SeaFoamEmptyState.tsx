import { Box } from "@mui/material";

export function SeaFoamEmptyState() {
  return (
    <Box
      width={200}
      height={200}
      sx={{
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(/theme/sea-foam-empty-state.svg)`,
      }}
    />
  );
}
