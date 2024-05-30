import { GAME_SYSTEMS } from "types/GameSystems.type";

export const activeFeatureFlags: {
  testId: string;
  label: string;
  gameSystems?: GAME_SYSTEMS[];
}[] = [
  // {
  //   testId: "custom-content-page",
  //   label: "Add new homebrew content management page",
  // },
  {
    testId: "new-sundered-isles-theme",
    label: "Show potential theme for Sundered Isles Crew Link",
    gameSystems: [GAME_SYSTEMS.STARFORGED],
  },
  {
    testId: "new-hinterlands-theme",
    label: "Show an extra theme for Iron Fellowship",
    gameSystems: [GAME_SYSTEMS.IRONSWORN],
  },
];
