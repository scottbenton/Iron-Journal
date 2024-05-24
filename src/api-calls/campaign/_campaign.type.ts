import { LegacyTrack } from "types/LegacyTrack.type";

export interface CampaignDocument {
  name: string;
  users: string[];
  characters: { uid: string; characterId: string }[];
  gmIds?: string[];
  worldId?: string;
  expansionIds?: string[];
  customTracks?: Record<string, number>;
  conditionMeters?: Record<string, number>;
  specialTracks?: Record<string, LegacyTrack>;
}
