import { Datasworn } from "@datasworn/core";

type WithRulesetLabel<T> = {
  rulesetLabel: string;
  data: T;
};

export interface RulesSliceData {
  rulesets: Record<string, Datasworn.Ruleset>;
  assetCollections: Record<
    string,
    WithRulesetLabel<Record<string, Datasworn.AssetCollection>>
  >;
  moveCategories: Record<
    string,
    WithRulesetLabel<Record<string, Datasworn.MoveCategory>>
  >;
  oracleCollections: Record<
    string,
    WithRulesetLabel<Record<string, Datasworn.OracleCollection>>
  >;
  stats: Record<string, Datasworn.StatRule>;
  conditionMeters: Record<string, Datasworn.ConditionMeterRule>;
  specialTracks: Record<string, Datasworn.SpecialTrackRule>;
  impacts: Record<string, Datasworn.ImpactCategory>;
}

export interface RulesSliceActions {
  setRulesets: (rulesets: Record<string, Datasworn.Ruleset>) => void;
}

export type RulesSlice = RulesSliceData & RulesSliceActions;
