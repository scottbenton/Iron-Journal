import { StoredAsset } from "./Asset.type";
import { DEBILITIES } from "./debilities.enum";
import { Stat } from "./stats.enum";

export type StatsMap = {
  [key: string]: number;
};

export enum INITIATIVE_STATUS {
  HAS_INITIATIVE = "initiative",
  DOES_NOT_HAVE_INITIATIVE = "noInitiative",
  OUT_OF_COMBAT = "outOfCombat",
}

export interface CharacterDocument {
  uid: string;
  name: string;
  stats: StatsMap;
  health: number;
  spirit: number;
  supply: number;
  adds?: number;
  momentum: number;
  campaignId?: string;
  experience?: {
    earned?: number;
    spent?: number;
  };
  bonds?: number;
  debilities?: {
    [key: string]: boolean;
  };
  initiativeStatus?: INITIATIVE_STATUS;
  shareNotesWithGM?: boolean;
  profileImage?: {
    filename: string;
    position: {
      x: number;
      y: number;
    };
    scale: number;
  };
  worldId?: string | null;
}

export interface AssetDocument {
  assetOrder: string[];
  assets: {
    [key: string]: StoredAsset;
  };
}
