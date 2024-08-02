import { NoteSource, NotesSliceData } from "./notes.slice.type";

export const defaultNotesSlice: NotesSliceData = {
  notes: {
    [NoteSource.Character]: [],
    [NoteSource.Campaign]: [],
  },
  loading: false,
  error: undefined,

  openNote: undefined,
  openNoteContent: undefined,
};
