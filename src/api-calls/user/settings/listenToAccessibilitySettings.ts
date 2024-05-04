import { onSnapshot } from "firebase/firestore";
import { AccessibilitySettingsDocument } from "api-calls/user/settings/_settings.type";
import { getUserAccessibilitySettingsDoc } from "./_getRef";

export const listenToAccessibilitySettings = (
  uid: string,
  onSettings: (settings: AccessibilitySettingsDocument) => void
) => {
  return onSnapshot(getUserAccessibilitySettingsDoc(uid), (snapshot) => {
    onSettings(snapshot.data() ?? {});
  });
};
