import { createApiFunction } from "api-calls/createApiFunction";
import { addDoc } from "firebase/firestore";
import { HomebrewAssetCollectionDocument } from "api-calls/homebrew/assets/collections/_homebrewAssetCollection.type";

import { getHomebrewAssetCollectionCollection } from "./_getRef";

export const createHomebrewAssetCollection = createApiFunction<
  { assetCollection: HomebrewAssetCollectionDocument },
  void
>((params) => {
  const { assetCollection } = params;

  return new Promise((resolve, reject) => {
    addDoc(getHomebrewAssetCollectionCollection(), assetCollection)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}, "Failed to create asset collection.");
