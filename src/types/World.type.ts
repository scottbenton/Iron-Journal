import { TruthOptionClassic } from "dataforged";
import { truthIds } from "data/truths";

export type TRUTH_IDS = (typeof truthIds)[number];

export interface World {
  name: string;
  truths?: { [key: string]: Truth };
  newTruths?: Record<string, NewTruth>;
  ownerIds: string[];
  worldDescription?: Uint8Array;
}

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
