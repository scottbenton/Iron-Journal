import { firestore } from "config/firebase.config";
import { DocumentReference, doc } from "firebase/firestore";
import {
  AccessibilitySettingsDocument,
  OracleSettingsDocument,
} from "api-calls/user/settings/_settings.type";

export function constructUserAccessibilitySettingsDocPath(userId: string) {
  return `/users/${userId}/settings/accessibility`;
}

export function getUserAccessibilitySettingsDoc(userId: string) {
  return doc(
    firestore,
    constructUserAccessibilitySettingsDocPath(userId)
  ) as DocumentReference<AccessibilitySettingsDocument>;
}

export function constructUserOracleSettingsDocPath(userId: string) {
  return `/users/${userId}/settings/oracle`;
}

export function getUserOracleSettingsDoc(userId: string) {
  return doc(
    firestore,
    constructUserOracleSettingsDocPath(userId)
  ) as DocumentReference<OracleSettingsDocument>;
}
