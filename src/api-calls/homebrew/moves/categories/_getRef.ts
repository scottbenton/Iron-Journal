import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { HomebrewMoveCategoryDocument } from "api-calls/homebrew/moves/categories/_homebrewMoveCategory.type";

export function constructHomebrewMoveCategoryCollectionPath() {
  return `homebrew/homebrew/move_categories`;
}

export function constructHomebrewMoveCategoryDocPath(categoryId: string) {
  return `${constructHomebrewMoveCategoryCollectionPath()}/${categoryId}`;
}

export function getHomebrewMoveCategoryCollection() {
  return collection(
    firestore,
    constructHomebrewMoveCategoryCollectionPath()
  ) as CollectionReference<HomebrewMoveCategoryDocument>;
}

export function getHomebrewMoveCategoryDoc(categoryId: string) {
  return doc(
    firestore,
    constructHomebrewMoveCategoryDocPath(categoryId)
  ) as DocumentReference<HomebrewMoveCategoryDocument>;
}
