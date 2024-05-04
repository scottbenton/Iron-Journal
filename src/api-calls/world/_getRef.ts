import { firestore } from "config/firebase.config";
import {
  Bytes,
  collection,
  CollectionReference,
  doc,
  DocumentReference,
} from "firebase/firestore";
import {
  decodeDataswornId,
  encodeDataswornId,
} from "functions/dataswornIdEncoder";
import { Truth, World } from "types/World.type";
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
  const { truths: decodedTruths, worldDescription, ...remainingWorld } = world;

  const encodedTruths: { [key: string]: Truth } = {};

  if (decodedTruths) {
    Object.keys(decodedTruths).forEach((truthId) => {
      encodedTruths[encodeDataswornId(truthId)] = decodedTruths[truthId];
    });
  }

  const encodedWorld: WorldDocument = {
    ...remainingWorld,
    truths: encodedTruths,
  };

  if (worldDescription) {
    encodedWorld.worldDescription = Bytes.fromUint8Array(worldDescription);
  }

  return encodedWorld;
}

export function decodeWorld(encodedWorld: WorldDocument): World {
  const {
    truths: encodedTruths,
    worldDescription,
    ...remainingWorld
  } = encodedWorld;

  const decodedTruths: { [key: string]: Truth } = {};

  if (encodedTruths) {
    Object.keys(encodedTruths).forEach((encodedTruthId) => {
      decodedTruths[decodeDataswornId(encodedTruthId)] =
        encodedTruths[encodedTruthId];
    });
  }

  const world: World = {
    ...remainingWorld,
    worldDescription: worldDescription?.toUint8Array(),
    truths: decodedTruths,
  };

  return world;
}
