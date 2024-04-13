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

interface StoredHomebrewAssetConditionMeter {
  type: "conditionMeter";
  label: string;
  min: number;
  max: number;
}

interface StoredHomebrewAssetCheckbox {
  type: "checkbox";
  label: string;
}

interface StoredHomebrewAssetSelect {
  type: "select";
  label: string;
  options: string[];
}

export type StoredHomebrewAssetControl =
  | StoredHomebrewAssetConditionMeter
  | StoredHomebrewAssetCheckbox
  | StoredHomebrewAssetSelect;

export interface StoredHomebrewAsset {
  collectionId: string; // Homebrew collection id
  categoryKey: string;

  label: string;
  requirement?: string;
  shared?: boolean;

  controls?: StoredHomebrewAssetControl[];
  options?: StoredHomebrewAssetOption[];
  abilities: StoredHomebrewAssetAbility[];

  // replacesId?: string;
}
