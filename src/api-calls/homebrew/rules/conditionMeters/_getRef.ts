import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { HomebrewConditionMeterDocument } from "api-calls/homebrew/rules/conditionMeters/_homebrewConditionMeters.type";

export function constructHomebrewConditionMeterCollectionPath() {
  return `homebrew/homebrew/condition_meters`;
}

export function constructHomebrewConditionMeterDocPath(
  conditionMeterId: string
) {
  return `${constructHomebrewConditionMeterCollectionPath()}/${conditionMeterId}`;
}

export function getHomebrewConditionMeterCollection() {
  return collection(
    firestore,
    constructHomebrewConditionMeterCollectionPath()
  ) as CollectionReference<HomebrewConditionMeterDocument>;
}

export function getHomebrewConditionMeterDoc(conditionMeterId: string) {
  return doc(
    firestore,
    constructHomebrewConditionMeterDocPath(conditionMeterId)
  ) as DocumentReference<HomebrewConditionMeterDocument>;
}
