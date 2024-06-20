import { Grid } from "@mui/material";
import { useStore } from "stores/store";
import { LocationCard } from "./LocationCard";

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

  const filteredLocationIds = Object.keys(locations)
    .filter((id) => locations[id].parentLocationId === locationId)
    .sort((a, b) => locations[a].name.localeCompare(locations[b].name));
  return (
    <>
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
