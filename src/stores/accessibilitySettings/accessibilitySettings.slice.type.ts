import { Unsubscribe } from "firebase/firestore";
import { AccessibilitySettingsDocument } from "api-calls/user/settings/_settings.type";

export interface AccessibilitySettingsSliceData {
  settings: AccessibilitySettingsDocument;
}

export interface AccessibilitySettingsSliceActions {
  listenToSettings: (uid: string) => Unsubscribe;
  updateSettings: (
    settings: Partial<AccessibilitySettingsDocument>
  ) => Promise<void>;
}

export type AccessibilitySettingsSlice = AccessibilitySettingsSliceData &
  AccessibilitySettingsSliceActions;
