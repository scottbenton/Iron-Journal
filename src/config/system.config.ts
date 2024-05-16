import { GAME_SYSTEMS, GameSystemChooser } from "types/GameSystems.type";

export type MultiOracleConfig = {
  tables: string | string[];
  joinTables?: boolean;
};

export enum Oracles {}

export enum AskTheOracle {
  AlmostCertain = "almost_certain",
  Likely = "likely",
  FiftyFifty = "fifty_fifty",
  Unlikely = "unlikely",
  SmallChance = "small_chance",
}

interface OracleMap {
  askTheOracle: {
    [AskTheOracle.AlmostCertain]: string;
    [AskTheOracle.Likely]: string;
    [AskTheOracle.FiftyFifty]: string;
    [AskTheOracle.Unlikely]: string;
    [AskTheOracle.SmallChance]: string;
  };
}

export const sharedOracleConfig: GameSystemChooser<OracleMap> = {
  [GAME_SYSTEMS.IRONSWORN]: {
    askTheOracle: {
      [AskTheOracle.AlmostCertain]:
        "classic/oracles/moves/ask_the_oracle/almost_certain",
      [AskTheOracle.Likely]: "classic/oracles/moves/ask_the_oracle/likely",
      [AskTheOracle.FiftyFifty]:
        "classic/oracles/moves/ask_the_oracle/fifty_fifty",
      [AskTheOracle.Unlikely]: "classic/oracles/moves/ask_the_oracle/unlikely",
      [AskTheOracle.SmallChance]:
        "classic/oracles/moves/ask_the_oracle/small_chance",
    },
  },
  [GAME_SYSTEMS.STARFORGED]: {
    askTheOracle: {
      [AskTheOracle.AlmostCertain]:
        "starforged/oracles/moves/ask_the_oracle/almost_certain",
      [AskTheOracle.Likely]: "starforged/oracles/moves/ask_the_oracle/likely",
      [AskTheOracle.FiftyFifty]:
        "starforged/oracles/moves/ask_the_oracle/fifty_fifty",
      [AskTheOracle.Unlikely]:
        "starforged/oracles/moves/ask_the_oracle/unlikely",
      [AskTheOracle.SmallChance]:
        "starforged/oracles/moves/ask_the_oracle/small_chance",
    },
  },
};
