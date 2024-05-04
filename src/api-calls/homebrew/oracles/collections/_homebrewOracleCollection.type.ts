import { Nullable } from "api-calls/helpers.type";

export interface HomebrewOracleCollectionDocument {
  collectionId: string; // Homebrew collection id
  label: string;
  parentOracleCollectionId?: string;
  description?: string;
  enhancesId?: Nullable<string>;
  replacesId?: Nullable<string>;
}
