import { Box } from "@mui/material";

export function HinterlandsEmptyState() {
  return (
    <Box
      width={300}
      height={200}
      sx={{
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(/theme/hinterlands-empty-state.svg)`,
      }}
    />
  );
}
