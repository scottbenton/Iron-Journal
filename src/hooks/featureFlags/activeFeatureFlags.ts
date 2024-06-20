import { GAME_SYSTEMS } from "types/GameSystems.type";

export const activeFeatureFlags: {
  testId: string;
  label: string;
  gameSystems?: GAME_SYSTEMS[];
}[] = [
  {
    testId: "new-maps",
    label: "Add optional maps to Iron Fellowship Locations",
    gameSystems: [GAME_SYSTEMS.IRONSWORN],
  },
];
