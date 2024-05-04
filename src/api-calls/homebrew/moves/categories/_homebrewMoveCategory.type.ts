import { Nullable } from "api-calls/helpers.type";

export interface HomebrewMoveCategoryDocument {
  collectionId: string;
  label: string;
  description?: string;
  enhancesId?: Nullable<string>;
  replacesId?: Nullable<string>;
}
