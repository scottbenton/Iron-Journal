import { StoredMove } from "types/Moves.type";

export interface CustomMoveDocument {
  moves: { [moveId: string]: StoredMove };
  moveOrder: string[];
}
