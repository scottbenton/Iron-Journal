import { createApiFunction } from "api-calls/createApiFunction";
import { addDoc } from "firebase/firestore";
import { HomebrewMoveCategoryDocument } from "api-calls/homebrew/moves/categories/_homebrewMoveCategory.type";
import { getHomebrewMoveCategoryCollection } from "./_getRef";

export const createHomebrewMoveCategory = createApiFunction<
  { moveCategory: HomebrewMoveCategoryDocument },
  void
>((params) => {
  const { moveCategory } = params;
  return new Promise((resolve, reject) => {
    addDoc(getHomebrewMoveCategoryCollection(), moveCategory)
      .then(() => resolve())
      .catch(reject);
  });
}, "Failed to create move category.");
