export enum LEGACY_TrackTypes {
  QUESTS = "quests",
  BONDS = "bonds",
  DISCOVERIES = "discoveries",
}
export interface LegacyTrack {
  value: number;
  spentExperience?: { [index: number]: boolean };
  isLegacy?: boolean;
}
