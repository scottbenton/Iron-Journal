import sunderedIsles from "@datasworn/sundered-isles/json/sundered_isles.json";
import starforged from "@datasworn/starforged/json/starforged.json";
import { AssetCollection } from "@datasworn/core/dist/Datasworn";
import { Datasworn } from "@datasworn/core";

const incompatibleAssetIdsMap: Record<string, Record<string, string[]>> = {
  [sunderedIsles._id]: {
    [starforged.assets.command_vehicle._id] : [
      starforged.assets.command_vehicle.contents.starship._id,
    ],
    [starforged.assets.support_vehicle._id] : [
      starforged.assets.support_vehicle.contents.exosuit._id,
      starforged.assets.support_vehicle.contents.hoverbike._id,
      starforged.assets.support_vehicle.contents.rover._id,
      starforged.assets.support_vehicle.contents.service_pod._id,
      starforged.assets.support_vehicle.contents.shuttle._id,
      starforged.assets.support_vehicle.contents.skiff._id,
      starforged.assets.support_vehicle.contents.snub_fighter._id,
    ],
    [starforged.assets.module._id] : [
      starforged.assets.module.contents.engine_upgrade._id,
      starforged.assets.module.contents.expanded_hold._id,
      starforged.assets.module.contents.grappler._id,
      starforged.assets.module.contents.heavy_cannons._id,
      starforged.assets.module.contents.internal_refit._id,
      starforged.assets.module.contents.medbay._id,
      starforged.assets.module.contents.missile_array._id,
      starforged.assets.module.contents.overseer._id,
      starforged.assets.module.contents.reinforced_hull._id,
      starforged.assets.module.contents.research_lab._id,
      starforged.assets.module.contents.sensor_array._id,
      starforged.assets.module.contents.shields._id,
      starforged.assets.module.contents.stealth_tech._id,
      starforged.assets.module.contents.vehicle_bay._id,
      starforged.assets.module.contents.workshop._id,
    ],
    [starforged.assets.path._id]: [
      starforged.assets.path.contents.ace._id,
      starforged.assets.path.contents.tech._id,
      starforged.assets.path.contents.trader._id,
      starforged.assets.path.contents.voidborn._id,
      starforged.assets.path.contents.looper._id,

      // not recommended by rules but still thematically compatible
      // starforged.assets.path.contents.archer._id,
      // starforged.assets.path.contents.artist._id,
      // starforged.assets.path.contents.explorer._id,
      // starforged.assets.path.contents.gunner._id,
      // starforged.assets.path.contents.gunslinger._id,
      // starforged.assets.path.contents.infiltrator._id,
      // starforged.assets.path.contents.lore_hunter._id,
      // starforged.assets.path.contents.naturalist._id,
      // starforged.assets.path.contents.sniper._id,
      // starforged.assets.path.contents.weapon_master._id,
    ],
    [starforged.assets.companion._id]: [
      starforged.assets.companion.contents.banshee._id,
      starforged.assets.companion.contents.combat_bot._id,
      starforged.assets.companion.contents.protocol_bot._id,
      starforged.assets.companion.contents.survey_bot._id,
      starforged.assets.companion.contents.utility_bot._id,
      starforged.assets.companion.contents.voidglider._id,

      // not recommended by rules but still thematically compatible
      // starforged.assets.companion.contents.glowcat._id,
      // starforged.assets.companion.contents.symbiote._id,
      // starforged.assets.companion.contents.rockhorn._id,
      // starforged.assets.companion.contents.sidekick._id,
      // starforged.assets.companion.contents.sprite._id,
    ],
    [starforged.assets.deed._id]: [
      starforged.assets.deed.contents.marked._id,
    ]
  }
}

export const getCompatibleAssetContents = (
  compatibilityExpansionIds: string[],
  assetCollection: AssetCollection
): Record<string, Datasworn.Asset> => {
  let contents = assetCollection.contents;

  if (!contents) {
    return {};
  }

  compatibilityExpansionIds.forEach((expansionId) => {
    if (
      Object.keys(incompatibleAssetIdsMap).includes(expansionId) &&
      Object.keys(incompatibleAssetIdsMap[expansionId]).includes(assetCollection._id)
    ) {
      contents = Object.fromEntries(
        Object.entries(contents!).filter(([, asset]) =>
          !incompatibleAssetIdsMap[expansionId][assetCollection._id].includes(asset._id)
        )
      );
    }
  });

  return contents;
}