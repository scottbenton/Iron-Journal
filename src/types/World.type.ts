import { TruthOptionClassic } from "dataforged";
import { truthIds } from "data/truths";

export type TRUTH_IDS = (typeof truthIds)[number];

export interface World {
  name: string;
  newTruths?: Record<string, NewTruth>;
  ownerIds: string[];
  worldDescription?: Uint8Array;
  // Deprecated, use newTruths instead
  truths?: { [key: string]: Truth };
}

// Deprecated
export interface Truth {
  customTruth?: TruthOptionClassic;
  selectedSubItemId?: string | null;
  id: string;
}

export interface NewTruth {
  selectedTruthOptionIndex?: number;
  selectedSubItemIndex?: number | null;

  customTruth?: {
    description: string;
    questStarter: string;
  };
}
