import { Nullable } from "api-calls/helpers.type";

export interface HomebrewOracleTableDocument {
  collectionId: string; // Homebrew Collection ID
  oracleCollectionId: string; // Parent collection ID
  label: string;
  description?: string;
  replaces?: Nullable<string>;
  columnLabels: {
    roll: string;
    result: string;
    detail?: string;
  };
  rows: {
    result: string;
    chance: number;
    detail?: string;
  }[];
}
