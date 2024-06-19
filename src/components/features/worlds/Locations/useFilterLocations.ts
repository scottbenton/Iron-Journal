import { useSearchNoState } from "hooks/useSearch";
import { useMemo } from "react";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";

export function useFilterLocations(
  locations: {
    [key: string]: LocationWithGMProperties;
  },
  search: string
) {
  const { debouncedSearch } = useSearchNoState(search);

  const sortedLocationIds = useMemo(
    () =>
      Object.keys(locations).sort(
        (l1, l2) =>
          locations[l2].createdDate.getTime() -
          locations[l1].createdDate.getTime()
      ),
    [locations]
  );

  const filteredLocationIds = useMemo(
    () =>
      sortedLocationIds.filter(
        (locationId) =>
          !locations[locationId].parentLocationId &&
          (locations[locationId].name
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase()) ||
            locations[locationId].type
              ?.toLocaleLowerCase()
              ?.includes(debouncedSearch.toLocaleLowerCase()))
      ),
    [sortedLocationIds, locations, debouncedSearch]
  );

  return { filteredLocationIds, sortedLocationIds };
}
