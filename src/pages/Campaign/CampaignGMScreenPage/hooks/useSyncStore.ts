import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useListenToCampaignTracks } from "stores/campaign/currentCampaign/tracks/useListenToCampaignTracks";
import { useListenToCurrentCampaignCharacters } from "stores/campaign/currentCampaign/characters/useListenToCurrentCampaignCharacters";
import { useStore } from "stores/store";
import { useListenToCurrentCampaignCharacterAssets } from "stores/campaign/currentCampaign/characters/useListenToCurrentCampaignCharacterAssets";
import { useListenToCurrentCampaignCharacterTracks } from "stores/campaign/currentCampaign/characters/useListenToCurrentCampaignCharacterTracks";
import { useListenToSettings } from "stores/settings/useListenToSettings";
import { useListenToNotes } from "stores/notes/useListenToNotes";
import { useListenToLocations } from "stores/world/currentWorld/locations/useListenToLocations";
import { useListenToNPCs } from "stores/world/currentWorld/npcs/useListenToNPCs";
import { useListenToLoreDocuments } from "stores/world/currentWorld/lore/useListenToLoreDocuments";
import { useListenToNewLogs } from "stores/gameLog/useListenToNewLogs";
import { useListenToSectors } from "stores/world/currentWorld/sector/useListenToSectors";
import { useListenToSectorLocations } from "stores/world/currentWorld/sector/sectorLocations/useListenToSectorLocations";

export function useSyncStore() {
  const { campaignId } = useParams();

  const setCampaignId = useStore(
    (store) => store.campaigns.currentCampaign.setCurrentCampaignId
  );

  useEffect(() => {
    setCampaignId(campaignId);
  }, [campaignId, setCampaignId]);

  useListenToCurrentCampaignCharacters();
  useListenToCurrentCampaignCharacterAssets();
  useListenToCurrentCampaignCharacterTracks();
  useListenToCampaignTracks();

  useListenToLocations();
  useListenToNPCs();
  useListenToLoreDocuments();
  useListenToSectors();
  useListenToSectorLocations();

  useListenToNotes();

  useListenToSettings();
  useListenToNewLogs();
}
