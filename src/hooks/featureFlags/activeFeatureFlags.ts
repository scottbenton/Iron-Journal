import { GAME_SYSTEMS } from "types/GameSystems.type";

export const activeFeatureFlags: {
  testId: string;
  label: string;
  gameSystems?: GAME_SYSTEMS[];
}[] = [
  {
    testId: "maps-update",
    label:
      "Maps Update - location improvements, and eventual addition of maps to Iron Fellowship",
  },
];
