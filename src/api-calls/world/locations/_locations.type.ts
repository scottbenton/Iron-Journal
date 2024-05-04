import { Bytes, Timestamp } from "firebase/firestore";
import { GMLocation, Location } from "types/Locations.type";

export type LocationDocument = Omit<Location, "createdDate" | "updatedDate"> & {
  createdTimestamp: Timestamp;
  updatedTimestamp: Timestamp;
};

export type GMLocationDocument = Omit<GMLocation, "gmNotes"> & {
  gmNotes: Bytes;
};

export interface LocationNotesDocument {
  notes: Bytes;
}
