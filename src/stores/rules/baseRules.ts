import { getSystem } from "hooks/useGameSystem";
import { GAME_SYSTEMS, GameSystemChooser } from "types/GameSystems.type";
import { Datasworn } from "@datasworn/core";
import ironswornRules from "@datasworn/ironsworn-classic/json/classic.json";
import starforgedRules from "@datasworn/starforged/json/starforged.json";
import { parseOraclesIntoMaps } from "./helpers/parseOraclesIntoMaps";
import { parseMovesIntoMaps } from "./helpers/parseMovesIntoMaps";
import { parseAssetsIntoMaps } from "./helpers/parseAssetsIntoMaps";

const gameSystem = getSystem();

const gameSystemRules: GameSystemChooser<Datasworn.Ruleset> = {
  [GAME_SYSTEMS.IRONSWORN]: ironswornRules as Datasworn.Ruleset,
  [GAME_SYSTEMS.STARFORGED]: starforgedRules as Datasworn.Ruleset,
};
const gameSystemProgressTracks: GameSystemChooser<string[]> = {
  [GAME_SYSTEMS.IRONSWORN]: ["Combat", "Vow", "Journey"],
  [GAME_SYSTEMS.STARFORGED]: [
    "Combat",
    "Vow",
    "Expedition",
    "Connection",
    "Scene Challenge",
  ],
};

export const defaultRuleset = gameSystemRules[gameSystem];
export const defaultProgressTracks = gameSystemProgressTracks[gameSystem];
export const defaultStats = defaultRuleset.rules.stats;
export const defaultConditionMeters = defaultRuleset.rules.condition_meters;
export const defaultSpecialTracks = defaultRuleset.rules.special_tracks;
export const defaultImpacts = defaultRuleset.rules.impacts;
export const defaultRootOracleCollectionIds = Object.values(
  defaultRuleset.oracles
).map((oracle) => oracle._id);
export const defaultOracleMaps = parseOraclesIntoMaps(defaultRuleset.oracles);
export const defaultRootMoveCollectionIds = Object.values(
  defaultRuleset.moves
).map((move) => move._id);
export const defaultMoveMaps = parseMovesIntoMaps(defaultRuleset.moves);
export const defaultAssetMaps = parseAssetsIntoMaps(defaultRuleset.assets);
export const defaultNonLinearMeters = {};
export const defaultWorldTruths = defaultRuleset.truths;
