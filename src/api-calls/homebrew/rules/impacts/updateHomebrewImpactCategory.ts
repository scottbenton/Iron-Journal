import { createApiFunction } from "api-calls/createApiFunction";
import { PartialWithFieldValue, updateDoc } from "firebase/firestore";
import { getHomebrewImpactsDoc } from "./_getRef";
import { HomebrewImpactCategoryDocument } from "api-calls/homebrew/rules/impacts/_homebrewImpacts.type";

export const updateHomebrewImpactCategory = createApiFunction<
  {
    impactCategoryId: string;
    impactCategory: PartialWithFieldValue<HomebrewImpactCategoryDocument>;
  },
  void
>((params) => {
  const { impactCategoryId, impactCategory } = params;
  return new Promise((resolve, reject) => {
    updateDoc(getHomebrewImpactsDoc(impactCategoryId), impactCategory)
      .then(() => {
        resolve();
      })
      .catch(reject);
  });
}, "Failed to update condition meter.");
