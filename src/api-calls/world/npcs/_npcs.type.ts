import { Bytes, Timestamp } from "firebase/firestore";
import { NPC, GMNPC } from "types/NPCs.type";

export interface NPCDocument extends Omit<NPC, "updatedDate" | "createdDate"> {
  updatedTimestamp: Timestamp;
  createdTimestamp: Timestamp;
}

export interface NPCNotesDocument {
  notes: Bytes;
}

export interface GMNPCDocument extends Omit<GMNPC, "gmNotes"> {
  gmNotes: Bytes;
}
