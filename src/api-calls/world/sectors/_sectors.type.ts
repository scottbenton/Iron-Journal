import { Timestamp } from "firebase/firestore";
import { Sector } from "types/Sector.type";

export interface SectorDocument extends Omit<Sector, "createdDate"> {
  createdTimestamp: Timestamp;
}
