import { Unsubscribe } from "firebase/firestore";
import { AssetDocument } from "api-calls/assets/_asset.type";

export interface SharedAssetSliceData {
  assets: { [key: string]: AssetDocument };
  loading: boolean;
  error?: string;
}

export interface SharedAssetSliceActions {
  subscribe: (campaignId: string) => Unsubscribe;

  addAsset: (asset: AssetDocument) => Promise<void>;
  removeAsset: (assetId: string) => Promise<void>;
  updateAssetCheckbox: (
    assetId: string,
    abilityIndex: number,
    checked: boolean
  ) => Promise<void>;
  updateAssetOption: (
    assetId: string,
    optionKey: string,
    value: string
  ) => Promise<void>;
  updateAssetControl: (
    assetId: string,
    controlKey: string,
    value: number | string | boolean
  ) => Promise<void>;

  resetStore: () => void;
}

export type SharedAssetSlice = SharedAssetSliceData & SharedAssetSliceActions;
