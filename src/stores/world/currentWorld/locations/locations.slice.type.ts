import { Unsubscribe, UpdateData } from "firebase/firestore";
import { GMLocation, Location } from "types/Locations.type";

export enum LocationTab {
  Notes = "notes",
  NPCs = "npcs",
  SubLocations = "sub-locations",
}

export type LocationWithGMProperties = Location & {
  gmProperties?: GMLocation | null;
  notes?: Uint8Array | null;
  imageUrl?: string;
};

export interface LocationsSliceData {
  locationMap: { [key: string]: LocationWithGMProperties };
  loading: boolean;
  error?: string;
  openLocationId?: string;
  openTab: LocationTab;
  locationSearch: string;
}

export interface LocationsSliceActions {
  subscribe: (worldId: string, worldOwnerIds: string[]) => Unsubscribe;
  setOpenLocationId: (locationId?: string) => void;
  setLocationTab: (tab: LocationTab) => void;
  setLocationSearch: (search: string) => void;

  createLocation: () => Promise<string>;
  createSpecificLocation: (location: Location) => Promise<string>;
  deleteLocation: (locationId: string) => Promise<void>;
  updateLocation: (
    locationId: string,
    location: UpdateData<Location>
  ) => Promise<void>;
  moveLocation: (
    locationId: string,
    location: LocationWithGMProperties,
    parentId: string | undefined,
    row: number | undefined,
    col: number | undefined
  ) => Promise<void>;
  updateLocationGMNotes: (
    locationId: string,
    notes: Uint8Array,
    isBeaconRequest?: boolean
  ) => Promise<void>;
  updateLocationGMProperties: (
    locationId: string,
    gmProperties: Partial<GMLocation>
  ) => Promise<void>;
  updateLocationNotes: (
    locationId: string,
    notes: Uint8Array,
    isBeaconRequest?: boolean
  ) => Promise<void>;
  updateLocationCharacterBond: (
    locationId: string,
    characterId: string,
    bonded: boolean
  ) => Promise<void>;
  uploadLocationImage: (locationId: string, image: File) => Promise<void>;
  removeLocationImage: (locationId: string) => Promise<void>;
  subscribeToOpenLocation: (locationId: string) => Unsubscribe;
  resetStore: () => void;
}

export type LocationsSlice = LocationsSliceData & LocationsSliceActions;
