export interface HomebrewAssetAbility {
  name?: string;
  text: string;
  defaultEnabled?: boolean;
}

export interface HomebrewAssetOption {
  type: "text" | "select";
  label: string;
  options?: string[];
}

interface HomebrewAssetConditionMeter {
  type: "conditionMeter";
  label: string;
  min: number;
  max: number;
}

interface HomebrewAssetCheckbox {
  type: "checkbox";
  label: string;
}

interface HomebrewAssetSelect {
  type: "select";
  label: string;
  options: string[];
}

export type HomebrewAssetControl =
  | HomebrewAssetConditionMeter
  | HomebrewAssetCheckbox
  | HomebrewAssetSelect;

export interface HomebrewAssetDocument {
  collectionId: string; // Homebrew collection id
  categoryKey: string;

  label: string;
  requirement?: string;
  shared?: boolean;

  controls?: HomebrewAssetControl[];
  options?: HomebrewAssetOption[];
  abilities: HomebrewAssetAbility[];

  // replacesId?: string;
}
