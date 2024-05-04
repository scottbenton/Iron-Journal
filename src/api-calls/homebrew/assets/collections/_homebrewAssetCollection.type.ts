import { Nullable } from "api-calls/helpers.type";

export interface HomebrewAssetCollectionDocument {
  collectionId: string; // Homebrew collection id
  label: string;
  description?: string;
  enhancesId?: Nullable<string>;
  replacesId?: Nullable<string>;
}
