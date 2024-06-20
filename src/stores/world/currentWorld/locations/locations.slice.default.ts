import { LocationTab, LocationsSliceData } from "./locations.slice.type";

export const defaultLocationsSlice: LocationsSliceData = {
  locationMap: {},
  loading: false,
  locationSearch: "",
  openTab: LocationTab.Notes,
  error: undefined,
  openLocationId: undefined,
};
