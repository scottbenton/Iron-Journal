import { firestore } from "config/firebase.config";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Timestamp,
  UpdateData,
} from "firebase/firestore";
import { Location } from "types/Locations.type";
import {
  LocationNotesDocument,
  GMLocationDocument,
  LocationDocument,
} from "./_locations.type";

export function constructLocationsPath(worldId: string) {
  return `/worlds/${worldId}/locations`;
}

export function constructLocationDocPath(worldId: string, locationId: string) {
  return `/worlds/${worldId}/locations/${locationId}`;
}

export function constructPrivateDetailsLocationDocPath(
  worldId: string,
  locationId: string
) {
  return constructLocationDocPath(worldId, locationId) + `/private/details`;
}

export function constructPublicNotesLocationDocPath(
  worldId: string,
  locationId: string
) {
  return constructLocationDocPath(worldId, locationId) + `/public/notes`;
}

export function constructLocationImagesPath(
  worldId: string,
  locationId: string
) {
  return `/worlds/${worldId}/locations/${locationId}`;
}

export function constructLocationImagePath(
  worldId: string,
  locationId: string,
  filename: string
) {
  return `/worlds/${worldId}/locations/${locationId}/${filename}`;
}

export function getLocationCollection(worldId: string) {
  return collection(
    firestore,
    constructLocationsPath(worldId)
  ) as CollectionReference<LocationDocument>;
}

export function getLocationDoc(worldId: string, locationId: string) {
  return doc(
    firestore,
    constructLocationDocPath(worldId, locationId)
  ) as DocumentReference<LocationDocument>;
}

export function getPrivateDetailsLocationDoc(
  worldId: string,
  locationId: string
) {
  return doc(
    firestore,
    constructPrivateDetailsLocationDocPath(worldId, locationId)
  ) as DocumentReference<GMLocationDocument>;
}

export function getPublicNotesLocationDoc(worldId: string, locationId: string) {
  return doc(
    firestore,
    constructPublicNotesLocationDocPath(worldId, locationId)
  ) as DocumentReference<LocationNotesDocument>;
}

export function convertUpdateDataToDatabase(
  location: UpdateData<Location>
): UpdateData<LocationDocument> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updatedDate, createdDate, ...restLocation } = location;
  const newLocation: UpdateData<LocationDocument> = {
    updatedTimestamp: Timestamp.now(),
    ...restLocation,
  };

  if (createdDate && createdDate instanceof Date) {
    newLocation.createdTimestamp = Timestamp.fromDate(createdDate);
  }

  return newLocation;
}

export function convertToDatabase(location: Location): LocationDocument {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { updatedDate, createdDate, ...restLocation } = location;
  const newLocation: LocationDocument = {
    updatedTimestamp: Timestamp.now(),
    createdTimestamp: Timestamp.fromDate(createdDate),
    ...restLocation,
  };

  return newLocation;
}

export function convertFromDatabase(location: LocationDocument): Location {
  const { updatedTimestamp, createdTimestamp, ...restLocation } = location;
  return {
    updatedDate: updatedTimestamp.toDate(),
    createdDate: createdTimestamp.toDate(),
    ...restLocation,
  };
}
