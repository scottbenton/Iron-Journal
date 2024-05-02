import { UpdateData, updateDoc } from "firebase/firestore";
import { getCampaignDoc } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";
import { CampaignDocument } from "api-calls/campaign/_campaign.type";

export const updateCampaign = createApiFunction<
  {
    campaignId: string;
    campaign: UpdateData<CampaignDocument>;
  },
  void
>((params) => {
  const { campaignId, campaign } = params;
  return new Promise((resolve, reject) => {
    updateDoc(getCampaignDoc(campaignId), campaign)
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}, "Failed to update campaign.");
