import { getDoc } from "firebase/firestore";
import { CampaignDocument } from "api-calls/campaign/_campaign.type";
import { getCampaignDoc } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";

export const getCampaign = createApiFunction<string, CampaignDocument>(
  (campaignId) => {
    return new Promise((resolve, reject) => {
      getDoc(getCampaignDoc(campaignId))
        .then((snapshot) => {
          const campaign = snapshot.data();

          if (campaign) {
            resolve(campaign);
          } else {
            reject("Could not find campaign");
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  "Failed to load campaign."
);
