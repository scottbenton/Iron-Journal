export interface HomebrewNonLinearMeterDocument {
  dataswornId: string;
  collectionId: string;
  description?: string;
  shared: boolean;
  label: string;
  options: {
    value: number | string;
    readOnly: boolean;
  }[];
  rollable: boolean;
}
