import { Box } from "@mui/material";

import { StatComponent } from "components/features/characters/StatComponent";
import { useStore } from "stores/store";

export function StatsSectionMobile() {
  const ruleStats = useStore((store) => store.rules.stats);

  const stats = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.stats
  );

  return (
    <Box mt={1} mx={-1}>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"row"}
        flexWrap={"wrap"}
        gap={0.75}
      >
        {Object.keys(ruleStats).map((statKey) => (
          <StatComponent
            key={statKey}
            label={ruleStats[statKey].label}
            value={stats?.[statKey] ?? 0}
            sx={{ width: 60 }}
          />
        ))}
      </Box>
    </Box>
  );
}
