import { Timestamp } from "firebase/firestore";
import { Roll } from "types/DieRolls.type";

export type GameLogDocument = Omit<Roll, "timestamp"> & {
  timestamp: Timestamp;
};
