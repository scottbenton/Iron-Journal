import { GAME_SYSTEMS } from "types/GameSystems.type";

export const activeFeatureFlags: {
  testId: string;
  label: string;
  warning?: string;
  gameSystems?: GAME_SYSTEMS[];
}[] = [
  {
    testId: "new-maps",
    label: "Add optional maps to Iron Fellowship Locations",
    gameSystems: [GAME_SYSTEMS.IRONSWORN],
  },
  {
    testId: "new-maps",
    label:
      'Changes the sectors tab to "locations", which allows for updated maps, and more flexibility in the types of locations you can create.',
    warning:
      "Your existing sectors will eventually be converted to locations, but will not be until this feature is fully released.",
    gameSystems: [GAME_SYSTEMS.STARFORGED],
  },
];
