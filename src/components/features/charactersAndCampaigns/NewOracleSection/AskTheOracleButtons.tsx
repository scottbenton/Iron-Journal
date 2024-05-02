import { Box, Button } from "@mui/material";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { GAME_SYSTEMS, GameSystemChooser } from "types/GameSystems.type";
import { useRoller } from "stores/appState/useRoller";

export enum OracleKeys {
  AlmostCertain = "almostCertain",
  Likely = "likely",
  FiftyFifty = "fiftyFifty",
  Unlikely = "unlikely",
  SmallChance = "smallChance",
}

const oracleOrder = [
  OracleKeys.SmallChance,
  OracleKeys.Unlikely,
  OracleKeys.FiftyFifty,
  OracleKeys.Likely,
  OracleKeys.AlmostCertain,
];

const askTheOracleOracles: GameSystemChooser<{ [key in OracleKeys]: string }> =
  {
    [GAME_SYSTEMS.IRONSWORN]: {
      [OracleKeys.AlmostCertain]:
        "classic/oracles/moves/ask_the_oracle/almost_certain",
      [OracleKeys.Likely]: "classic/oracles/moves/ask_the_oracle/likely",
      [OracleKeys.FiftyFifty]:
        "classic/oracles/moves/ask_the_oracle/fifty_fifty",
      [OracleKeys.Unlikely]: "classic/oracles/moves/ask_the_oracle/unlikely",
      [OracleKeys.SmallChance]:
        "classic/oracles/moves/ask_the_oracle/small_chance",
    },
    [GAME_SYSTEMS.STARFORGED]: {
      [OracleKeys.AlmostCertain]:
        "starforged/oracles/moves/ask_the_oracle/almost_certain",
      [OracleKeys.Likely]: "starforged/oracles/moves/ask_the_oracle/likely",
      [OracleKeys.FiftyFifty]:
        "starforged/oracles/moves/ask_the_oracle/fifty_fifty",
      [OracleKeys.Unlikely]: "starforged/oracles/moves/ask_the_oracle/unlikely",
      [OracleKeys.SmallChance]:
        "starforged/oracles/moves/ask_the_oracle/small_chance",
    },
  };

const askTheOracleLabels: { [key in OracleKeys]: string } = {
  [OracleKeys.AlmostCertain]: "Almost Certain",
  [OracleKeys.Likely]: "Likely",
  [OracleKeys.FiftyFifty]: "50/50",
  [OracleKeys.Unlikely]: "Unlikely",
  [OracleKeys.SmallChance]: "Small Chance",
};

export function AskTheOracleButtons() {
  const { rollOracleTableNew } = useRoller();
  const oracles = useGameSystemValue(askTheOracleOracles);

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
            rollOracleTableNew(oracles[oracleKey as OracleKeys], true, true)
          }
        >
          {askTheOracleLabels[oracleKey as OracleKeys]}
        </Button>
      ))}
    </Box>
  );
}
