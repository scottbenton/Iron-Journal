import { mergeIcons } from "components/shared/GameIcons/mergeIcons";
import { locationConfigs } from "config/locations.config";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { IconColors } from "types/Icon.type";

export function useLocationImage(location?: LocationWithGMProperties) {
  const settingId = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: "ironlands",
    [GAME_SYSTEMS.STARFORGED]: "forge",
  });
  let settingConfig = { ...locationConfigs[settingId] };
  if (location?.type && settingConfig.locationTypeOverrides?.[location.type]) {
    settingConfig = {
      ...settingConfig,
      ...settingConfig.locationTypeOverrides[location.type]?.config,
    };
  }

  const icon = mergeIcons(
    { key: "GiCompass", color: IconColors.White },
    settingConfig.defaultIcon,
    location?.icon
  );

  return {
    imageUrl: location?.imageUrl,
    icon,
  };
}
