import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { HomebrewOracleTableDocument } from "api-calls/homebrew/oracles/tables/_homebrewOracleTable.type";

export function constructHomebrewOracleTableCollectionPath() {
  return `homebrew/homebrew/oracle_tables`;
}

export function constructHomebrewOracleTableDocPath(tableId: string) {
  return `${constructHomebrewOracleTableCollectionPath()}/${tableId}`;
}

export function getHomebrewOracleTableCollection() {
  return collection(
    firestore,
    constructHomebrewOracleTableCollectionPath()
  ) as CollectionReference<HomebrewOracleTableDocument>;
}

export function getHomebrewOracleTableDoc(tableId: string) {
  return doc(
    firestore,
    constructHomebrewOracleTableDocPath(tableId)
  ) as DocumentReference<HomebrewOracleTableDocument>;
}
