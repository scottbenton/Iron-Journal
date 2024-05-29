import { CampaignType } from "api-calls/campaign/_campaign.type";
import { useCampaignType } from "hooks/useCampaignType";
import { useStore } from "stores/store";

export function useWorldPermissions() {
  const { showGuideTips, campaignType } = useCampaignType();

  const isOnCharacterSheet = useStore(
    (store) => !!store.characters.currentCharacter.currentCharacter
  );
  const isSinglePlayer = useStore((store) =>
    store.characters.currentCharacter.currentCharacter
      ? !store.characters.currentCharacter.currentCharacter.campaignId
      : false
  );
  const isGM = useStore((store) =>
    store.campaigns.currentCampaign.currentCampaign?.gmIds?.includes(
      store.auth.uid
    )
  );
  const isWorldOwner = useStore((store) =>
    store.worlds.currentWorld.currentWorld?.ownerIds.includes(store.auth.uid)
  );

  const showGMFields =
    isSinglePlayer || isGM || (isWorldOwner && !isOnCharacterSheet);

  return {
    showGMFields,
    showGMTips: showGuideTips,
    isGuidedGame: campaignType === CampaignType.Guided,
    isSinglePlayer,
  };
}
