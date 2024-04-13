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

export interface StoredHomebrewAssetOption {
  type: "text" | "select";
  label: string;
  options?: string[];
}

export interface StoredHomebrewAsset {
  collectionId: string; // Homebrew collection id
  categoryKey: string;

  label: string;
  requirement?: string;
  shared?: boolean;

  // controls?:
  options?: StoredHomebrewAssetOption[];
  abilities: StoredHomebrewAssetAbility[];

  replacesId?: string;
}
