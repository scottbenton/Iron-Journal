import { useState } from "react";
import { TryItOut } from "./TryItOut";
import { Track } from "components/features/Track";
import { StatComponent } from "components/features/characters/StatComponent";
import { Box } from "@mui/material";

export function ExampleSupplySection() {
  const [supply, setSupply] = useState(4);

  return (
    <TryItOut>
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <Track
          label={"Supply"}
          sx={{
            maxWidth: 400,
            minWidth: 300,
          }}
          min={0}
          max={5}
          value={supply}
          onChange={(newValue) => {
            setSupply(newValue);
            return new Promise((res) => res());
          }}
        />
        <StatComponent label={"Supply"} value={supply} sx={{ mt: 2 }} />
      </Box>
    </TryItOut>
  );
}
