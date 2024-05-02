import { firestore } from "config/firebase.config";
import { doc, DocumentReference } from "firebase/firestore";
import { SettingsDocument } from "api-calls/character-campaign-settings/_character-campaign-settings.type";

export function constructCampaignSettingsDocPath(campaignId: string) {
  return `/campaigns/${campaignId}/settings/settings`;
}

export function getCampaignSettingsDoc(campaignId: string) {
  return doc(
    firestore,
    constructCampaignSettingsDocPath(campaignId)
  ) as DocumentReference<SettingsDocument>;
}

export function constructCharacterSettingsDocPath(characterId: string) {
  return `/characters/${characterId}/settings/settings`;
}

export function getCharacterSettingsDoc(characterId: string) {
  return doc(
    firestore,
    constructCharacterSettingsDocPath(characterId)
  ) as DocumentReference<SettingsDocument>;
}
