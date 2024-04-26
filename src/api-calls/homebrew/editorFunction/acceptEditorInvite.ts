import { functions } from "config/firebase.config";
import { httpsCallable } from "firebase/functions";

export function acceptEditorInvite(
  homebrewCollectionId: string,
  inviteKey: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const acceptInvite = httpsCallable(
      functions,
      "addCurrentUserAsHomebrewCampaignEditor"
    );

    acceptInvite({ homebrewCollectionId, inviteKey })
      .then((wasSuccessful) => {
        resolve(wasSuccessful.data as boolean);
      })
      .catch((e) => {
        console.error(e);
        reject(e);
      });
  });
}
