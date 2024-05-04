import { MoveStatKeys } from "./stats.enum";

export interface StoredMove {
  $id: string;
  name: string;
  stats?: MoveStatKeys[];
  text: string;
  oracleIds?: string[];
}
