import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";
import { useLocationImage } from "../hooks/useLocationImage";
import { Avatar } from "@mui/material";
import { GameIcon } from "components/shared/GameIcons/GameIcon";

export interface LocationItemAvatarProps {
  location: LocationWithGMProperties;
}

export function LocationItemAvatar(props: LocationItemAvatarProps) {
  const { location } = props;

  const { icon, imageUrl } = useLocationImage(location);

  return (
    <Avatar
      alt={location.name}
      src={imageUrl}
      sx={{ bgcolor: "background.mapBackground" }}
    >
      {!imageUrl && <GameIcon iconName={icon.key} iconColor={icon.color} />}
    </Avatar>
  );
}
