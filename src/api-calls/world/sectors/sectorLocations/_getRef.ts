import { firestore } from "config/firebase.config";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
} from "firebase/firestore";
import { SectorLocationDocument } from "api-calls/world/sectors/sectorLocations/_sectorLocations.type";
import { NoteContentDocument } from "api-calls/notes/_notes.type";

export function constructSectorLocationsPath(
  worldId: string,
  sectorId: string
) {
  return `/worlds/${worldId}/sectors/${sectorId}/locations`;
}

export function constructSectorLocationDocPath(
  worldId: string,
  sectorId: string,
  locationId: string
) {
  return `/worlds/${worldId}/sectors/${sectorId}/locations/${locationId}`;
}

export function constructPrivateSectorLocationNotesDocPath(
  worldId: string,
  sectorId: string,
  locationId: string
) {
  return (
    constructSectorLocationDocPath(worldId, sectorId, locationId) +
    `/private/notes`
  );
}

export function constructPublicSectorLocationNotesDocPath(
  worldId: string,
  sectorId: string,
  locationId: string
) {
  return (
    constructSectorLocationDocPath(worldId, sectorId, locationId) +
    `/public/notes`
  );
}

export function getSectorLocationsCollection(
  worldId: string,
  sectorId: string
) {
  return collection(
    firestore,
    constructSectorLocationsPath(worldId, sectorId)
  ) as CollectionReference<SectorLocationDocument>;
}

export function getSectorLocationDoc(
  worldId: string,
  sectorId: string,
  locationId: string
) {
  return doc(
    firestore,
    constructSectorLocationDocPath(worldId, sectorId, locationId)
  ) as DocumentReference<SectorLocationDocument>;
}

export function getPrivateSectorLocationNotesDoc(
  worldId: string,
  sectorId: string,
  locationId: string
) {
  return doc(
    firestore,
    constructPrivateSectorLocationNotesDocPath(worldId, sectorId, locationId)
  ) as DocumentReference<NoteContentDocument>;
}

export function getPublicSectorLocationNotesDoc(
  worldId: string,
  sectorId: string,
  locationId: string
) {
  return doc(
    firestore,
    constructPublicSectorLocationNotesDocPath(worldId, sectorId, locationId)
  ) as DocumentReference<NoteContentDocument>;
}
