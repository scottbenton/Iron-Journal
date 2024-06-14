import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";
import { locationConfigs } from "config/locations.config";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { IconColors } from "types/Icon.type";
import { CardWithImage } from "../common/CardWithImage";

export interface LocationCardProps {
  location: LocationWithGMProperties;
  openLocation: () => void;
  showHiddenTag?: boolean;
}

export function LocationCard(props: LocationCardProps) {
  const { location, openLocation, showHiddenTag } = props;

  // Todo - replace with world type from datasworn once released
  const settingId = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: "ironlands",
    [GAME_SYSTEMS.STARFORGED]: "forge",
  });
  let settingConfig = { ...locationConfigs[settingId] };
  if (location.type && settingConfig.locationTypeOverrides?.[location.type]) {
    settingConfig = {
      ...settingConfig,
      ...settingConfig.locationTypeOverrides[location.type],
    };
  }

  const defaultIcon = settingConfig.defaultIcon;
  let icon = {
    key: "GiCompass",
    color: IconColors.White,
  };
  if (defaultIcon) {
    icon = defaultIcon;
  }
  if (location.icon) {
    if (location.icon.color) {
      icon.color = location.icon.color;
    }
    if (location.icon.key) {
      icon.key = location.icon.key;
    }
  }

  return (
    <CardWithImage
      name={location.name}
      type={location.type}
      imageUrl={location.imageUrl}
      icon={icon}
      showHiddenTag={showHiddenTag && !location.sharedWithPlayers}
      handleClick={openLocation}
    />
  );
}
