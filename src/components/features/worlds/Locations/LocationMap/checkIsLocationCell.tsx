import { MapEntry, MapEntryType } from "types/Locations.type";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";

export function checkIsLocationCell(
  cell: MapEntry | undefined,
  parentLocationId: string,
  locations: Record<string, LocationWithGMProperties>
) {
  if (cell?.type === MapEntryType.Location) {
    return (
      getValidLocations(parentLocationId, locations, cell.locationIds).length >
      0
    );
  }
  return false;
}

export function getValidLocations(
  parentLocationId: string,
  locations: Record<string, LocationWithGMProperties>,
  locationIds: string[]
): string[] {
  return locationIds.filter((locationId) => {
    const location = locations[locationId];
    if (location) {
      return location.parentLocationId === parentLocationId;
    }
    return false;
  });
}
