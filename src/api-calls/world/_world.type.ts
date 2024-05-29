import { Bytes } from "firebase/firestore";

export interface WorldDocument {
  name: string;
  worldDescription?: Bytes;
  newTruths?: Record<string, Truth>;
  ownerIds: string[];
  campaignGuides?: string[];
}

export interface World {
  name: string;
  newTruths?: Record<string, Truth>;
  ownerIds: string[];
  worldDescription?: Uint8Array;
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
