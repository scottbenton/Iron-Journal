export interface HomebrewOracleCollectionDocument {
  collectionId: string; // Homebrew collection id
  label: string;
  parentOracleCollectionId?: string;
  description?: string;
  enhancesId?: string;
  replacesId?: string;
}
