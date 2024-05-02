import { addDoc } from "firebase/firestore";
import { supplyTrack } from "../../data/defaultTracks";
import { CampaignDocument } from "../../api-calls/campaign/_campaign.type";
import { getCampaignCollection } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";

export const createCampaign = createApiFunction<
  { uid: string; campaignName: string },
  string
>((params) => {
  const { uid, campaignName } = params;
  return new Promise((resolve, reject) => {
    const storedCampaign: CampaignDocument = {
      name: campaignName,
      users: [uid],
      characters: [],
      supply: supplyTrack.startingValue,
    };

    addDoc(getCampaignCollection(), storedCampaign)
      .then((doc) => {
        resolve(doc.id);
      })
      .catch((err) => {
        reject(err);
      });
  });
}, "Error creating campaign.");
