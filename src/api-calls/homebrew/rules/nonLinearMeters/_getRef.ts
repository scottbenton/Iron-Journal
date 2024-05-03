import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { HomebrewNonLinearMeterDocument } from "api-calls/homebrew/rules/nonLinearMeters/_homebrewNonLinearMeter.type";

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
  ) as CollectionReference<HomebrewNonLinearMeterDocument>;
}

export function getHomebrewNonLinearMeterDoc(meterId: string) {
  return doc(
    firestore,
    constructHomebrewNonLinearMeterDocPath(meterId)
  ) as DocumentReference<HomebrewNonLinearMeterDocument>;
}
