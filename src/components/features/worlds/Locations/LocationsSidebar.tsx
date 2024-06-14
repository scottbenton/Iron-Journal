import {
  Box,
  Hidden,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";

export interface LocationsSidebarProps {
  locationIds: string[];
  locations: Record<string, LocationWithGMProperties>;
  openLocationId: string;
  setOpenLocationId: (locationId: string) => void;
  showHiddenText: boolean;
}

export function LocationsSidebar(props: LocationsSidebarProps) {
  const {
    locationIds,
    locations,
    openLocationId,
    setOpenLocationId,
    showHiddenText,
  } = props;

  return (
    <Hidden smDown>
      <Box overflow={"auto"} flexGrow={1} minWidth={200} maxWidth={400}>
        <List>
          {locationIds.map((locationId) => (
            <ListItem key={locationId} disablePadding>
              <ListItemButton
                onClick={() => setOpenLocationId(locationId)}
                selected={locationId === openLocationId}
              >
                <ListItemText
                  primary={locations[locationId].name}
                  secondary={
                    showHiddenText &&
                    (!locations[locationId].sharedWithPlayers
                      ? "Hidden"
                      : "Shared")
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Hidden>
  );
}
