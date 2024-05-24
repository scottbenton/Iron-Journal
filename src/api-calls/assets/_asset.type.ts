export interface AssetDocument {
  id: string;
  enabledAbilities: Record<number, boolean>;
  optionValues?: Record<string, string>;
  controlValues?: Record<string, boolean | string | number>;
  order: number;
}
