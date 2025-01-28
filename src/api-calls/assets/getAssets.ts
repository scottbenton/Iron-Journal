import { getDocs } from "firebase/firestore";
import {
  getCampaignAssetCollection,
  getCharacterAssetCollection,
} from "./_getRef";
import { AssetDocument } from "api-calls/assets/_asset.type";
import { createApiFunction } from "api-calls/createApiFunction";

interface GetAssetsParams {
  campaignId?: string;
  characterId?: string;
}

export const getAssets = createApiFunction<GetAssetsParams, AssetDocument[]>(async (params) => {
  const { characterId, campaignId } = params;

  if (!characterId && !campaignId) {
    throw new Error("Either character or campaign ID must be defined.");
  }

  const collectionRef = characterId
    ? getCharacterAssetCollection(characterId)
    : getCampaignAssetCollection(campaignId as string);

  const querySnapshot = await getDocs(collectionRef);
  return querySnapshot.docs.map(doc => doc.data() as AssetDocument);
}, "Error fetching assets");
