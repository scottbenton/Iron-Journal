import { Button, Grid } from "@mui/material";
import { useStore } from "stores/store";
import { LocationCard } from "./LocationCard";
import { EmptyState } from "components/shared/EmptyState";
import { SectionHeading } from "components/shared/SectionHeading";

export interface SubLocationsProps {
  locationId: string;
}

export function SubLocations(props: SubLocationsProps) {
  const { locationId } = props;

  const locations = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.locationMap
  );
  const setOpenLocationId = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.setOpenLocationId
  );

  const createLocation = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldLocations.createSpecificLocation
  );

  const filteredLocationIds = Object.keys(locations)
    .filter((id) => locations[id].parentLocationId === locationId)
    .sort((a, b) => locations[a].name.localeCompare(locations[b].name));

  const handleCreateLocation = () => {
    createLocation({
      parentLocationId: locationId,
      name: "New Location",
      sharedWithPlayers: true,
      updatedDate: new Date(),
      createdDate: new Date(),
    })
      .then((id) => setOpenLocationId(id))
      .catch(() => {});
  };

  return (
    <>
      <Grid item xs={12}>
        <SectionHeading
          label="Sub-Locations"
          breakContainer
          action={
            <Button
              variant={"outlined"}
              color={"inherit"}
              onClick={handleCreateLocation}
            >
              Create Sub-Location
            </Button>
          }
        />
      </Grid>

      {filteredLocationIds.length === 0 && (
        <Grid item xs={12}>
          <EmptyState message="No sub-locations added to this location yet." />
        </Grid>
      )}
      {filteredLocationIds.map((locationId) => (
        <Grid key={locationId} item xs={12} sm={12} md={6}>
          <LocationCard
            location={locations[locationId]}
            onClick={() => setOpenLocationId(locationId)}
          />
        </Grid>
      ))}
    </>
  );
}
