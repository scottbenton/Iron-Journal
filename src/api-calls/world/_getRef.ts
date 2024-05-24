import { firestore } from "config/firebase.config";
import {
  Bytes,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
} from "firebase/firestore";
import { World } from "types/World.type";
import { WorldDocument } from "./_world.type";

export function constructWorldsPath() {
  return `/worlds`;
}

export function constructWorldDocPath(worldId: string) {
  return `/worlds/${worldId}`;
}

export function getWorldCollection() {
  return collection(
    firestore,
    constructWorldsPath()
  ) as CollectionReference<WorldDocument>;
}

export function getWorldDoc(worldId: string) {
  return doc(
    firestore,
    constructWorldDocPath(worldId)
  ) as DocumentReference<WorldDocument>;
}

export function encodeWorld(world: World): WorldDocument {
  const { worldDescription, ...remainingWorld } = world;

  const encodedWorld: WorldDocument = {
    ...remainingWorld,
  };

  if (worldDescription) {
    encodedWorld.worldDescription = Bytes.fromUint8Array(worldDescription);
  }

  return encodedWorld;
}

export function decodeWorld(encodedWorld: WorldDocument): World {
  const { worldDescription, ...remainingWorld } = encodedWorld;

  const world: World = {
    ...remainingWorld,
    worldDescription: worldDescription?.toUint8Array(),
  };

  return world;
}
