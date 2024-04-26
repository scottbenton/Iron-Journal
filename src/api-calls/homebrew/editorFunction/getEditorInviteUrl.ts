import { functions } from "config/firebase.config";
import { httpsCallable } from "firebase/functions";
import { constructHomebrewEditorInvitePath } from "pages/Homebrew/routes";

export function getEditorInviteUrl(
  homebrewCollectionId: string
): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const getInviteKey = httpsCallable(functions, "getHomebrewEditorInviteKey");

    getInviteKey({ homebrewCollectionId })
      .then((inviteKey) => {
        if (inviteKey.data) {
          resolve(constructHomebrewEditorInvitePath(inviteKey.data as string));
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
