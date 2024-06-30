import { Datasworn } from "@datasworn/core";
import { RulesSliceData } from "../rules.slice.type";

export function parseOraclesIntoMaps(
  oracles: Record<string, Datasworn.OracleTablesCollection>,
  sort?: boolean
): RulesSliceData["oracleMaps"] {
  const allOraclesMap: Record<
    string,
    Datasworn.OracleRollable | Datasworn.OracleCollection
  > = {};
  const oracleCollectionMap: Record<string, Datasworn.OracleCollection> = {};
  const nonReplacedOracleCollectionMap: Record<
    string,
    Datasworn.OracleCollection
  > = {};
  const oracleRollableMap: Record<string, Datasworn.OracleRollable> = {};
  const nonReplacedOracleRollableMap: Record<string, Datasworn.OracleRollable> =
    {};

  const parseOracleTableCollectionIntoMaps = (
    category: Datasworn.OracleCollection
  ) => {
    allOraclesMap[category._id] = category;
    oracleCollectionMap[category._id] = category;
    nonReplacedOracleCollectionMap[category._id] = category;
    if (category.replaces) {
      // Todo - fix replaces with new replaces logic
      // allOraclesMap[category.replaces] = category;
      // oracleCollectionMap[category.replaces] = category;
    }
    if (category.contents) {
      const sortedContents = sort
        ? Object.values(category.contents).sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        : Object.values(category.contents);
      sortedContents.forEach((oracleContent: Datasworn.OracleRollable) => {
        allOraclesMap[oracleContent._id] = oracleContent;
        oracleRollableMap[oracleContent._id] = oracleContent;
        nonReplacedOracleRollableMap[oracleContent._id] = oracleContent;

        if (oracleContent.replaces) {
          // Todo - fix replaces with new replaces logic
          // allOraclesMap[oracleContent.replaces] = oracleContent;
          // oracleRollableMap[oracleContent.replaces] = oracleContent;
        }
      });
    }

    if (category.oracle_type === "tables") {
      const sortedCollections = sort
        ? Object.values(category.collections ?? {}).sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        : Object.values(category.collections ?? {});
      sortedCollections.forEach((subCollection) => {
        parseOracleTableCollectionIntoMaps(subCollection);
      });
    }
  };

  const sortedOracleCollections = sort
    ? Object.values(oracles).sort((a, b) => a.name.localeCompare(b.name))
    : Object.values(oracles);

  sortedOracleCollections.forEach((oracleTableCollection) => {
    parseOracleTableCollectionIntoMaps(oracleTableCollection);
  });

  return {
    allOraclesMap,
    oracleCollectionMap,
    nonReplacedOracleCollectionMap,
    oracleRollableMap,
    nonReplacedOracleRollableMap,
  };
}
