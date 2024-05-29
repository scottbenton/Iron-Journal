import { CampaignType } from "api-calls/campaign/_campaign.type";
import { useStore } from "stores/store";

export function useCampaignType(): {
  campaignType: CampaignType;
  showGuideTips: boolean;
  showGuidedPlayerView: boolean;
  hasMultipleCharacters: boolean;
} {
  const uid = useStore((store) => store.auth.uid);
  const hasCampaign = useStore(
    (store) => !!store.campaigns.currentCampaign.currentCampaign
  );
  const campaignType = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign?.type
  );
  const campaignHasMultipleCharacters = useStore(
    (store) =>
      (store.campaigns.currentCampaign.currentCampaign?.characters?.length ??
        0) > 1
  );
  const isCampaignGM = useStore(
    (store) =>
      store.campaigns.currentCampaign.currentCampaign?.gmIds?.includes(uid) ??
      false
  );
  const hasCharacter = useStore(
    (store) => !!store.characters.currentCharacter.currentCharacter
  );
  const characterIsInCampaign = useStore(
    (store) => !!store.characters.currentCharacter.currentCharacter?.campaignId
  );

  const hasWorld = useStore(
    (store) => !!store.worlds.currentWorld.currentWorld
  );
  const isWorldOwner = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorld?.ownerIds.includes(uid) ?? false
  );

  let type: CampaignType = CampaignType.Solo;
  let showGuideTips = false;
  let showGuidedPlayerView = false;
  let hasMultipleCharacters = false;

  if (hasCharacter && !characterIsInCampaign) {
    type = CampaignType.Solo;
    showGuideTips = false;
    showGuidedPlayerView = false;
    hasMultipleCharacters = false;
  }
  if (hasCampaign) {
    if (!campaignType || campaignType === CampaignType.Guided) {
      if (isCampaignGM) {
        type = CampaignType.Guided;
        showGuideTips = true;
        showGuidedPlayerView = false;
        hasMultipleCharacters = true;
      } else {
        type = CampaignType.Guided;
        showGuideTips = false;
        showGuidedPlayerView = true;
        hasMultipleCharacters = true;
      }
    } else if (campaignType === CampaignType.Coop) {
      type = CampaignType.Coop;
      showGuideTips = false;
      showGuidedPlayerView = false;
      hasMultipleCharacters = true;
    } else {
      type = CampaignType.Solo;
      showGuideTips = false;
      showGuidedPlayerView = false;
      hasMultipleCharacters = campaignHasMultipleCharacters;
    }
  } else if (hasWorld) {
    if (isWorldOwner) {
      type = CampaignType.Guided;
      showGuideTips = true;
      showGuidedPlayerView = false;
      hasMultipleCharacters = true;
    } else {
      type = CampaignType.Guided;
      showGuideTips = false;
      showGuidedPlayerView = true;
      hasMultipleCharacters = true;
    }
  }
  console.debug("Campaign Type:", type);
  console.debug("Show Guid Tips:", showGuideTips);
  console.debug("Show Guided Player View:", showGuidedPlayerView);
  console.debug("Has Multiple Characters:", hasMultipleCharacters);
  return {
    campaignType: type,
    showGuideTips,
    showGuidedPlayerView,
    hasMultipleCharacters,
  };
}
