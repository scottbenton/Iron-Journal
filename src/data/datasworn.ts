import starforged from '@datasworn/starforged/json/starforged.json' with { type: 'json' }
import classic from '@datasworn/ironsworn-classic/json/classic.json' with { type: 'json' }
import delve from '@datasworn/ironsworn-classic-delve/json/delve.json' with { type: 'json' }
import sunderedIsles from '@datasworn/sundered-isles/json/sundered_isles.json' with { type: 'json' };
import { DataswornTree, Datasworn, IdParser, mergeExpansion } from '@datasworn/core';
import { useStore } from 'stores/store';

const rulesets: Record<string, Datasworn.Ruleset> = {
    [starforged._id]: starforged as unknown as Datasworn.Ruleset,
    [classic._id]: classic as Datasworn.Ruleset,
}
const expansions: Record<string, Record<string, Datasworn.Expansion>> = {
    [starforged._id]: {
        [sunderedIsles._id]: sunderedIsles as Datasworn.Expansion,
    },
    [classic._id]: {
        [delve._id]: delve as unknown as Datasworn.Expansion,
    },
}

export const defaultExpansionIds = [delve._id, sunderedIsles._id];

export function useConfigureDataswornTree(activeRulesetConfig: Record<string, boolean>, activeExpansionConfig: Record<string, Record<string, boolean>>): Record<string, Datasworn.RulesPackage> {

    const homebrewExpansions = useStore((store) => store.homebrew.dataswornExpansions);

    const activeRulesets: Record<string, Datasworn.Ruleset> = {};
    Object.entries(activeRulesetConfig)
        .filter(([, active]) => active)
        .forEach(([id]) => activeRulesets[id] = rulesets[id]);
    
    Object.entries(activeExpansionConfig)
        .filter(([rulesetId]) => activeRulesetConfig[rulesetId])
        .forEach(([rulesetId, activeExpansions]) => {
            return Object.entries(activeExpansions)
                .filter(([, active]) => active)
                .forEach(([expansionId]) => {
                    const expansion = expansions[rulesetId]?.[expansionId] ?? homebrewExpansions[expansionId];
                    if (!expansion) return;
                    activeRulesets[rulesetId] = mergeExpansion(activeRulesets[rulesetId], expansion);
                })
        })
    
    const datasworn = new DataswornTree(...Object.values(activeRulesets));
    IdParser.tree = datasworn;
    // Todo - might remove later if I don't like this
    return Object.fromEntries(datasworn);
}

export function getAsset(assetId: string): Datasworn.Asset | undefined {
    try {
        const unknownNode = IdParser.get(assetId);
        if ((unknownNode as Datasworn.Asset).type === 'asset') return unknownNode as Datasworn.Asset;
        return undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export function getMove(moveId: string): Datasworn.Move | undefined {
    try {
        const unknownNode = IdParser.get(moveId);
        if ((unknownNode as Datasworn.Move).type === 'move') return unknownNode as Datasworn.Move;
        return undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export function getOracle(oracleId: string): Datasworn.OracleCollection | Datasworn.OracleRollable | undefined {
    try {
        const unknownNode = IdParser.get(oracleId);
        if ((unknownNode as Datasworn.OracleCollection).type === 'oracle_collection') return unknownNode as Datasworn.OracleCollection;
        if((unknownNode as Datasworn.OracleRollable).type === 'oracle_rollable') return unknownNode as Datasworn.OracleRollable;
        return undefined;
    } catch (e) {
        console.error(e);
        return undefined;
    }
}

export function getOracleRollables(): Record<string, Datasworn.OracleRollable> {
    const oracleRollables = IdParser.parse("oracle_rollable/**/*");
    const nodes = oracleRollables.getMatches(IdParser.tree ?? {});
    
    return Object.fromEntries(nodes);
}
export function getOracleCollections(): Record<string, Datasworn.OracleCollection> {
    const oracleCollections = IdParser.parse("oracle_collection/**/*");
    const nodes = oracleCollections.getMatches(IdParser.tree ?? {});
    
    return Object.fromEntries(nodes);
}

export function getMoves(): Record<string, Datasworn.Move> {
    const oracleRollables = IdParser.parse("move/**/*");
    const nodes = oracleRollables.getMatches(IdParser.tree ?? {});
    
    return Object.fromEntries(nodes);
}
export function getMoveCategories(): Record<string, Datasworn.MoveCategory> {
    const moveCategories = IdParser.parse("move_category/**/*");
    const nodes = moveCategories.getMatches(IdParser.tree ?? {});
    
    return Object.fromEntries(nodes);
}