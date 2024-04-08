export interface StoredHomebrewAssetCollection {
  collectionId: string; // Homebrew collection id
  label: string;
  description?: string;
  enhancesId?: string;
  replacesId?: string;
}

export interface StoredHomebrewAssetAbility {
  name?: string;
  text: string;
  defaultEnabled?: boolean;
}

export interface StoredHomebrewAsset {
  collectionId: string; // Homebrew collection id
  categoryKey: string;

  label: string;
  requirement?: string;
  shared?: boolean;

  // controls?:
  // options?:
  abilities: StoredHomebrewAssetAbility[];

  replacesId?: string;
}
