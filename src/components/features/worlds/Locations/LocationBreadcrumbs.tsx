import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useStore } from "stores/store";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";

export interface LocationBreadcrumbsProps {
  locationId: string;
}

export function LocationBreadcrumbs(props: LocationBreadcrumbsProps) {
  const { locationId } = props;

  const locationMap = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.locationMap
  );
  const openLocation = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.setOpenLocationId
  );

  const ancestors: string[] = getAncestors(locationId, locationMap);

  return (
    <Breadcrumbs
      aria-label={"Location breadcrumbs"}
      sx={{ mx: { xs: 2, sm: 3 }, py: 1 }}
    >
      <Link
        underline={"hover"}
        color={"inherit"}
        component={"button"}
        onClick={() => openLocation(undefined)}
      >
        Locations
      </Link>
      {ancestors.map((ancestorId) => (
        <Link
          key={ancestorId}
          underline={"hover"}
          color={"inherit"}
          component={"button"}
          onClick={() => openLocation(ancestorId)}
        >
          {locationMap[ancestorId].name}
        </Link>
      ))}
      <Typography color="text.primary">
        {locationMap[locationId]?.name ?? ""}
      </Typography>
    </Breadcrumbs>
  );
}

function getAncestors(
  locationId: string,
  locationMap: Record<string, LocationWithGMProperties>
): string[] {
  const ancestors: string[] = [];

  let ancestorId = locationMap[locationId]?.parentLocationId;
  while (ancestorId) {
    const ancestor = locationMap[ancestorId];
    if (ancestor) {
      ancestors.push(ancestorId);
    }
    ancestorId = ancestor?.parentLocationId;
  }

  return ancestors;
}
