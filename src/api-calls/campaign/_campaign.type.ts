import { LegacyTrack } from "types/LegacyTrack.type";

export enum CampaignType {
  Solo = "solo",
  Coop = "co-op",
  Guided = "guided",
}

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
  type?: CampaignType; // Todo - perhaps run a migration to set this so that we can remove the optional
}
