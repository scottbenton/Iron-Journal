import { functions } from "config/firebase.config";
import { httpsCallable } from "firebase/functions";

export function getEditorInviteUrl(
  homebrewCollectionId: string
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const getInviteKey = httpsCallable(functions, "getHomebrewEditorInviteKey");

    getInviteKey({ homebrewCollectionId })
      .then((inviteKey) => {
        if (inviteKey.data) {
          resolve(new URL(`/homebrew/invite/${inviteKey.data}`).toString());
        } else {
          console.error("NO INVITE KEY RETURNED");
          reject(new Error("No invite key was returned"));
        }
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
}
