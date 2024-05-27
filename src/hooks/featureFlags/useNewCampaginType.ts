import { useFeatureFlag } from "./useFeatureFlag";

export function useNewCampaignType() {
  return useFeatureFlag("new-campaign-type");
}
