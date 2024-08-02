import {
  DocumentData,
  onSnapshot,
  query,
  QuerySnapshot,
  Unsubscribe,
  where,
} from "firebase/firestore";
import {
  getCampaignNoteCollection,
  getCharacterNoteCollection,
} from "./_getRef";
import { Note } from "types/Notes.type";
import { NoteSource } from "stores/notes/notes.slice.type";
import { NoteDocument } from "./_notes.type";

export function listenToNotes(
  campaignId: string | undefined,
  characterId: string | undefined,
  onlySharedCampaignNotes: boolean,
  onNotes: (source: NoteSource, notes: Note[]) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: any) => void
): Unsubscribe {
  if (!campaignId && !characterId) {
    onError("Either character or campaign ID must be defined.");
    return () => {};
  }

  const handleSnapshot = (
    source: NoteSource,
    snapshot: QuerySnapshot<NoteDocument, DocumentData>
  ) => {
    const notes: Note[] = snapshot.docs
      .map((doc) => {
        const noteDoc = doc.data();

        return {
          noteId: doc.id,
          ...noteDoc,
          shared: noteDoc.shared ?? false,
        };
      })
      .sort((n1, n2) => n1.order - n2.order);

    onNotes(source, notes);
  };

  const characterUnsubscribe = characterId
    ? onSnapshot(
        getCharacterNoteCollection(characterId),
        (snapshot) => handleSnapshot(NoteSource.Character, snapshot),
        onError
      )
    : () => {};

  const campaignUnsubscribe = campaignId
    ? onSnapshot(
        onlySharedCampaignNotes
          ? query(
              getCampaignNoteCollection(campaignId),
              where("shared", "==", true)
            )
          : getCampaignNoteCollection(campaignId),
        (snapshot) => handleSnapshot(NoteSource.Campaign, snapshot),
        onError
      )
    : () => {};

  return () => {
    characterUnsubscribe();
    campaignUnsubscribe();
  };
}
