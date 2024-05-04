import type { Asset as DataforgedAsset } from "dataforged";

export interface AssetDocument {
  id: string;
  enabledAbilities: Record<number, boolean>;
  optionValues?: Record<string, string>;
  controlValues?: Record<string, boolean | string | number>;
  order: number;

  // Deprecated - the above fields should be used instead
  // !! note - the database may not have the upper fields filled yet, I have not ran (or written) the migration script yet
  // TODO - Remove when assets are updated
  customAsset?: DataforgedAsset | null;
  conditions?: Record<string, boolean>;
  inputs?: Record<string, string> | null;
  trackValue?: number | null;
}
