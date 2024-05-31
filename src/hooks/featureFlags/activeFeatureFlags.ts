import { GAME_SYSTEMS } from "types/GameSystems.type";

export const activeFeatureFlags: {
  testId: string;
  label: string;
  gameSystems?: GAME_SYSTEMS[];
}[] = [];
