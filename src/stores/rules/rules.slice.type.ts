import { Datasworn } from "@datasworn/core";
import { HomebrewNonLinearMeterDocument } from "api-calls/homebrew/rules/nonLinearMeters/_homebrewNonLinearMeter.type";

export interface RulesSliceData {
  expansionIds: string[];
  ruleset: Datasworn.Ruleset;

  baseRuleset?: Datasworn.Ruleset;
  progressTracks: string[];
  rootOracleCollectionIds: string[];
  stats: Datasworn.Rules["stats"];
  conditionMeters: Datasworn.Rules["condition_meters"];
  nonLinearMeters: Record<string, HomebrewNonLinearMeterDocument>;
  specialTracks: Datasworn.Rules["special_tracks"];
  impacts: Datasworn.Rules["impacts"];
  assetMaps: {
    assetCollectionMap: Record<string, Datasworn.AssetCollection>;
    nonReplacedAssetCollectionMap: Record<string, Datasworn.AssetCollection>;
    assetMap: Record<string, Datasworn.Asset>;
  };
  oracleMaps: {
    allOraclesMap: Record<
      string,
      Datasworn.OracleRollable | Datasworn.OracleCollection
    >;
    oracleCollectionMap: Record<string, Datasworn.OracleCollection>;
    nonReplacedOracleCollectionMap: Record<string, Datasworn.OracleCollection>;
    oracleRollableMap: Record<string, Datasworn.OracleRollable>;
    nonReplacedOracleRollableMap: Record<string, Datasworn.OracleRollable>;
  };
  rootMoveCollectionIds: string[];
  moveMaps: {
    moveCategoryMap: Record<string, Datasworn.MoveCategory>;
    nonReplacedMoveCategoryMap: Record<string, Datasworn.MoveCategory>;
    moveMap: Record<string, Datasworn.Move>;
    nonReplacedMoveMap: Record<string, Datasworn.Move>;
  };
  worldTruths: Record<string, Datasworn.Truth>;
}

export interface RulesSliceActions {
  setBaseRuleset: (ruleset: Datasworn.Ruleset) => void;
  setExpansionIds: (expansionIds: string[]) => void;
  rebuildOracles: () => void;
  rebuildMoves: () => void;
  rebuildStats: () => void;
  rebuildConditionMeters: () => void;
  rebuildNonLinearMeters: () => void;
  rebuildSpecialTracks: () => void;
  rebuildImpacts: () => void;
  rebuildAssets: () => void;
  rebuildWorldTruths: () => void;

  setFromRuleset: (ruleset: Datasworn.Ruleset) => void;
}

export type RulesSlice = RulesSliceData & RulesSliceActions;
