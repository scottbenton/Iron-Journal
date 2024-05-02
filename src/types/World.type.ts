import { TruthOptionClassic } from "dataforged";
import { truthIds } from "data/truths";

export type TRUTH_IDS = (typeof truthIds)[number];

export interface World {
  name: string;
  truths?: { [key: string]: Truth };
  ownerIds: string[];
  worldDescription?: Uint8Array;
}

export interface Truth {
  id: string;
  customTruth?: TruthOptionClassic;
  selectedSubItemId?: string | null;
}
