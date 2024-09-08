import { CreateSliceType } from "stores/store.type";
import { RulesSlice } from "./rules.slice.type";
import { defaultRulesSlice } from "./rules.slice.default";
import { Datasworn, mergeExpansion } from "@datasworn/core";
import { parseOraclesIntoMaps } from "./helpers/parseOraclesIntoMaps";
import { parseMovesIntoMaps } from "./helpers/parseMovesIntoMaps";
import { parseAssetsIntoMaps } from "./helpers/parseAssetsIntoMaps";
import { HomebrewNonLinearMeterDocument } from "api-calls/homebrew/rules/nonLinearMeters/_homebrewNonLinearMeter.type";
import { defaultExpansions } from "data/rulesets";

export const createRulesSlice: CreateSliceType<RulesSlice> = (
  set,
  getState
) => ({
  ...defaultRulesSlice,

  setBaseRuleset: (ruleset) => {
    set((store) => {
      store.rules.baseRuleset = ruleset;
    });

    const state = getState();
    state.rules.rebuildRules();
  },

  setExpansionIds: (expansionIds) => {
    set((store) => {
      store.rules.expansionIds = expansionIds;
    });
  },

  rebuildNonLinearMeters: () => {
    set((store) => {
      let nonLinearMeters: Record<string, HomebrewNonLinearMeterDocument> = {};

      store.rules.expansionIds.forEach((expansionId) => {
        if (!defaultExpansions[expansionId]) {
          const expansionNonLinearMeters =
            store.homebrew.collections[expansionId]?.nonLinearMeters?.data ??
            {};
          nonLinearMeters = { ...nonLinearMeters };
          Object.keys(expansionNonLinearMeters)
            .sort((m1, m2) =>
              expansionNonLinearMeters[m1].label.localeCompare(
                expansionNonLinearMeters[m2].label
              )
            )
            .forEach((meterKey) => {
              nonLinearMeters[meterKey] = expansionNonLinearMeters[meterKey];
            });
        }
      });
      store.rules.nonLinearMeters = nonLinearMeters;
    });
  },

  rebuildWorldTruths: () => {
    set((store) => {
      const baseRulesetTruths = store.rules.baseRuleset?.truths;
      if (baseRulesetTruths) {
        store.rules.worldTruths = baseRulesetTruths;
      }
    });
  },
  rebuildRules: () => {
    const state = getState();
    const expansionIds = state.rules.expansionIds;
    let mergedRuleset = JSON.parse(
      JSON.stringify(state.rules.baseRuleset)
    ) as Datasworn.Ruleset;
    expansionIds.forEach((expansionId) => {
      let expansion: Datasworn.Expansion;
      if (defaultExpansions[expansionId]) {
        expansion = defaultExpansions[expansionId];
        // merge expansion with base ruleset
      } else {
        expansion = state.homebrew.expansions[expansionId];
      }
      if (mergedRuleset && expansion) {
        mergedRuleset = mergeExpansion(mergedRuleset, expansion);
      }
    });

    // Update each subkey
    set((store) => {
      if (mergedRuleset) {
        store.rules.oracleMaps = parseOraclesIntoMaps(mergedRuleset.oracles);
        store.rules.rootOracleCollectionIds = Object.values(
          mergedRuleset.oracles
        ).map((oracle) => oracle._id);

        store.rules.moveMaps = parseMovesIntoMaps(mergedRuleset.moves);
        store.rules.rootMoveCollectionIds = Object.values(
          mergedRuleset.moves
        ).map((move) => move._id);

        store.rules.assetMaps = parseAssetsIntoMaps(mergedRuleset.assets);

        store.rules.stats = mergedRuleset.rules.stats;
        store.rules.conditionMeters = mergedRuleset.rules.condition_meters;
        store.rules.specialTracks = mergedRuleset.rules.special_tracks;
        store.rules.impacts = mergedRuleset.rules.impacts;
        store.rules.worldTruths = mergedRuleset.truths ?? {};
      }
    });
  },
});
