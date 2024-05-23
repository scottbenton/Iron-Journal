import { Nullable } from "api-calls/helpers.type";

export type StatsMap = Record<string, number>;

export enum InitiativeStatus {
  HasInitiative = "initiative",
  DoesNotHaveInitiative = "noInitiative",
  OutOfCombat = "outOfCombat",
}

export interface SpecialTrack {
  value: number;
  // Starforged only
  spentExperience?: { [index: number]: boolean };
  isLegacy?: boolean;
}

export interface CharacterDocument {
  uid: string;

  campaignId?: Nullable<string>;

  // If the character is in a campaign, this ID will be ignored
  worldId?: Nullable<string>;

  name: string;
  stats: StatsMap;
  conditionMeters?: Record<string, number>; // Health, Sprit, Supply, etc.

  initiativeStatus?: InitiativeStatus;
  momentum: number;

  specialTracks?: Record<string, SpecialTrack>; // Bonds, Quests, Discoveries, etc.
  // Ironsworn only - starforged XP is stored on specialTracks
  experience?: {
    earned?: number;
    spent?: number;
  };

  debilities?: {
    [key: string]: boolean;
  };
  adds?: number;

  profileImage?: Nullable<{
    filename: string;
    position: {
      x: number;
      y: number;
    };
    scale: number;
  }>;

  expansionIds?: string[];

  // Deprecated below this line - the above properties should be up to date
  // TODO - remove once new homebrew expansion is complete
  health: number;
  spirit: number;
  supply: number;
  legacyTracks?: Record<string, SpecialTrack>;
  bonds?: number;
  customTracks?: {
    [trackName: string]: number;
  };
}
