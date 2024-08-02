import { updateDoc } from "firebase/firestore";
import { getCampaignNoteDocument, getCharacterNoteDocument } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";

export const updateNoteShared = createApiFunction<
  {
    campaignId: string | undefined;
    characterId: string | undefined;
    noteId: string;
    shared: boolean;
  },
  void
>((params) => {
  const { campaignId, characterId, noteId, shared } = params;

  return new Promise((resolve, reject) => {
    if (!campaignId && !characterId) {
      reject(new Error("Either campaign or character ID must be defined."));
      return;
    }

    updateDoc(
      characterId
        ? getCharacterNoteDocument(characterId, noteId)
        : getCampaignNoteDocument(campaignId as string, noteId),
      {
        shared,
      }
    )
      .then(() => resolve())
      .catch(reject);
  });
}, "Failed to update note.");
