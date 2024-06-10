export interface Location {
  name: string;

  imageFilenames?: string[];
  sharedWithPlayers?: boolean;
  // Ironsworn only
  characterBonds?: Record<string, boolean>;

  // New Fields - locations 2.0
  type?: string;
  fields?: Record<string, string>;
  map?: Record<number, Record<number, string>>;

  updatedDate: Date;
  createdDate: Date;
}

export interface GMLocation {
  fields?: Record<string, string>;
  gmNotes?: Uint8Array;
  // Todo - deprecate
  descriptor?: string;
  trouble?: string;
  locationFeatures?: string;
}
