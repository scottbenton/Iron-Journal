import { updateDoc } from "firebase/firestore";
import { getWorldDoc } from "./_getRef";
import { createApiFunction } from "api-calls/createApiFunction";
import { NewTruth } from "types/World.type";

export const updateWorldTruthNew = createApiFunction<
  { worldId: string; truthKey: string; truth: NewTruth },
  void
>((params) => {
  const { worldId, truthKey, truth } = params;

  return new Promise((resolve, reject) => {
    updateDoc(getWorldDoc(worldId), {
      [`newTruths.${truthKey}`]: truth,
    })
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject(e);
      });
  });
}, "Failed to update world truth.");
