import { Bytes, Timestamp } from "firebase/firestore";
import { Lore } from "types/Lore.type";

export interface LoreDocument
  extends Omit<Lore, "updatedDate" | "createdDate"> {
  updatedTimestamp: Timestamp;
  createdTimestamp: Timestamp;
}

export interface GMLoreDocument {
  gmNotes?: Bytes;
}

export interface LoreNotesDocument {
  notes: Bytes;
}
