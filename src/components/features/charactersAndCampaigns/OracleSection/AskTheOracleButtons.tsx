import { Box, Button } from "@mui/material";
import { useRoller } from "stores/appState/useRoller";
import { AskTheOracle } from "config/system.config";
import { useSystemOracles } from "hooks/useSystemOracle";

const oracleOrder = [
  AskTheOracle.SmallChance,
  AskTheOracle.Unlikely,
  AskTheOracle.FiftyFifty,
  AskTheOracle.Likely,
  AskTheOracle.AlmostCertain,
];

const askTheOracleLabels: { [key in AskTheOracle]: string } = {
  [AskTheOracle.AlmostCertain]: "Almost Certain",
  [AskTheOracle.Likely]: "Likely",
  [AskTheOracle.FiftyFifty]: "50/50",
  [AskTheOracle.Unlikely]: "Unlikely",
  [AskTheOracle.SmallChance]: "Small Chance",
};

export function AskTheOracleButtons() {
  const { rollOracleTable } = useRoller();

  const { askTheOracle: oracles } = useSystemOracles();

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      // border={(theme) => `1px solid ${theme.palette.divider}`}
    >
      {oracleOrder.map((oracleKey) => (
        <Button
          key={oracleKey}
          size={"small"}
          color={"inherit"}
          sx={(theme) => ({
            fontFamily: theme.fontFamilyTitle,
            lineHeight: 1,
            "&:hover": {
              bgcolor: theme.palette.darkGrey.main,
            },
            minHeight: 32,
            minWidth: 0,
            px: 1,
          })}
          onClick={() =>
            rollOracleTable(oracles[oracleKey as AskTheOracle], true, true)
          }
        >
          {askTheOracleLabels[oracleKey as AskTheOracle]}
        </Button>
      ))}
    </Box>
  );
}
