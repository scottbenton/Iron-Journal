import { Bytes } from "firebase/firestore";

export interface NoteDocument {
  title: string;
  order: number;
}

export interface NoteContentDocument {
  notes?: Bytes; // Can be converted out to JSON or HTML - see DatabaseStructure.md
}
