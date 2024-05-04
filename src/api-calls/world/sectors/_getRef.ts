import { firestore } from "config/firebase.config";
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  Timestamp,
} from "firebase/firestore";
import { NoteContentDocument } from "api-calls/notes/_notes.type";
import { Sector } from "types/Sector.type";
import { SectorDocument } from "./_sectors.type";

export function constructSectorsPath(worldId: string) {
  return `/worlds/${worldId}/sectors`;
}

export function constructSectorDocPath(worldId: string, sectorId: string) {
  return `/worlds/${worldId}/sectors/${sectorId}`;
}

export function constructPrivateSectorNotesDocPath(
  worldId: string,
  sectorId: string
) {
  return constructSectorDocPath(worldId, sectorId) + `/private/notes`;
}

export function constructPublicSectorNotesDocPath(
  worldId: string,
  sectorId: string
) {
  return constructSectorDocPath(worldId, sectorId) + `/public/notes`;
}

export function getSectorCollection(worldId: string) {
  return collection(
    firestore,
    constructSectorsPath(worldId)
  ) as CollectionReference<SectorDocument>;
}

export function getSectorDoc(worldId: string, sectorId: string) {
  return doc(
    firestore,
    constructSectorDocPath(worldId, sectorId)
  ) as DocumentReference<SectorDocument>;
}

export function getPrivateSectorNotesDoc(worldId: string, sectorId: string) {
  return doc(
    firestore,
    constructPrivateSectorNotesDocPath(worldId, sectorId)
  ) as DocumentReference<NoteContentDocument>;
}

export function getPublicSectorNotesDoc(worldId: string, sectorId: string) {
  return doc(
    firestore,
    constructPublicSectorNotesDocPath(worldId, sectorId)
  ) as DocumentReference<NoteContentDocument>;
}

export function convertToDatabase(
  sector: Partial<Sector>
): Partial<SectorDocument> {
  const { createdDate, ...rest } = sector;
  const newSector: Partial<SectorDocument> = {
    ...rest,
  };

  if (createdDate) {
    newSector.createdTimestamp = Timestamp.fromDate(createdDate);
  }

  return newSector;
}

export function convertFromDatabase(sector: SectorDocument): Sector {
  const { createdTimestamp, ...rest } = sector;
  return {
    createdDate: createdTimestamp.toDate(),
    ...rest,
  };
}
