import { functions } from "config/firebase.config";
import { httpsCallable } from "firebase/functions";

export function getHomebrewCollectionFromInviteUrl(
  inviteKey: string
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const getHomebrewId = httpsCallable(
      functions,
      "getHomebrewIdFromInviteKey"
    );

    getHomebrewId({ inviteKey })
      .then((homebrewId) => {
        resolve(homebrewId.data as string | null);
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
}
