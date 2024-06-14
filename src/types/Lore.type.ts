import { IconDefinition } from "./Icon.type";

export interface Lore {
  name: string;
  imageFilenames?: string[];
  icon?: IconDefinition;
  sharedWithPlayers?: boolean;
  tags?: string[];
  updatedDate: Date;
  createdDate: Date;
}

export interface GMLore {
  gmNotes?: Uint8Array;
}
