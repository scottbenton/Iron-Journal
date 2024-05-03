import { onSnapshot, setDoc } from "firebase/firestore";
import { decodeDataswornId } from "functions/dataswornIdEncoder";
import { OracleSettingsDocument } from "api-calls/user/settings/_settings.type";
import { getUserOracleSettingsDoc } from "./_getRef";

export function listenToOracleSettings(
  uid: string,
  onOracleSettings: (settings: OracleSettingsDocument) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onError: (error: any) => void
) {
  return onSnapshot(
    getUserOracleSettingsDoc(uid),
    (snapshot) => {
      const data = snapshot.data();
      if (data) {
        const { pinnedOracleSections } = data;
        const decodedPinnedOracleSections: { [key: string]: boolean } = {};

        if (pinnedOracleSections) {
          Object.keys(data.pinnedOracleSections ?? {}).forEach((pinnedId) => {
            decodedPinnedOracleSections[decodeDataswornId(pinnedId)] =
              pinnedOracleSections[pinnedId];
          });
        }

        onOracleSettings({ pinnedOracleSections: decodedPinnedOracleSections });
      } else {
        if (uid) {
          setDoc(getUserOracleSettingsDoc(uid), {
            pinnedOracleSections: {},
          });
        }
        onOracleSettings({});
      }
    },
    (error) => {
      console.error(error);
      onError(error);
    }
  );
}
