import { GAME_SYSTEMS } from "types/GameSystems.type";

export const activeFeatureFlags: {
  testId: string;
  label: string;
  warning?: string;
  gameSystems?: GAME_SYSTEMS[];
}[] = [
  {
    testId: "new-character-sheet-view",
    label: "New Character Sheet Layout",
  },
];
