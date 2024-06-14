import { useStore } from "stores/store";
import { FilterBar } from "../FilterBar";
import { Box, Button, Grid } from "@mui/material";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import { useState } from "react";
import { useFilterLocations } from "./useFilterLocations";
import { WorldEmptyState } from "../WorldEmptyState";
import { LocationCard } from "./LocationCard";
import { LocationsSidebar } from "./LocationsSidebar";
import { useWorldPermissions } from "../useWorldPermissions";
import { OpenLocation } from "./OpenLocation";

export interface LocationsSectionProps {
  showHiddenTag?: boolean;
  openNPCTab: () => void;
}

export function LocationsSection(props: LocationsSectionProps) {
  const { openNPCTab, showHiddenTag } = props;

  const { showGMTips } = useWorldPermissions();

  const shouldShowHiddenTag = showGMTips && showHiddenTag;

  const worldId = useStore((store) => store.worlds.currentWorld.currentWorldId);
  const locations = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.locationMap
  );

  const search = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.locationSearch
  );
  const setSearch = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.setLocationSearch
  );

  const openLocationId = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.openLocationId
  );
  const setOpenLocationId = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.setOpenLocationId
  );

  const [createLocationLoading, setCreateLocationLoading] = useState(false);
  const createLocation = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.createLocation
  );

  const handleCreateLocation = () => {
    setCreateLocationLoading(true);
    createLocation()
      .then((locationId) => {
        setOpenLocationId(locationId);
      })
      .catch(() => {})
      .finally(() => setCreateLocationLoading(false));
  };
  const { filteredLocationIds, sortedLocationIds } = useFilterLocations(
    locations,
    search
  );

  if (!worldId) {
    return <WorldEmptyState />;
  }

  const openLocation = openLocationId && locations[openLocationId];

  if (openLocationId && openLocation) {
    return (
      <Box
        display={"flex"}
        alignItems={"stretch"}
        maxHeight={"100%"}
        height={"100%"}
      >
        <LocationsSidebar
          locationIds={sortedLocationIds}
          locations={locations}
          openLocationId={openLocationId}
          setOpenLocationId={setOpenLocationId}
          showHiddenText={shouldShowHiddenTag ?? false}
        />
        <OpenLocation
          worldId={worldId}
          locationId={openLocationId}
          location={openLocation}
          closeLocation={() => setOpenLocationId(undefined)}
          showHiddenTag={shouldShowHiddenTag}
          openNPCTab={openNPCTab}
        />
      </Box>
    );
  }

  return (
    <>
      <FilterBar
        search={search}
        setSearch={setSearch}
        action={
          <Button
            variant={"contained"}
            endIcon={<AddLocationIcon />}
            onClick={handleCreateLocation}
            disabled={createLocationLoading}
            sx={{ flexShrink: 0 }}
          >
            Add Location
          </Button>
        }
        searchPlaceholder={"Search by name or type"}
      />

      <Grid
        container
        spacing={2}
        sx={{
          p: 2,
        }}
      >
        {filteredLocationIds.map((locationId) =>
          locations[locationId] ? (
            <Grid item xs={12} md={6} lg={4} key={locationId}>
              <LocationCard
                key={locationId}
                location={locations[locationId]}
                openLocation={() => setOpenLocationId(locationId)}
                showHiddenTag={shouldShowHiddenTag}
              />
            </Grid>
          ) : null
        )}
      </Grid>
    </>
  );
}
