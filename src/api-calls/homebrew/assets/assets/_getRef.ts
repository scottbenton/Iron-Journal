import {
  CollectionReference,
  DocumentReference,
  collection,
  doc,
} from "firebase/firestore";
import { firestore } from "config/firebase.config";
import { HomebrewAssetDocument } from "api-calls/homebrew/assets/assets/_homebrewAssets.type";

export function constructHomebrewAssetCollectionPath() {
  return `homebrew/homebrew/assets`;
}

export function constructHomebrewAssetDocPath(assetId: string) {
  return `${constructHomebrewAssetCollectionPath()}/${assetId}`;
}

export function getHomebrewAssetCollection() {
  return collection(
    firestore,
    constructHomebrewAssetCollectionPath()
  ) as CollectionReference<HomebrewAssetDocument>;
}

export function getHomebrewAssetDoc(assetId: string) {
  return doc(
    firestore,
    constructHomebrewAssetDocPath(assetId)
  ) as DocumentReference<HomebrewAssetDocument>;
}
