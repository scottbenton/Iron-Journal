import { Box } from "@mui/material";

export function EidolonEmptyState() {
  return (
    <Box
      width={200}
      height={200}
      sx={{
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(/theme/eidolon-empty-state.svg)`,
      }}
    />
  );
}
