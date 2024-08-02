import {
  Button,
  Dialog,
  DialogContent,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { useStore } from "stores/store";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";
import { LocationItemAvatar } from "./LocationMap/LocationItemAvatar";
import { useState } from "react";

export interface MoveLocationDialogProps {
  open: boolean;
  onClose: () => void;
  locationId: string;
  location: LocationWithGMProperties;
}

export function MoveLocationDialog(props: MoveLocationDialogProps) {
  const { open, onClose, locationId, location } = props;

  const locationMap = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.locationMap
  );

  const sortedLocations = Object.keys(locationMap)
    .sort((a, b) => {
      // Sort by parent location first. If no parent location exists, sort it to the top.
      // If the parent locations are the same, sort by name.
      const aParent = locationMap[a]?.parentLocationId;
      const bParent = locationMap[b]?.parentLocationId;
      if (aParent && bParent) {
        if (aParent < bParent) {
          return -1;
        } else if (aParent > bParent) {
          return 1;
        } else {
          return locationMap[a].name.localeCompare(locationMap[b].name);
        }
      } else if (aParent) {
        return 1;
      } else if (bParent) {
        return -1;
      } else {
        return locationMap[a].name.localeCompare(locationMap[b].name);
      }
    })
    .filter(
      (lid) =>
        lid !== locationId &&
        !isLocationADescendantOf(lid, locationId, locationMap)
    );

  const moveLocation = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.moveLocation
  );

  const [moveLoading, setMoveLoading] = useState(false);
  const handleMove = (newParentId?: string) => {
    setMoveLoading(true);
    moveLocation(locationId, location, newParentId, undefined, undefined)
      .then(() => {
        onClose();
      })
      .catch(() => {})
      .finally(() => {
        setMoveLoading(false);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        Move Location
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Grid container spacing={2}>
          {location.parentLocationId && (
            <>
              <Grid item xs={12}>
                <Button
                  variant={"outlined"}
                  color={"inherit"}
                  onClick={() => handleMove()}
                  disabled={moveLoading}
                >
                  Remove from Parent Location
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider>Or</Divider>
              </Grid>
            </>
          )}
          <Grid item xs={12}>
            <Typography>Move under an existing location:</Typography>
            <List>
              {sortedLocations.map((lid) => (
                <ListItem key={lid} disablePadding>
                  <ListItemButton
                    onClick={() => handleMove(lid)}
                    disabled={moveLoading}
                  >
                    <ListItemAvatar>
                      <LocationItemAvatar location={locationMap[lid]} />
                    </ListItemAvatar>
                    <ListItemText primary={locationMap[lid].name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

function isLocationADescendantOf(
  locationId: string,
  parentId: string,
  locations: Record<string, LocationWithGMProperties>
) {
  let currentLocation: LocationWithGMProperties | undefined =
    locations[locationId];
  const seenParentIds = new Set<string>([locationId]);

  while (currentLocation) {
    const parentLocationId = currentLocation.parentLocationId;

    if (parentLocationId) {
      if (seenParentIds.has(parentLocationId)) {
        console.error(
          `Found loop in location hierarchy. ${locationId} -> ${parentLocationId}`
        );
        return false;
      }
      seenParentIds.add(parentLocationId);
    }

    if (parentLocationId === parentId) {
      return true;
    }

    currentLocation = currentLocation.parentLocationId
      ? locations[currentLocation.parentLocationId]
      : undefined;
  }
  return false;
}
