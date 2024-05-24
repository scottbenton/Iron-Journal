export interface World {
  name: string;
  newTruths?: Record<string, Truth>;
  ownerIds: string[];
  worldDescription?: Uint8Array;
}

export interface Truth {
  selectedTruthOptionIndex?: number;
  selectedSubItemIndex?: number | null;

  customTruth?: {
    description: string;
    questStarter: string;
  };
}
