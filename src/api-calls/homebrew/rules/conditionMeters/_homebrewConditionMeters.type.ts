export interface HomebrewConditionMeterDocument {
  dataswornId: string;
  collectionId: string;
  description?: string;
  shared: boolean;
  label: string;
  value: number;
  min: number;
  max: number;
  rollable: boolean;
}
