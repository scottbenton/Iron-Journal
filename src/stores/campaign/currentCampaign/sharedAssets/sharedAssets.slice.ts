import { CreateSliceType } from "stores/store.type";
import { SharedAssetSlice } from "./sharedAssets.slice.type";
import { defaultSharedAssetsSlice } from "./sharedAssets.slice.default";
import { listenToAssets } from "api-calls/assets/listenToAssets";
import { addAsset } from "api-calls/assets/addAsset";
import { removeAsset } from "api-calls/assets/removeAsset";
import { updateAsset } from "api-calls/assets/updateAsset";
import { updateAssetCheckbox } from "api-calls/assets/updateAssetCheckbox";

export const createSharedAssetsSlice: CreateSliceType<SharedAssetSlice> = (
  set,
  getState
) => ({
  ...defaultSharedAssetsSlice,

  subscribe: (campaignId) => {
    set((store) => {
      store.campaigns.currentCampaign.assets.loading = true;
    });
    return listenToAssets(
      undefined,
      campaignId,
      (assets) => {
        set((store) => {
          store.campaigns.currentCampaign.assets.assets = assets;
          store.campaigns.currentCampaign.assets.loading = false;
        });
      },
      (error) => {
        console.error(error);
        set((store) => {
          store.campaigns.currentCampaign.assets.loading = false;
          store.campaigns.currentCampaign.assets.error = error;
        });
      }
    );
  },

  addAsset: (asset) => {
    const campaignId = getState().campaigns.currentCampaign.currentCampaignId;
    if (!campaignId) {
      return new Promise((res, reject) => reject("Campaign ID not defined"));
    }
    return addAsset({ asset, campaignId });
  },
  removeAsset: (assetId) => {
    const campaignId = getState().campaigns.currentCampaign.currentCampaignId;
    if (!campaignId) {
      return new Promise((res, reject) => reject("Campaign ID not defined"));
    }
    return removeAsset({ campaignId, assetId });
  },
  updateAssetCheckbox: (assetId, abilityIndex, checked) => {
    const campaignId = getState().campaigns.currentCampaign.currentCampaignId;
    if (!campaignId) {
      return new Promise((res, reject) => reject("Campaign ID not defined"));
    }

    return updateAssetCheckbox({ campaignId, assetId, abilityIndex, checked });
  },
  updateAssetOption: (assetId, optionKey, value) => {
    const campaignId = getState().campaigns.currentCampaign.currentCampaignId;
    const storedAssetId =
      getState().campaigns.currentCampaign.assets.assets[assetId]?.id;
    if (!campaignId || !storedAssetId) {
      return new Promise((res, reject) => reject("Campaign ID not defined"));
    }
    return updateAsset({
      campaignId,
      assetId,
      asset: { [`optionValues.${optionKey}`]: value },
    });
  },
  updateAssetControl: (assetId, controlKey, value) => {
    const campaignId = getState().campaigns.currentCampaign.currentCampaignId;
    if (!campaignId) {
      return new Promise((res, reject) => reject("Campaign ID not defined"));
    }

    return updateAsset({
      campaignId,
      assetId,
      asset: { [`controlValues.${controlKey}`]: value },
    });
  },

  resetStore: () => {
    set((store) => {
      store.campaigns.currentCampaign.assets = {
        ...store.campaigns.currentCampaign.assets,
        ...defaultSharedAssetsSlice,
      };
    });
  },
});
