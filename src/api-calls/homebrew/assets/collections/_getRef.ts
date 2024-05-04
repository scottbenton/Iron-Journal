import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { HomebrewAssetCollectionDocument } from "api-calls/homebrew/assets/collections/_homebrewAssetCollection.type";

export function constructHomebrewAssetCollectionCollectionPath() {
  return `homebrew/homebrew/asset_collections`;
}

export function constructHomebrewAssetCollectionDocPath(collectionId: string) {
  return `${constructHomebrewAssetCollectionCollectionPath()}/${collectionId}`;
}

export function getHomebrewAssetCollectionCollection() {
  return collection(
    firestore,
    constructHomebrewAssetCollectionCollectionPath()
  ) as CollectionReference<HomebrewAssetCollectionDocument>;
}

export function getHomebrewAssetCollectionDoc(collectionId: string) {
  return doc(
    firestore,
    constructHomebrewAssetCollectionDocPath(collectionId)
  ) as DocumentReference<HomebrewAssetCollectionDocument>;
}
