import { Bytes } from "firebase/firestore";

export interface WorldDocument extends Omit<World, "worldDescription"> {
  worldDescription?: Bytes;
}

export interface World {
  settingKey: string;
  name: string;
  worldDescription?: Uint8Array;
  newTruths?: Record<string, Truth>;
  ownerIds: string[];
  campaignGuides?: string[];
}

export interface Truth {
  selectedTruthOptionIndex?: number;
  selectedSubItemIndex?: number | null;

  customTruth?: {
    description: string;
    questStarter: string;
  };
}
