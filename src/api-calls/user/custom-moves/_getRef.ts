import { firestore } from "config/firebase.config";
import { doc, DocumentReference } from "firebase/firestore";
import { CustomMoveDocument } from "api-calls/user/custom-moves/_custom-moves.type";

export function constructUserCustomMovesDocPath(userId: string) {
  return `/users/${userId}/custom-moves/custom-moves`;
}

export function getUserCustomMovesDoc(userId: string) {
  return doc(
    firestore,
    constructUserCustomMovesDocPath(userId)
  ) as DocumentReference<CustomMoveDocument>;
}
