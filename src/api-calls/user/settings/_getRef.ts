import { firestore } from "config/firebase.config";
import { DocumentReference, doc } from "firebase/firestore";
import { IAccessibilitySettings } from "types/UserAccessibilitySettings.type";
import { OracleSettings } from "types/UserOracleSettings.type";

export function constructUserAccessibilitySettingsDocPath(userId: string) {
  return `/users/${userId}/settings/accessibility`;
}

export function getUserAccessibilitySettingsDoc(userId: string) {
  return doc(
    firestore,
    constructUserAccessibilitySettingsDocPath(userId)
  ) as DocumentReference<IAccessibilitySettings>;
}

export function constructUserOracleSettingsDocPath(userId: string) {
  return `/users/${userId}/settings/oracle`;
}

export function getUserOracleSettingsDoc(userId: string) {
  return doc(
    firestore,
    constructUserOracleSettingsDocPath(userId)
  ) as DocumentReference<OracleSettings>;
}
