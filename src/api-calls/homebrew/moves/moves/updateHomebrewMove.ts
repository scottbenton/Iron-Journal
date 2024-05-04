import { createApiFunction } from "api-calls/createApiFunction";
import { PartialWithFieldValue, updateDoc } from "firebase/firestore";
import { getHomebrewMoveDoc } from "./_getRef";
import { HomebrewMoveDocument } from "api-calls/homebrew/moves/moves/_homebrewMove.type";

export const updateHomebrewMove = createApiFunction<
  {
    moveId: string;
    move: PartialWithFieldValue<HomebrewMoveDocument>;
  },
  void
>((params) => {
  const { moveId, move } = params;
  return new Promise((resolve, reject) => {
    updateDoc(getHomebrewMoveDoc(moveId), move).then(resolve).catch(reject);
  });
}, "Failed to update move.");
