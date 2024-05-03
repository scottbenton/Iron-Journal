import { createApiFunction } from "api-calls/createApiFunction";
import { addDoc } from "firebase/firestore";
import { getHomebrewAssetCollection } from "./_getRef";
import { HomebrewAssetDocument } from "api-calls/homebrew/assets/assets/_homebrewAssets.type";

export const createHomebrewAsset = createApiFunction<
  { asset: HomebrewAssetDocument },
  void
>((params) => {
  const { asset } = params;
  return new Promise((resolve, reject) => {
    addDoc(getHomebrewAssetCollection(), asset)
      .then(() => resolve())
      .catch(reject);
  });
}, "Failed to create asset.");
