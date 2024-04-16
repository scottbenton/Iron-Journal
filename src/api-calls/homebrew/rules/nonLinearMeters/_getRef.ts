import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { StoredNonLinearMeter } from "types/homebrew/HomebrewRules.type";

export function constructHomebrewNonLinearMeterCollectionPath() {
  return `homebrew/homebrew/non_linear_meters`;
}

export function constructHomebrewNonLinearMeterDocPath(meterId: string) {
  return `${constructHomebrewNonLinearMeterCollectionPath()}/${meterId}`;
}

export function getHomebrewNonLinearMeterCollection() {
  return collection(
    firestore,
    constructHomebrewNonLinearMeterCollectionPath()
  ) as CollectionReference<StoredNonLinearMeter>;
}

export function getHomebrewNonLinearMeterDoc(meterId: string) {
  return doc(
    firestore,
    constructHomebrewNonLinearMeterDocPath(meterId)
  ) as DocumentReference<StoredNonLinearMeter>;
}
