import { Datasworn } from "@datasworn/core";
import { RulesSliceData } from "../rules.slice.type";

export function parseOraclesIntoMaps(
  oracles: Record<string, Datasworn.OracleTablesCollection>
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
  const oracleTableRollableMap: Record<string, Datasworn.OracleTableRollable> =
    {};
  const nonReplacedOracleTableRollableMap: Record<
    string,
    Datasworn.OracleTableRollable
  > = {};

  const parseOracleTableCollectionIntoMaps = (
    category: Datasworn.OracleCollection
  ) => {
    allOraclesMap[category._id] = category;
    oracleCollectionMap[category._id] = category;
    nonReplacedOracleCollectionMap[category._id] = category;
    if (category.replaces) {
      allOraclesMap[category.replaces] = category;
      oracleCollectionMap[category.replaces] = category;
    }
    if (category.contents) {
      Object.values(category.contents).forEach(
        (
          oracleContent:
            | Datasworn.OracleTableRollable
            | Datasworn.OracleColumnSimple
            | Datasworn.OracleColumnDetails
        ) => {
          allOraclesMap[oracleContent._id] = oracleContent;
          oracleRollableMap[oracleContent._id] = oracleContent;
          nonReplacedOracleRollableMap[oracleContent._id] = oracleContent;
          if (
            oracleContent.oracle_type === "table_details" ||
            oracleContent.oracle_type === "table_simple"
          ) {
            oracleTableRollableMap[oracleContent._id] = oracleContent;
            nonReplacedOracleTableRollableMap[oracleContent._id] =
              oracleContent;
          }
          if (oracleContent.replaces) {
            allOraclesMap[oracleContent.replaces] = oracleContent;
            oracleRollableMap[oracleContent.replaces] = oracleContent;
            if (
              oracleContent.oracle_type === "table_details" ||
              oracleContent.oracle_type === "table_simple"
            ) {
              oracleTableRollableMap[oracleContent.replaces] = oracleContent;
            }
          }
        }
      );
    }

    if (category.oracle_type === "tables") {
      Object.values(category.collections ?? {}).forEach((subCollection) => {
        parseOracleTableCollectionIntoMaps(subCollection);
      });
    }
  };

  Object.values(oracles).forEach((oracleTableCollection) => {
    parseOracleTableCollectionIntoMaps(oracleTableCollection);
  });

  return {
    allOraclesMap,
    oracleCollectionMap,
    nonReplacedOracleCollectionMap,
    oracleRollableMap,
    nonReplacedOracleRollableMap,
    oracleTableRollableMap,
    nonReplacedOracleTableRollableMap,
  };
}
