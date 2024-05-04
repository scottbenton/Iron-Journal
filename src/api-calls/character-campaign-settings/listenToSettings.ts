import { onSnapshot } from "firebase/firestore";
import { SettingsDocument } from "api-calls/character-campaign-settings/_character-campaign-settings.type";
import { getCampaignSettingsDoc, getCharacterSettingsDoc } from "./_getRef";

export function listenToSettings(
  campaignId: string | undefined,
  characterId: string | undefined,
  onSettings: (settings: SettingsDocument) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: any) => void
) {
  if (!campaignId && !characterId) {
    onError("Either campaign or character ID must be defined.");
    return () => {};
  }
  return onSnapshot(
    campaignId
      ? getCampaignSettingsDoc(campaignId)
      : getCharacterSettingsDoc(characterId as string),
    (snapshot) => {
      onSettings({
        hiddenCustomMoveIds: [],
        hiddenCustomOraclesIds: [],
        customStats: [],
        customTracks: {},
        ...snapshot.data(),
      });
    },
    (error) => onError(error)
  );
}
