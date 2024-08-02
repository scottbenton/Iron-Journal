import { Unsubscribe } from "firebase/firestore";
import { Note } from "types/Notes.type";

export const ROLL_LOG_ID = "roll-log";

export enum NoteSource {
  Character = "character",
  Campaign = "campaign",
}

export interface NotesSliceData {
  notes: Record<NoteSource, Note[]>;
  loading: boolean;
  error?: string;

  openNote:
    | typeof ROLL_LOG_ID
    | {
        source: NoteSource;
        id: string;
      };
  openNoteContent?: Uint8Array | null;
}

export interface NotesSliceActions {
  subscribe: (
    campaignId: string | undefined,
    loadAllCampaignDocs: boolean,
    characterId: string | undefined
  ) => Unsubscribe;
  subscribeToNoteContent: (note: {
    source: NoteSource;
    id: string;
  }) => Unsubscribe;

  setOpenNoteId: (
    note?: typeof ROLL_LOG_ID | { source: NoteSource; id: string }
  ) => void;

  temporarilyReorderNotes: (
    note: { source: NoteSource; id: string },
    order: number
  ) => void;

  addNote: (
    source: NoteSource,
    order: number,
    shared?: boolean
  ) => Promise<string>;
  updateNote: (
    source: NoteSource,
    campaignId: string | undefined,
    characterId: string | undefined,
    noteId: string,
    title: string,
    content: Uint8Array | undefined,
    isBeaconRequest?: boolean
  ) => Promise<void>;
  updateNoteOrder: (
    note: { source: NoteSource; id: string },
    order: number
  ) => Promise<void>;
  updateNoteShared: (
    note: { source: NoteSource; id: string },
    shared: boolean
  ) => Promise<void>;
  removeNote: (note: { source: NoteSource; id: string }) => Promise<void>;

  resetStore: () => void;
}

export type NotesSlice = NotesSliceData & NotesSliceActions;
