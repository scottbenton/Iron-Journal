import { Box, Hidden, List } from "@mui/material";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";
import { LocationsSidebarItem } from "./LocationsSidebarItem";

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

  const locationParentMap: Record<string, string[]> = {};

  locationIds.forEach((locationId) => {
    const parentId = locations[locationId].parentLocationId ?? "root";
    if (!locationParentMap[parentId]) {
      locationParentMap[parentId] = [];
    }
    locationParentMap[parentId].push(locationId);
  });

  return (
    <Hidden smDown>
      <Box overflow={"auto"} minWidth={200} maxWidth={400}>
        <List>
          {locationParentMap["root"]?.map((locationId) => (
            <LocationsSidebarItem
              key={locationId}
              locationId={locationId}
              locationParentMap={locationParentMap}
              locations={locations}
              openLocationId={openLocationId}
              setOpenLocationId={setOpenLocationId}
              showHiddenText={showHiddenText}
            />
          ))}
        </List>
      </Box>
    </Hidden>
  );
}
