import { NoteSource, NotesSliceData, ROLL_LOG_ID } from "./notes.slice.type";

export const defaultNotesSlice: NotesSliceData = {
  notes: {
    [NoteSource.Character]: [],
    [NoteSource.Campaign]: [],
  },
  loading: false,
  error: undefined,

  openNote: ROLL_LOG_ID,
  openNoteContent: undefined,
};
