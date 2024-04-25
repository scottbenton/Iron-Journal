import { functions } from "config/firebase.config";
import { httpsCallable } from "firebase/functions";

export function getHomebrewCollectionFromInviteUrl(): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const inviteKey = location.pathname.substring(
      location.pathname.lastIndexOf("/") + 1
    );

    const getHomebrewId = httpsCallable(
      functions,
      "getHomebrewIdFromInviteKey"
    );

    getHomebrewId({ inviteKey })
      .then((homebrewId) => {
        return homebrewId.data;
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
}
