import { CampaignType } from "api-calls/campaign/_campaign.type";
import { useCampaignType } from "hooks/useCampaignType";
import { useStore } from "stores/store";

export function useWorldPermissions() {
  const { showGuideTips, showGuidedPlayerView, campaignType } =
    useCampaignType();

  const isSinglePlayer = useStore((store) =>
    store.characters.currentCharacter.currentCharacter
      ? !store.characters.currentCharacter.currentCharacter.campaignId
      : false
  );

  return {
    showGMFields: !showGuidedPlayerView,
    showGMTips: showGuideTips,
    isGuidedGame: campaignType === CampaignType.Guided,
    isSinglePlayer,
  };
}
