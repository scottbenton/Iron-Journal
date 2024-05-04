export interface Location {
  name: string;
  imageFilenames?: string[];
  sharedWithPlayers?: boolean;
  characterBonds?: { [characterId: string]: boolean };
  updatedDate: Date;
  createdDate: Date;
}

export interface GMLocation {
  descriptor?: string;
  trouble?: string;
  locationFeatures?: string;
  gmNotes?: Uint8Array;
}
