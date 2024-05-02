import { onSnapshot } from "firebase/firestore";
import {
  getCampaignAssetCollection,
  getCharacterAssetCollection,
} from "./_getRef";
import { AssetDocument } from "api-calls/assets/_asset.type";

export function listenToAssets(
  characterId: string | undefined,
  campaignId: string | undefined,
  onAssets: (assets: { [assetId: string]: AssetDocument }) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: any) => void
) {
  if (!characterId && !campaignId) {
    onError(new Error("Either character or campaign id must be defined."));
    return () => {};
  }
  return onSnapshot(
    characterId
      ? getCharacterAssetCollection(characterId)
      : getCampaignAssetCollection(campaignId as string),
    (snapshot) => {
      const assetMap: { [assetId: string]: AssetDocument } = {};

      snapshot.docs.forEach((doc) => (assetMap[doc.id] = doc.data()));
      onAssets(assetMap);
    },
    (error) => onError(error)
  );
}
