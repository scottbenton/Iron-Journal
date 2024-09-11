import { Datasworn, IdParser } from "@datasworn/core";
import { RulesSliceData } from "../rules.slice.type";
import { Primary } from "@datasworn/core/dist/StringId";

export function parseAssetsIntoMaps(
  assetCategories: Record<string, Datasworn.AssetCollection>
): RulesSliceData["assetMaps"] {
  const assetCollectionMap: Record<string, Datasworn.AssetCollection> = {};
  const nonReplacedAssetCollectionMap: Record<
    string,
    Datasworn.AssetCollection
  > = {};
  const assetMap: Record<string, Datasworn.Asset> = {};

  Object.values(assetCategories).forEach((category) => {
    if (category.contents) {
      if (category.replaces) {
        category.replaces.forEach((replaces) => {
          const replaceMatches = IdParser.getMatches(
            replaces as Primary,
            IdParser.tree
          );
          replaceMatches.forEach((val, key) => {
            if (val.type === "asset_collection") {
              assetCollectionMap[key] = category;
            }
          });
        });
      }
      assetCollectionMap[category._id] = category;
      nonReplacedAssetCollectionMap[category._id] = category;

      Object.values(category.contents ?? {}).forEach((asset) => {
        assetMap[asset._id] = asset;
      });
    }
  });

  return {
    assetCollectionMap,
    assetMap,
    nonReplacedAssetCollectionMap,
  };
}
