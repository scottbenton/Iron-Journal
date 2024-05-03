export interface HomebrewAssetCollectionDocument {
  collectionId: string; // Homebrew collection id
  label: string;
  description?: string;
  enhancesId?: string;
  replacesId?: string;
}
