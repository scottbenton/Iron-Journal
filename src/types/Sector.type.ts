export enum SectorHexTypes {
  Planet = "planet",
  Star = "star",
  Vault = "vault",
  Settlement = "settlement",
  Derelict = "derelict",
  // SHIP = "ship",
  // CREATURE = "creature",
  Other = "other",
  Path = "path",
}

export enum Regions {
  Terminus = "Terminus",
  Outlands = "Outlands",
  Expanse = "Expanse",
  Void = "Void",
}

export interface SectorMapEntry {
  type: SectorHexTypes;
  locationId?: string;
}

export interface SectorMap {
  [row: number]: {
    [col: number]: SectorMapEntry;
  };
}

export interface Sector {
  name: string;
  sharedWithPlayers: boolean;
  region?: string;
  trouble?: string;
  map: SectorMap;
  createdDate: Date;
}
