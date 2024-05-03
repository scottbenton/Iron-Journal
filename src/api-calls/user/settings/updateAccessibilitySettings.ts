import { ApiFunction } from "api-calls/createApiFunction";
import { setDoc } from "firebase/firestore";
import { AccessibilitySettingsDocument } from "api-calls/user/settings/_settings.type";
import { getUserAccessibilitySettingsDoc } from "./_getRef";

export const updateAccessibilitySettings: ApiFunction<
  { uid: string; settings: Partial<AccessibilitySettingsDocument> },
  void
> = (params) => {
  const { uid, settings } = params;
  return setDoc(getUserAccessibilitySettingsDoc(uid), settings, {
    merge: true,
  });
};
