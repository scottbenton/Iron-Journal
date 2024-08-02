import { CreateSliceType } from "stores/store.type";
import { NoteSource, NotesSlice } from "./notes.slice.type";
import { defaultNotesSlice } from "./notes.slice.default";
import { listenToNotes } from "api-calls/notes/listenToNotes";
import { listenToNoteContent } from "api-calls/notes/listenToNoteContent";
import { addNote } from "api-calls/notes/addNote";
import { updateNote } from "api-calls/notes/updateNote";
import { updateNoteOrder } from "api-calls/notes/updateNoteOrder";
import { removeNote } from "api-calls/notes/removeNote";
import { updateNoteShared } from "api-calls/notes/updateNoteShared";

export const createNotesSlice: CreateSliceType<NotesSlice> = (
  set,
  getState
) => ({
  ...defaultNotesSlice,

  subscribe: (campaignId, loadAllCampaignDocs, characterId) => {
    if (!campaignId && !characterId) {
      return () => {};
    }

    set((store) => {
      store.notes.loading = true;
    });
    return listenToNotes(
      campaignId,
      characterId,
      !loadAllCampaignDocs,
      (source, notes) => {
        set((store) => {
          store.notes.loading = false;
          store.notes.notes[source] = notes;
          store.notes.error = undefined;
        });
      },
      (error) => {
        console.error(error);
        set((store) => {
          store.notes.loading = false;
          store.notes.error = "Failed to load notes.";
        });
      }
    );
  },

  subscribeToNoteContent: (note) => {
    const state = getState();

    const campaignId = state.campaigns.currentCampaign.currentCampaignId;
    const characterId = state.characters.currentCharacter.currentCharacterId;

    if (!campaignId && !characterId) {
      return () => {};
    }

    return listenToNoteContent(
      note.source === NoteSource.Campaign ? campaignId : undefined,
      note.source === NoteSource.Character ? characterId : undefined,
      note.id,
      (content) => {
        set((store) => {
          if (
            typeof store.notes.openNote !== "string" &&
            store.notes.openNote?.id === note.id
          ) {
            store.notes.openNoteContent = content ?? null;
          }
        });
      },
      (error) => {
        console.error(error);
      }
    );
  },

  setOpenNoteId: (openNote) => {
    set((store) => {
      const currentOpenNote = store.notes.openNote;
      if (
        !currentOpenNote ||
        !openNote ||
        typeof currentOpenNote === "string" ||
        typeof openNote === "string"
      ) {
        store.notes.openNote = openNote;
        store.notes.openNoteContent = undefined;
      } else if (
        currentOpenNote.id !== openNote.id ||
        currentOpenNote.source !== openNote.source
      ) {
        store.notes.openNote = openNote;
        store.notes.openNoteContent = undefined;
      }
    });
  },

  temporarilyReorderNotes: (note, order) => {
    set((store) => {
      const noteIndex = store.notes.notes[note.source].findIndex(
        (noteItem) => note.id === noteItem.noteId
      );

      if (typeof noteIndex !== "number" || noteIndex < 0) return;

      store.notes.notes[note.source][noteIndex].order = order;
      store.notes.notes[note.source].sort((n1, n2) => n1.order - n2.order);
    });
  },

  addNote: (source, order, shared) => {
    const state = getState();
    const campaignId = state.campaigns.currentCampaign.currentCampaignId;
    const characterId = state.characters.currentCharacter.currentCharacterId;

    return addNote({
      campaignId: source === NoteSource.Campaign ? campaignId : undefined,
      characterId: source === NoteSource.Character ? characterId : undefined,
      order,
      shared,
    });
  },

  updateNote: (
    source,
    campaignId,
    characterId,
    noteId,
    title,
    content,
    isBeaconRequest
  ) => {
    return updateNote({
      campaignId: source === NoteSource.Campaign ? campaignId : undefined,
      characterId: source === NoteSource.Character ? characterId : undefined,
      noteId,
      title,
      content,
      isBeaconRequest,
    });
  },

  updateNoteOrder: (note, order) => {
    const state = getState();
    const campaignId = state.campaigns.currentCampaign.currentCampaignId;
    const characterId = state.characters.currentCharacter.currentCharacterId;

    return updateNoteOrder({
      campaignId: note.source === NoteSource.Campaign ? campaignId : undefined,
      characterId:
        note.source === NoteSource.Character ? characterId : undefined,
      noteId: note.id,
      order,
    });
  },

  removeNote: (note) => {
    const state = getState();
    const campaignId = state.campaigns.currentCampaign.currentCampaignId;
    const characterId = state.characters.currentCharacter.currentCharacterId;

    return removeNote({
      campaignId: note.source === NoteSource.Campaign ? campaignId : undefined,
      characterId:
        note.source === NoteSource.Character ? characterId : undefined,
      noteId: note.id,
    });
  },

  updateNoteShared: (note, shared) => {
    const state = getState();
    const campaignId = state.campaigns.currentCampaign.currentCampaignId;
    const characterId = state.characters.currentCharacter.currentCharacterId;

    return updateNoteShared({
      campaignId: note.source === NoteSource.Campaign ? campaignId : undefined,
      characterId:
        note.source === NoteSource.Character ? characterId : undefined,
      noteId: note.id,
      shared,
    });
  },

  resetStore: () => {
    set((store) => {
      store.notes = {
        ...store.notes,
        ...defaultNotesSlice,
      };
    });
  },
});
