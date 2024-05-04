import { SectorHexTypes } from "types/Sector.type";

export interface BaseStarforgedLocation {
  name: string;
  type: SectorHexTypes;
  imageFilenames?: string[];
}

export interface StarforgedLocationStar extends BaseStarforgedLocation {
  type: SectorHexTypes.Star;
  description?: string;
}

export interface StarforgedLocationPlanet extends BaseStarforgedLocation {
  type: SectorHexTypes.Planet;
  planetClassName?: string;
  subType: string;
  description?: string;
  feature?: string;
  atmosphere?: string;
  settlements?: string;
  life?: string;
  observedFromSpace?: string;
}

export interface StarforgedLocationSettlement extends BaseStarforgedLocation {
  type: SectorHexTypes.Settlement;
  location?: string;
  firstLook?: string;
  initialContact?: string;
  authority?: string;
  projects?: string;
  trouble?: string;
  population?: string;
}

export interface StarforgedLocationDerelict extends BaseStarforgedLocation {
  type: SectorHexTypes.Derelict;
  location?: string;
  subType?: string;
  condition?: string;
  outerFirstLook?: string;
  innerFirstLook?: string;
}

export interface StarforgedLocationVault extends BaseStarforgedLocation {
  type: SectorHexTypes.Vault;
  location?: string;
  scale?: string;
  form?: string;
  shape?: string;
  material?: string;
  outerFirstLook?: string;
  innerFirstLook?: string;
  interiorFeature?: string;
  interiorPeril?: string;
  interiorOpportunity?: string;
  sanctumFeature?: string;
  sanctumPeril?: string;
  sanctumOpportunity?: string;
  sanctumPurpose?: string;
}

export interface StarforgedLocationOther extends BaseStarforgedLocation {
  type: SectorHexTypes.Other;
}

export type SectorLocationDocument =
  | StarforgedLocationStar
  | StarforgedLocationPlanet
  | StarforgedLocationDerelict
  | StarforgedLocationSettlement
  | StarforgedLocationOther
  | StarforgedLocationVault;
