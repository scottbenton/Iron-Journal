import { createApiFunction } from "api-calls/createApiFunction";
import { PartialWithFieldValue, updateDoc } from "firebase/firestore";
import { getHomebrewMoveCategoryDoc } from "./_getRef";
import { HomebrewMoveCategoryDocument } from "api-calls/homebrew/moves/categories/_homebrewMoveCategory.type";

export const updateHomebrewMoveCategory = createApiFunction<
  {
    moveCategoryId: string;
    moveCategory: PartialWithFieldValue<HomebrewMoveCategoryDocument>;
  },
  void
>((params) => {
  const { moveCategory, moveCategoryId } = params;
  return new Promise((resolve, reject) => {
    updateDoc(getHomebrewMoveCategoryDoc(moveCategoryId), moveCategory)
      .then(() => resolve())
      .catch(reject);
  });
}, "Failed to update move category.");
