export interface Lore {
  name: string;
  imageFilenames?: string[];
  sharedWithPlayers?: boolean;
  tags?: string[];
  updatedDate: Date;
  createdDate: Date;
}

export interface GMLore {
  gmNotes?: Uint8Array;
}
