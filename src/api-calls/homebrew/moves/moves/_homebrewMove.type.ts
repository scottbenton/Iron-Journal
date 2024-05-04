import { Nullable } from "api-calls/helpers.type";

export enum MoveType {
  ActionRoll = "actionRoll",
  NoRoll = "noRoll",
  ProgressRoll = "progressRoll",
  SpecialTrack = "specialTrack",
}

export interface GenericHomebrewMove {
  collectionId: string;
  categoryId: string;
  label: string;
  text: string;
  oracles?: string[];
  replacesId?: Nullable<string>;
  type: MoveType;
}

export interface HomebrewMoveNoRoll extends GenericHomebrewMove {
  type: MoveType.NoRoll;
}
export interface HomebrewMoveActionRoll extends GenericHomebrewMove {
  type: MoveType.ActionRoll;
  stats?: string[];
  conditionMeters?: string[];
  assetControls?: string[];
}
export interface HomebrewMoveProgressRoll extends GenericHomebrewMove {
  type: MoveType.ProgressRoll;
  category: string;
}
export interface HomebrewMoveSpecialTrackRoll extends GenericHomebrewMove {
  type: MoveType.SpecialTrack;
  specialTracks: string[];
}

export type HomebrewMoveDocument =
  | HomebrewMoveNoRoll
  | HomebrewMoveActionRoll
  | HomebrewMoveProgressRoll
  | HomebrewMoveSpecialTrackRoll;
