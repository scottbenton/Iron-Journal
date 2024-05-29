import { arrayRemove, arrayUnion, updateDoc } from "firebase/firestore";
import { getWorldDoc } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";

export const updateWorldGuide = createApiFunction<
  {
    worldId: string;
    guideId: string;
    shouldRemove?: boolean;
  },
  void
>((params) => {
  const { worldId, guideId, shouldRemove } = params;

  return new Promise((resolve, reject) => {
    updateDoc(getWorldDoc(worldId), {
      campaignGuides: !shouldRemove
        ? arrayUnion(guideId)
        : arrayRemove(guideId),
    })
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}, "Failed to update world guides.");
