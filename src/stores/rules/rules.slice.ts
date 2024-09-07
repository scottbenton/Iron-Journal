import { CreateSliceType } from "stores/store.type";
import { RulesSlice } from "./rules.slice.type";
import { defaultRulesSlice } from "./rules.slice.default";

export const createRulesSlice: CreateSliceType<RulesSlice> = (set) => ({
  ...defaultRulesSlice,
  setRulesets: (rulesets) => {
    set((store) => {
      store.rules.rulesets = rulesets;
      store.rules.assetCollections = {};
      store.rules.moveCategories = {};
      store.rules.oracleCollections = {};
      store.rules.stats = {};
      store.rules.conditionMeters = {};
      store.rules.specialTracks = {};
      store.rules.impacts = {};

      Object.entries(rulesets).forEach(([id, ruleset]) => {
        store.rules.assetCollections[id] = {
          rulesetLabel: ruleset.title,
          data: ruleset.assets,
        };
        store.rules.moveCategories[id] = {
          rulesetLabel: ruleset.title,
          data: ruleset.moves,
        };
        store.rules.oracleCollections[id] = {
          rulesetLabel: ruleset.title,
          data: ruleset.oracles,
        };
        store.rules.stats = { ...store.rules.stats, ...ruleset.rules.stats };
        store.rules.conditionMeters = {
          ...store.rules.conditionMeters,
          ...ruleset.rules.condition_meters,
        };
        store.rules.specialTracks = {
          ...store.rules.specialTracks,
          ...ruleset.rules.special_tracks,
        };
        store.rules.impacts = {
          ...store.rules.impacts,
          ...ruleset.rules.impacts,
        };
      });
    });
  },
});
