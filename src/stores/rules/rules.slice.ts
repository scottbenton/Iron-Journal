import { CreateSliceType } from "stores/store.type";
import { RulesSlice, RulesSliceData } from "./rules.slice.type";
import { defaultRulesSlice } from "./rules.slice.default";
import { Datasworn, IdParser } from "@datasworn/core";
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
    const baseRuleset = state.rules.baseRuleset;

    if (baseRuleset) {
      const tree: Record<string, Datasworn.RulesPackage> = {
        [baseRuleset._id]: baseRuleset,
      };
      IdParser.tree = tree;

      let oracleMaps: RulesSliceData["oracleMaps"] = parseOraclesIntoMaps(
        baseRuleset.oracles
      );
      let rootOracleCollectionIds = Object.values(baseRuleset.oracles).map(
        (oracle) => oracle._id
      );

      let moveMaps: RulesSliceData["moveMaps"] = parseMovesIntoMaps(
        baseRuleset.moves
      );
      let rootMoveCollectionIds = Object.values(baseRuleset.moves).map(
        (move) => move._id
      );

      let assetMaps: RulesSliceData["assetMaps"] = parseAssetsIntoMaps(
        baseRuleset.assets
      );
      let stats = baseRuleset.rules.stats;
      let conditionMeters = baseRuleset.rules.condition_meters;
      let specialTracks = baseRuleset.rules.special_tracks;
      let impacts = baseRuleset.rules.impacts;
      let worldTruths = baseRuleset.truths ?? {};

      expansionIds.forEach((expansionId) => {
        let expansion: Datasworn.Expansion;
        if (defaultExpansions[expansionId]) {
          expansion = defaultExpansions[expansionId];
          // merge expansion with base ruleset
        } else {
          expansion = state.homebrew.expansions[expansionId];
        }
        if (expansion) {
          tree[expansion._id] = expansion;

          const expansionOracleMaps = parseOraclesIntoMaps(expansion.oracles);
          const expansionMoveMaps = parseMovesIntoMaps(expansion.moves);
          const expansionAssetMaps = parseAssetsIntoMaps(expansion.assets);

          oracleMaps = mergeOracleMaps(oracleMaps, expansionOracleMaps);
          rootOracleCollectionIds = rootOracleCollectionIds.concat(
            Object.values(expansion.oracles)
              .filter((oracle) => !oracle.replaces && !oracle.enhances)
              .map((oracle) => oracle._id)
          );

          moveMaps = mergeMoveMaps(moveMaps, expansionMoveMaps);
          rootMoveCollectionIds = rootMoveCollectionIds.concat(
            Object.values(expansion.moves)
              .filter((move) => !move.enhances && !move.replaces)
              .map((move) => move._id)
          );

          assetMaps = mergeAssetMaps(assetMaps, expansionAssetMaps);

          stats = { ...stats, ...expansion.rules?.stats };
          conditionMeters = {
            ...conditionMeters,
            ...expansion.rules?.condition_meters,
          };
          specialTracks = {
            ...specialTracks,
            ...expansion.rules?.special_tracks,
          };
          impacts = { ...impacts, ...expansion.rules?.impacts };
          worldTruths = { ...worldTruths, ...expansion.truths };
        }
      });

      set((store) => {
        store.rules.oracleMaps = oracleMaps;
        store.rules.rootOracleCollectionIds = rootOracleCollectionIds;

        store.rules.moveMaps = moveMaps;
        store.rules.rootMoveCollectionIds = rootMoveCollectionIds;

        store.rules.assetMaps = assetMaps;

        store.rules.stats = stats;
        store.rules.conditionMeters = conditionMeters;
        store.rules.specialTracks = specialTracks;
        store.rules.impacts = impacts;
        store.rules.worldTruths = worldTruths;
      });
    }
  },
});

function mergeOracleMaps(
  base: RulesSliceData["oracleMaps"],
  expansion: RulesSliceData["oracleMaps"]
): RulesSliceData["oracleMaps"] {
  return {
    allOraclesMap: {
      ...base.allOraclesMap,
      ...expansion.allOraclesMap,
    },
    oracleCollectionMap: {
      ...base.oracleCollectionMap,
      ...expansion.oracleCollectionMap,
    },
    nonReplacedOracleCollectionMap: {
      ...base.nonReplacedOracleCollectionMap,
      ...expansion.nonReplacedOracleCollectionMap,
    },
    oracleRollableMap: {
      ...base.oracleRollableMap,
      ...expansion.oracleRollableMap,
    },
    nonReplacedOracleRollableMap: {
      ...base.nonReplacedOracleRollableMap,
      ...expansion.nonReplacedOracleRollableMap,
    },
    oracleTableRollableMap: {
      ...base.oracleTableRollableMap,
      ...expansion.oracleTableRollableMap,
    },
    nonReplacedOracleTableRollableMap: {
      ...base.nonReplacedOracleTableRollableMap,
      ...expansion.nonReplacedOracleTableRollableMap,
    },
  };
}

function mergeMoveMaps(
  base: RulesSliceData["moveMaps"],
  expansion: RulesSliceData["moveMaps"]
): RulesSliceData["moveMaps"] {
  return {
    moveCategoryMap: {
      ...base.moveCategoryMap,
      ...expansion.moveCategoryMap,
    },
    nonReplacedMoveCategoryMap: {
      ...base.nonReplacedMoveCategoryMap,
      ...expansion.nonReplacedMoveCategoryMap,
    },
    moveMap: {
      ...base.moveMap,
      ...expansion.moveMap,
    },
    nonReplacedMoveMap: {
      ...base.nonReplacedMoveMap,
      ...expansion.nonReplacedMoveMap,
    },
  };
}

function mergeAssetMaps(
  base: RulesSliceData["assetMaps"],
  expansion: RulesSliceData["assetMaps"]
): RulesSliceData["assetMaps"] {
  return {
    assetCollectionMap: {
      ...base.assetCollectionMap,
      ...expansion.assetCollectionMap,
    },
    nonReplacedAssetCollectionMap: {
      ...base.nonReplacedAssetCollectionMap,
      ...expansion.nonReplacedAssetCollectionMap,
    },
    assetMap: {
      ...base.assetMap,
      ...expansion.assetMap,
    },
  };
}
