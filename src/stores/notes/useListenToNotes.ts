import { Unsubscribe } from "firebase/firestore";
import { useEffect } from "react";
import { useStore } from "stores/store";
import { ROLL_LOG_ID } from "./notes.slice.type";
import { CampaignType } from "api-calls/campaign/_campaign.type";

export function useListenToNotes() {
  const campaignId = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaignId
  );
  const showAllCampaignDocs = useStore((store) => {
    const isGuidedCampaign =
      (store.campaigns.currentCampaign.currentCampaign?.type ??
        CampaignType.Guided) === CampaignType.Guided;
    const isGM =
      store.campaigns.currentCampaign.currentCampaign?.gmIds?.includes(
        store.auth.uid
      );
    return !isGuidedCampaign || isGM || false;
  });
  const characterId = useStore(
    (store) => store.characters.currentCharacter.currentCharacterId
  );

  const openNote = useStore((store) => store.notes.openNote);

  const subscribe = useStore((store) => store.notes.subscribe);
  const subscribeToNoteContent = useStore(
    (store) => store.notes.subscribeToNoteContent
  );

  useEffect(() => {
    const unsubscribe = subscribe(campaignId, showAllCampaignDocs, characterId);

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [campaignId, characterId, subscribe, showAllCampaignDocs]);

  useEffect(() => {
    let unsubscribe: Unsubscribe;

    if (openNote && openNote !== ROLL_LOG_ID) {
      subscribeToNoteContent(openNote);
    }

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [openNote, subscribeToNoteContent]);
}
